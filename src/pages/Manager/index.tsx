import { Routes, Route } from "react-router-dom";
import ManagerDashboard from "./Dashboard";
import { ManagerNav } from "@/components/ManagerNav";
import { PlaylistDetail } from "@/components/playlists/PlaylistDetail";
import { ManagerHeader } from "@/components/ManagerHeader";

export default function Manager() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      <ManagerNav />
      <div className="flex-1">
        <ManagerHeader />
        <main className="mx-auto w-full p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-[1400px]">
            <Routes>
              <Route index element={<ManagerDashboard />} />
              <Route path="playlists/:id" element={<PlaylistDetail />} />
              {/* Other routes will be added here */}
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
