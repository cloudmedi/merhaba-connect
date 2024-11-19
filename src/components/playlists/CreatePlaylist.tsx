import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { PlaylistForm } from "./PlaylistForm";
import { PlaylistHeader } from "./PlaylistHeader";
import { PlaylistTabs } from "./PlaylistTabs";

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

interface Mood {
  id: number;
  name: string;
  icon: JSX.Element;
  description: string;
}

export function CreatePlaylist() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [playlistData, setPlaylistData] = useState({
    title: "",
    description: "",
    artwork: null as File | null,
    selectedSongs: [] as Song[],
    selectedUsers: [] as User[],
    selectedGenres: [] as Genre[],
    selectedCategories: [] as Category[],
    selectedMoods: [] as Mood[],
  });

  const handleCreatePlaylist = () => {
    if (!playlistData.title) {
      toast({
        title: "Error",
        description: "Please enter a playlist title",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Playlist created successfully",
    });
    
    navigate("/super-admin/playlists");
  };

  return (
    <div className="flex gap-6 p-6 bg-white">
      <PlaylistForm playlistData={playlistData} setPlaylistData={setPlaylistData} />
      
      <div className="flex-1">
        <PlaylistHeader
          onCancel={() => navigate("/super-admin/playlists")}
          onCreate={handleCreatePlaylist}
        />

        <PlaylistTabs
          playlistData={playlistData}
          setPlaylistData={setPlaylistData}
        />
      </div>
    </div>
  );
}