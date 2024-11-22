import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Manager from "./pages/Manager";
import { GenrePlaylists } from "./pages/Manager/Playlists/GenrePlaylists";
import { MoodPlaylists } from "./pages/Manager/Playlists/MoodPlaylists";
import { PlaylistDetail } from "@/components/playlists/PlaylistDetail";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/manager",
    element: <Manager />,
    children: [
      {
        path: "playlists/genre/:genreId",
        element: <GenrePlaylists />,
      },
      {
        path: "playlists/mood/:moodId",
        element: <MoodPlaylists />,
      },
      {
        path: "playlists/:id",
        element: <PlaylistDetail />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;