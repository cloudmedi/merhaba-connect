import { Routes, Route } from "react-router-dom";
import { ManagerHeader } from "@/components/ManagerHeader";
import { ManagerNav } from "@/components/ManagerNav";
import { ProfileFooter } from "@/components/ProfileFooter";
import ManagerDashboard from "./Dashboard";
import { PlaylistDetail } from "./Playlists/PlaylistDetail";
import { CategoryPlaylists } from "./Playlists/CategoryPlaylists";
import Playlists from "./Playlists";
import Devices from "./Devices";
import Schedule from "./Schedule";
import Announcements from "./Announcements";
import Settings from "./Settings";
import ProfileSettings from "./Settings/Profile";

export default function Manager() {
  return (
    <div className="flex min-h-screen bg-gray-100/40">
      <ManagerNav />
      <div className="flex-1 relative">
        <ManagerHeader />
        <ProfileFooter />
        <main className="p-8">
          <Routes>
            <Route path="/" element={<ManagerDashboard />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/playlists/category/:categoryId" element={<CategoryPlaylists />} />
            <Route path="/playlists/:id" element={<PlaylistDetail />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/profile" element={<ProfileSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}