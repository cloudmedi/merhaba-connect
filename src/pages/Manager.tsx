import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const playlists = [
  {
    id: 1,
    title: "Jazz Hop Cafe",
    venue: "Sunny Chill House",
    image: "/lovable-uploads/db3fbe19-e5ea-4571-b9be-e6e5f633c112.png"
  },
  {
    id: 2,
    title: "Slap House Jam",
    venue: "Sunny Chill House",
    image: "/lovable-uploads/db3fbe19-e5ea-4571-b9be-e6e5f633c112.png"
  },
  // ... diğer playlist'ler
];

export default function Manager() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#111]">
        <div className="text-[#FFD700] text-2xl font-bold">veeq</div>
        <nav className="flex items-center space-x-6">
          <a href="#" className="text-white hover:text-[#FFD700]">Home</a>
          <a href="#" className="text-white hover:text-[#FFD700]">Campaigns</a>
          <a href="#" className="text-white hover:text-[#FFD700]">Device</a>
          <a href="#" className="text-white hover:text-[#FFD700]">Calendar</a>
          <button className="bg-[#FFD700] text-black px-4 py-2 rounded-full">
            User Name
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative bg-[#8B4543] p-8 mx-6 mt-6 rounded-xl">
        <div className="max-w-2xl">
          <p className="text-sm mb-2">Sunny Chill House</p>
          <h1 className="text-4xl font-bold mb-4">Chill Beats</h1>
          <p className="text-lg opacity-90">
            Feel the groove with tracks like "Conquer the Storm", "My Side," and
            "Magic Ride." Let the soothing beats from Chill Beat Zone take you on a
            journey through laid-back melodies and chill vibes, perfect for any
            relaxing moment.
          </p>
        </div>
        <div className="absolute right-8 bottom-8 w-32 h-32">
          <img 
            src="/lovable-uploads/db3fbe19-e5ea-4571-b9be-e6e5f633c112.png" 
            alt="Playlist Cover" 
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 rounded-b-lg">
            <p className="text-sm text-center">Sunny</p>
            <p className="text-xs text-center">Chill House</p>
          </div>
        </div>
      </div>

      {/* Playlist Sections */}
      <div className="px-6 mt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Cafe Channel</h2>
            <p className="text-sm text-gray-400">Time to get jazzy</p>
          </div>
          <div className="relative">
            <Input 
              type="search" 
              placeholder="Search" 
              className="pl-10 bg-[#222] border-none text-white w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className="bg-[#222] border-none text-white overflow-hidden">
              <div className="relative aspect-square">
                <img 
                  src={playlist.image} 
                  alt={playlist.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button className="w-12 h-12 rounded-full bg-[#FFD700] flex items-center justify-center">
                    <span className="sr-only">Play</span>
                    ▶
                  </button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium">{playlist.title}</h3>
                <p className="text-sm text-gray-400">{playlist.venue}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#222] p-4">
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="flex items-center space-x-4">
            <button className="w-8 h-8">⬛</button>
            <div>
              <p className="font-medium">Playlist name</p>
              <p className="text-sm text-gray-400">ARTIST NAME</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center">
              ▶
            </button>
            <div className="w-96 h-1 bg-[#333] rounded-full">
              <div className="w-1/3 h-full bg-[#FFD700] rounded-full"></div>
            </div>
          </div>
          <button className="w-8 h-8">🔊</button>
        </div>
      </div>
    </div>
  );
}