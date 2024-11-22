import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Device } from "./types";
import { useEffect } from "react";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useAuth } from "@/hooks/useAuth";

export const useDevices = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    const channel = supabase
      .channel('devices_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'devices'
        },
        (payload: RealtimePostgresChangesPayload<Device>) => {
          queryClient.invalidateQueries({ queryKey: ['devices'] });
          
          const event = payload.eventType;
          const deviceName = (payload.new as Device)?.name || (payload.old as Device)?.name;
          
          if (event === 'INSERT') {
            toast.success(`Device "${deviceName}" has been added`);
          } else if (event === 'UPDATE') {
            const oldStatus = (payload.old as Device)?.status;
            const newStatus = (payload.new as Device)?.status;
            if (oldStatus !== newStatus) {
              toast.info(`Device "${deviceName}" is now ${newStatus}`);
            }
          } else if (event === 'DELETE') {
            toast.success(`Device "${deviceName}" has been removed`);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const { data: devices = [], isLoading, error } = useQuery({
    queryKey: ['devices', user?.companyId],
    queryFn: async () => {
      if (!user?.id || !user?.companyId) {
        console.error('No authenticated user or company ID found');
        return [];
      }

      const { data, error } = await supabase
        .from('devices')
        .select(`
          *,
          branches (
            id,
            name,
            company_id
          )
        `)
        .eq('branches.company_id', user.companyId);

      if (error) {
        console.error('Error fetching devices:', error);
        throw error;
      }
      
      const transformedData = (data || []).map(device => ({
        ...device,
        category: device.category as Device['category'],
        status: (device.status || 'offline') as Device['status'],
        system_info: device.system_info || {},
        schedule: device.schedule || {}
      }));

      return transformedData as Device[];
    },
    enabled: !!user?.id && !!user?.companyId,
  });

  const createDevice = useMutation({
    mutationFn: async (device: Omit<Device, 'id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user?.id) {
        throw new Error('No authenticated user found');
      }

      const { data: userProfile } = await supabase
        .from('profiles')
        .select('*, licenses(*)')
        .eq('id', user.id)
        .single();

      if (!userProfile) {
        throw new Error('User profile not found');
      }

      const licenseQuantity = userProfile?.licenses?.[0]?.quantity || 0;
      
      const { count: currentDevices } = await supabase
        .from('devices')
        .select('*', { count: 'exact', head: true })
        .eq('branch_id', device.branch_id);

      if (currentDevices !== null && currentDevices >= licenseQuantity) {
        throw new Error(`License limit reached (${licenseQuantity} devices). Please upgrade your license to add more devices.`);
      }

      const { data, error } = await supabase
        .from('devices')
        .insert({
          ...device,
          last_seen: new Date().toISOString(),
          ip_address: window.location.hostname,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast.success('Device added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateDevice = useMutation({
    mutationFn: async ({ id, ...device }: Partial<Device> & { id: string }) => {
      const { data, error } = await supabase
        .from('devices')
        .update({
          ...device,
          last_seen: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast.success('Device updated successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to update device: ' + error.message);
    },
  });

  const deleteDevice = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('devices')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast.success('Device deleted successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to delete device: ' + error.message);
    },
  });

  return {
    devices,
    isLoading,
    error,
    createDevice,
    updateDevice,
    deleteDevice,
  };
};
