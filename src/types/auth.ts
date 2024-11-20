export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'manager';
  companyId?: string;
  companyName?: string;
  isActive: boolean;
  avatar?: string;
  license?: 'trial' | 'premium';
  expiryDate?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  role: 'admin' | 'manager';
  license: {
    type: 'trial' | 'premium';
    startDate: string;
    endDate: string;
    quantity: number;
  };
}

export interface Company {
  id: string;
  name: string;
  subscriptionStatus: 'trial' | 'active' | 'expired';
  subscriptionEndsAt?: string;
  maxBranches: number;
  maxDevices: number;
  createdAt: string;
  updatedAt: string;
}

export interface Branch {
  id: string;
  companyId: string;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

export interface Device {
  id: string;
  branchId: string;
  name: string;
  deviceType: 'player' | 'display' | 'controller';
  status: 'online' | 'offline' | 'maintenance';
  lastPingAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  companyId?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Song {
  id: string;
  title: string;
  artist?: string;
  album?: string;
  genre?: string;
  duration: number;
  fileUrl: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  companyId: string;
  createdBy: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Schedule {
  id: string;
  branchId: string;
  playlistId?: string;
  announcementId?: string;
  startTime: string;
  endTime: string;
  daysOfWeek: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

