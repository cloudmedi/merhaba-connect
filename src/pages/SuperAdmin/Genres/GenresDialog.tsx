import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Genre } from "./types";

interface GenresDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingGenre: Genre | null;
  newGenreName: string;
  setNewGenreName: (name: string) => void;
  onSave: () => void;
}

export function GenresDialog({
  isOpen,
  onOpenChange,
  editingGenre,
  newGenreName,
  setNewGenreName,
  onSave,
}: GenresDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900">{editingGenre ? 'Edit Genre' : 'Create New Genre'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="genreName" className="text-gray-700">Genre Name</Label>
            <Input
              id="genreName"
              value={newGenreName}
              onChange={(e) => setNewGenreName(e.target.value)}
              placeholder="Enter genre name"
              className="bg-white border-gray-200"
            />
          </div>
          <Button 
            onClick={onSave}
            className="w-full bg-purple-600 text-white hover:bg-purple-700"
          >
            {editingGenre ? 'Update Genre' : 'Create Genre'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}