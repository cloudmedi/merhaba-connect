import { Json } from './json';

export type DatabaseTables = {
  announcement_branches: {
    Row: {
      announcement_id: string;
      branch_id: string;
      created_at: string | null;
    };
    Insert: {
      announcement_id: string;
      branch_id: string;
      created_at?: string | null;
    };
    Update: {
      announcement_id?: string;
      branch_id?: string;
      created_at?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "announcement_branches_announcement_id_fkey";
        columns: ["announcement_id"];
        isOneToOne: false;
        referencedRelation: "announcements";
        referencedColumns: ["id"];
      }
    ];
  };
  announcement_files: {
    Row: {
      announcement_id: string | null;
      bunny_id: string | null;
      created_at: string | null;
      duration: number | null;
      file_name: string;
      file_url: string;
      id: string;
      interval: number | null;
      playback_type: string | null;
      scheduled_time: string | null;
      song_interval: number | null;
      updated_at: string | null;
    };
    Insert: {
      announcement_id?: string | null;
      bunny_id?: string | null;
      created_at?: string | null;
      duration?: number | null;
      file_name: string;
      file_url: string;
      id?: string;
      interval?: number | null;
      playback_type?: string | null;
      scheduled_time?: string | null;
      song_interval?: number | null;
      updated_at?: string | null;
    };
    Update: {
      announcement_id?: string | null;
      bunny_id?: string | null;
      created_at?: string | null;
      duration?: number | null;
      file_name?: string;
      file_url?: string;
      id?: string;
      interval?: number | null;
      playback_type?: string | null;
      scheduled_time?: string | null;
      song_interval?: number | null;
      updated_at?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "announcement_files_announcement_id_fkey";
        columns: ["announcement_id"];
        isOneToOne: false;
        referencedRelation: "announcements";
        referencedColumns: ["id"];
      }
    ];
  };
  announcements: {
    Row: {
      company_id: string | null;
      created_at: string | null;
      created_by: string | null;
      description: string | null;
      end_date: string | null;
      id: string;
      repeat_interval: number | null;
      repeat_type: string | null;
      start_date: string | null;
      status: string | null;
      title: string;
      updated_at: string | null;
    };
    Insert: {
      company_id?: string | null;
      created_at?: string | null;
      created_by?: string | null;
      description?: string | null;
      end_date?: string | null;
      id?: string;
      repeat_interval?: number | null;
      repeat_type?: string | null;
      start_date?: string | null;
      status?: string | null;
      title: string;
      updated_at?: string | null;
    };
    Update: {
      company_id?: string | null;
      created_at?: string | null;
      created_by?: string | null;
      description?: string | null;
      end_date?: string | null;
      id?: string;
      repeat_interval?: number | null;
      repeat_type?: string | null;
      start_date?: string | null;
      status?: string | null;
      title?: string;
      updated_at?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "announcements_company_id_fkey";
        columns: ["company_id"];
        isOneToOne: false;
        referencedRelation: "companies";
        referencedColumns: ["id"];
      },
      {
        foreignKeyName: "announcements_created_by_fkey";
        columns: ["created_by"];
        isOneToOne: false;
        referencedRelation: "profiles";
        referencedColumns: ["id"];
      }
    ];
  };
  api_metrics: {
    Row: {
      created_at: string | null;
      endpoint: string;
      error_count: number;
      id: string;
      measured_at: string | null;
      response_time: number;
      success_rate: number;
      total_requests: number;
    };
    Insert: {
      created_at?: string | null;
      endpoint: string;
      error_count?: number;
      id?: string;
      measured_at?: string | null;
      response_time?: number;
      success_rate?: number;
      total_requests?: number;
    };
    Update: {
      created_at?: string | null;
      endpoint?: string;
      error_count?: number;
      id?: string;
      measured_at?: string | null;
      response_time?: number;
      success_rate?: number;
      total_requests?: number;
    };
    Relationships: [];
  };
  branches: {
    Row: {
      company_id: string | null;
      created_at: string | null;
      id: string;
      location: string | null;
      name: string;
      updated_at: string | null;
    };
    Insert: {
      company_id?: string | null;
      created_at?: string | null;
      id?: string;
      location?: string | null;
      name: string;
      updated_at?: string | null;
    };
    Update: {
      company_id?: string | null;
      created_at?: string | null;
      id?: string;
      location?: string | null;
      name?: string;
      updated_at?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "branches_company_id_fkey";
        columns: ["company_id"];
        isOneToOne: false;
        referencedRelation: "companies";
        referencedColumns: ["id"];
      }
    ];
  };
  categories: {
    Row: {
      created_at: string | null;
      created_by: string | null;
      description: string | null;
      id: string;
      name: string;
      position: number;
      updated_at: string | null;
    };
    Insert: {
      created_at?: string | null;
      created_by?: string | null;
      description?: string | null;
      id?: string;
      name: string;
      position: number;
      updated_at?: string | null;
    };
    Update: {
      created_at?: string | null;
      created_by?: string | null;
      description?: string | null;
      id?: string;
      name?: string;
      position?: number;
      updated_at?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "categories_created_by_fkey";
        columns: ["created_by"];
        isOneToOne: false;
        referencedRelation: "profiles";
        referencedColumns: ["id"];
      }
    ];
  };
  companies: {
    Row: {
      created_at: string | null;
      id: string;
      name: string;
      subscription_ends_at: string | null;
      subscription_status: string | null;
      updated_at: string | null;
    };
    Insert: {
      created_at?: string | null;
      id?: string;
      name: string;
      subscription_ends_at?: string | null;
      subscription_status?: string | null;
      updated_at?: string | null;
    };
    Update: {
      created_at?: string | null;
      id?: string;
      name?: string;
      subscription_ends_at?: string | null;
      subscription_status?: string | null;
      updated_at?: string | null;
    };
    Relationships: [];
  };
  devices: {
    Row: {
      branch_id: string | null;
      category: string;
      created_at: string | null;
      id: string;
      ip_address: string | null;
      last_seen: string | null;
      name: string;
      schedule: Json | null;
      status: string | null;
      system_info: Json | null;
      token: string | null;
      updated_at: string | null;
    };
    Insert: {
      branch_id?: string | null;
      category: string;
      created_at?: string | null;
      id?: string;
      ip_address?: string | null;
      last_seen?: string | null;
      name: string;
      schedule?: Json | null;
      status?: string | null;
      system_info?: Json | null;
      token?: string | null;
      updated_at?: string | null;
    };
    Update: {
      branch_id?: string | null;
      category?: string;
      created_at?: string | null;
      id?: string;
      ip_address?: string | null;
      last_seen?: string | null;
      name?: string;
      schedule?: Json | null;
      status?: string | null;
      system_info?: Json | null;
      token?: string | null;
      updated_at?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "devices_branch_id_fkey";
        columns: ["branch_id"];
        isOneToOne: false;
        referencedRelation: "branches";
        referencedColumns: ["id"];
      }
    ];
  };
  genres: {
    Row: {
      created_at: string | null;
      created_by: string | null;
      description: string | null;
      id: string;
      name: string;
      updated_at: string | null;
    };
    Insert: {
      created_at?: string | null;
      created_by?: string | null;
      description?: string | null;
      id?: string;
      name: string;
      updated_at?: string | null;
    };
    Update: {
      created_at?: string | null;
      created_by?: string | null;
      description?: string | null;
      id?: string;
      name?: string;
      updated_at?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "genres_created_by_fkey";
        columns: ["created_by"];
        isOneToOne: false;
        referencedRelation: "profiles";
        referencedColumns: ["id"];
      }
    ];
  };
  licenses: {
    Row: {
      created_at: string | null;
      end_date: string | null;
      id: string;
      quantity: number | null;
      start_date: string | null;
      type: string | null;
      updated_at: string | null;
      user_id: string | null;
    };
    Insert: {
      created_at?: string | null;
      end_date?: string | null;
      id?: string;
      quantity?: number | null;
      start_date?: string | null;
      type?: string | null;
      updated_at?: string | null;
      user_id?: string | null;
    };
    Update: {
      created_at?: string | null;
      end_date?: string | null;
      id?: string;
      quantity?: number | null;
      start_date?: string | null;
      type?: string | null;
      updated_at?: string | null;
      user_id?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "licenses_user_id_fkey";
        columns: ["user_id"];
        isOneToOne: false;
        referencedRelation: "profiles";
        referencedColumns: ["id"];
      }
    ];
  };
  moods: {
    Row: {
      created_at: string | null;
      created_by: string | null;
      description: string | null;
      icon: string | null;
      id: string;
      name: string;
      updated_at: string | null;
    };
    Insert: {
      created_at?: string | null;
      created_by?: string | null;
      description?: string | null;
      icon?: string | null;
      id?: string;
      name: string;
      updated_at?: string | null;
    };
    Update: {
      created_at?: string | null;
      created_by?: string | null;
      description?: string | null;
      icon?: string | null;
      id?: string;
      name?: string;
      updated_at?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "moods_created_by_fkey";
        columns: ["created_by"];
        isOneToOne: false;
        referencedRelation: "profiles";
        referencedColumns: ["id"];
      }
    ];
  };
  playlist_categories: {
    Row: {
      category_id: string;
      created_at: string | null;
      playlist_id: string;
    };
    Insert: {
      category_id: string;
      created_at?: string | null;
      playlist_id: string;
    };
    Update: {
      category_id?: string;
      created_at?: string | null;
      playlist_id?: string;
    };
    Relationships: [
      {
        foreignKeyName: "playlist_categories_category_id_fkey";
        columns: ["category_id"];
        isOneToOne: false;
        referencedRelation: "categories";
        referencedColumns: ["id"];
      },
      {
        foreignKeyName: "playlist_categories_playlist_id_fkey";
        columns: ["playlist_id"];
        isOneToOne: false;
        referencedRelation: "playlists";
        referencedColumns: ["id"];
      }
    ];
  };
  playlist_songs: {
    Row: {
      created_at: string | null;
      playlist_id: string;
      position: number;
      song_id: string;
    };
    Insert: {
      created_at?: string | null;
      playlist_id: string;
      position: number;
      song_id: string;
    };
    Update: {
      created_at?: string | null;
      playlist_id?: string;
      position?: number;
      song_id?: string;
    };
    Relationships: [
      {
        foreignKeyName: "playlist_songs_playlist_id_fkey";
        columns: ["playlist_id"];
        isOneToOne: false;
        referencedRelation: "playlists";
        referencedColumns: ["id"];
      },
      {
        foreignKeyName: "playlist_songs_song_id_fkey";
        columns: ["song_id"];
        isOneToOne: false;
        referencedRelation: "songs";
        referencedColumns: ["id"];
      }
    ];
  };
  playlists: {
    Row: {
      artwork_url: string | null;
      assigned_to: string[] | null;
      company_id: string | null;
      created_at: string | null;
      created_by: string | null;
      description: string | null;
      genre_id: string | null;
      id: string;
      is_catalog: boolean | null;
      is_hero: boolean | null;
      is_public: boolean | null;
      last_played: string | null;
      mood_id: string | null;
      name: string;
      play_count: number | null;
      updated_at: string | null;
    };
    Insert: {
      artwork_url?: string | null;
      assigned_to?: string[] | null;
      company_id?: string | null;
      created_at?: string | null;
      created_by?: string | null;
      description?: string | null;
      genre_id?: string | null;
      id?: string;
      is_catalog?: boolean | null;
      is_hero?: boolean | null;
      is_public?: boolean | null;
      last_played?: string | null;
      mood_id?: string | null;
      name: string;
      play_count?: number | null;
      updated_at?: string | null;
    };
    Update: {
      artwork_url?: string | null;
      assigned_to?: string[] | null;
      company_id?: string | null;
      created_at?: string | null;
      created_by?: string | null;
      description?: string | null;
      genre_id?: string | null;
      id?: string;
      is_catalog?: boolean | null;
      is_hero?: boolean | null;
      is_public?: boolean | null;
      last_played?: string | null;
      mood_id?: string | null;
      name?: string;
      play_count?: number | null;
      updated_at?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "playlists_company_id_fkey";
        columns: ["company_id"];
        isOneToOne: false;
        referencedRelation: "companies";
        referencedColumns: ["id"];
      },
      {
        foreignKeyName: "playlists_created_by_fkey";
        columns: ["created_by"];
        isOneToOne: false;
        referencedRelation: "profiles";
        referencedColumns: ["id"];
      },
      {
        foreignKeyName: "playlists_genre_id_fkey";
        columns: ["genre_id"];
        isOneToOne: false;
        referencedRelation: "genres";
        referencedColumns: ["id"];
      },
      {
        foreignKeyName: "playlists_mood_id_fkey";
        columns: ["mood_id"];
        isOneToOne: false;
        referencedRelation: "moods";
        referencedColumns: ["id"];
      }
    ];
  };
  profiles: {
    Row: {
      avatar_url: string | null;
      company_id: string | null;
      created_at: string | null;
      email: string;
      first_name: string | null;
      id: string;
      is_active: boolean | null;
      last_name: string | null;
      role: string | null;
      updated_at: string | null;
    };
    Insert: {
      avatar_url?: string | null;
      company_id?: string | null;
      created_at?: string | null;
      email: string;
      first_name?: string | null;
      id: string;
      is_active?: boolean | null;
      last_name?: string | null;
      role?: string | null;
      updated_at?: string | null;
    };
    Update: {
      avatar_url?: string | null;
      company_id?: string | null;
      created_at?: string | null;
      email?: string;
      first_name?: string | null;
      id?: string;
      is_active?: boolean | null;
      last_name?: string | null;
      role?: string | null;
      updated_at?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "profiles_company_id_fkey";
        columns: ["company_id"];
        isOneToOne: false;
        referencedRelation: "companies";
        referencedColumns: ["id"];
      }
    ];
  };
  song_play_history: {
    Row: {
      branch_id: string | null;
      bunny_stream_id: string | null;
      created_at: string | null;
      device_id: string | null;
      id: string;
      last_played_at: string | null;
      play_count_today: number | null;
      song_id: string | null;
    };
    Insert: {
      branch_id?: string | null;
      bunny_stream_id?: string | null;
      created_at?: string | null;
      device_id?: string | null;
      id?: string;
      last_played_at?: string | null;
      play_count_today?: number | null;
      song_id?: string | null;
    };
    Update: {
      branch_id?: string | null;
      bunny_stream_id?: string | null;
      created_at?: string | null;
      device_id?: string | null;
      id?: string;
      last_played_at?: string | null;
      play_count_today?: number | null;
      song_id?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "song_play_history_branch_id_fkey";
        columns: ["branch_id"];
        isOneToOne: false;
        referencedRelation: "branches";
        referencedColumns: ["id"];
      },
      {
        foreignKeyName: "song_play_history_device_id_fkey";
        columns: ["device_id"];
        isOneToOne: false;
        referencedRelation: "devices";
        referencedColumns: ["id"];
      },
      {
        foreignKeyName: "song_play_history_song_id_fkey";
        columns: ["song_id"];
        isOneToOne: false;
        referencedRelation: "songs";
        referencedColumns: ["id"];
      }
    ];
  };
  songs: {
    Row: {
      album: string | null;
      artist: string | null;
      artwork_url: string | null;
      bunny_id: string | null;
      created_at: string | null;
      created_by: string | null;
      duration: number | null;
      file_url: string;
      genre: string[] | null;
      id: string;
      title: string;
      updated_at: string | null;
    };
    Insert: {
      album?: string | null;
      artist?: string | null;
      artwork_url?: string | null;
      bunny_id?: string | null;
      created_at?: string | null;
      created_by?: string | null;
      duration?: number | null;
      file_url: string;
      genre?: string[] | null;
      id?: string;
      title: string;
      updated_at?: string | null;
    };
    Update: {
      album?: string | null;
      artist?: string | null;
      artwork_url?: string | null;
      bunny_id?: string | null;
      created_at?: string | null;
      created_by?: string | null;
      duration?: number | null;
      file_url: string;
      genre?: string[] | null;
      id?: string;
      title?: string;
      updated_at?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "songs_created_by_fkey";
        columns: ["created_by"];
        isOneToOne: false;
        referencedRelation: "profiles";
        referencedColumns: ["id"];
      }
    ];
  };
  system_metrics: {
    Row: {
      cpu_usage: number;
      created_at: string | null;
      error_rate: number;
      id: string;
      measured_at: string | null;
      memory_usage: number;
      response_time: number;
      server_uptime: number;
      storage_usage: number;
    };
    Insert: {
      cpu_usage?: number;
      created_at?: string | null;
      error_rate?: number;
      id?: string;
      measured_at?: string | null;
      memory_usage?: number;
      response_time?: number;
      server_uptime?: number;
      storage_usage?: number;
    };
    Update: {
      cpu_usage?: number;
      created_at?: string | null;
      error_rate?: number;
      id?: string;
      measured_at?: string | null;
      memory_usage?: number;
      response_time?: number;
      server_uptime?: number;
      storage_usage?: number;
    };
    Relationships: [];
  };
};
