import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PlaylistGrid } from "@/components/dashboard/PlaylistGrid";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { GridPlaylist } from "@/components/dashboard/types";
import type { Playlist } from "@/types/api";

const transformPlaylistToGridFormat = (playlist: Playlist): GridPlaylist => ({
  id: playlist.id,
  title: playlist.name,
  artwork_url: playlist.artwork_url,
  genre: "Various", // You might want to fetch this from the genres table
  mood: "Various", // You might want to fetch this from the moods table
});

// Fetch playlists from Supabase
const fetchPlaylists = async () => {
  const { data, error } = await supabase
    .from('playlists')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Playlist[];
};

export default function ManagerDashboard() {
  const { data: playlists, isLoading } = useQuery({
    queryKey: ['playlists'],
    queryFn: fetchPlaylists,
  });

  const businessHoursPlaylists = playlists
    ?.filter(p => !p.is_public)
    .slice(0, 6)
    .map(transformPlaylistToGridFormat) || [];

  const eveningPlaylists = playlists
    ?.filter(p => !p.is_public)
    .slice(6, 12)
    .map(transformPlaylistToGridFormat) || [];

  const weekendPlaylists = playlists
    ?.filter(p => p.is_public)
    .slice(0, 6)
    .map(transformPlaylistToGridFormat) || [];

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assigned Playlists</h1>
          <p className="text-gray-500 mt-1">Manage your business music playlists</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="search"
            placeholder="Search playlists..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-12">
        <PlaylistGrid 
          title="Business Hours" 
          description="Active during business hours"
          playlists={businessHoursPlaylists}
          isLoading={isLoading}
        />
        
        <PlaylistGrid 
          title="Evening Ambience" 
          description="Perfect for evening atmosphere"
          playlists={eveningPlaylists}
          isLoading={isLoading}
        />
        
        <PlaylistGrid 
          title="Weekend Selection" 
          description="Special weekend playlists"
          playlists={weekendPlaylists}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}