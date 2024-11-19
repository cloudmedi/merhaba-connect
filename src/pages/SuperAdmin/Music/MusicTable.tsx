import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Music2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  genres: string[];
  duration: string;
  file: File;
}

interface MusicTableProps {
  songs: Song[];
  selectedSongs: Song[];
  onSelectAll: (checked: boolean) => void;
  onSelectSong: (song: Song, checked: boolean) => void;
}

export function MusicTable({ songs, selectedSongs, onSelectAll, onSelectSong }: MusicTableProps) {
  if (songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
        <Music2 className="w-12 h-12 mb-2" />
        <p>No songs uploaded yet</p>
        <p className="text-sm">Upload some music to get started</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-300px)] rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={selectedSongs.length === songs.length}
                onCheckedChange={(checked) => onSelectAll(checked as boolean)}
              />
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Album</TableHead>
            <TableHead>Genres</TableHead>
            <TableHead className="text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song) => (
            <TableRow
              key={song.id}
              className={`cursor-pointer ${
                selectedSongs.some((s) => s.id === song.id)
                  ? "bg-purple-50"
                  : ""
              }`}
            >
              <TableCell>
                <Checkbox 
                  checked={selectedSongs.some((s) => s.id === song.id)}
                  onCheckedChange={(checked) => onSelectSong(song, checked as boolean)}
                />
              </TableCell>
              <TableCell className="font-medium">{song.title}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>{song.album}</TableCell>
              <TableCell>{song.genres.join(", ") || "-"}</TableCell>
              <TableCell className="text-right">{song.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}