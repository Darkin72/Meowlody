import { useState, useEffect } from "react";
import { getPlaylists, getPlaylistSongs } from "../Database/GetData";
import Table from "../Components/Table";
import getData from "../Database/GetData";
import Loading from "../Components/Loading";

function PlaylistScreen() {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSongs, setLoadingSongs] = useState(false);

  //Lấy danh sách playlist
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchedPlaylists = async () => {
      setLoading(true);
      try {
        const fetchedPlaylists = await getPlaylists();
        if (!signal.aborted) setPlaylists(fetchedPlaylists);
      } catch (error) {
        if (!signal.aborted) console.error("CANNOT FETCH PLAYLISTS", error);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchedPlaylists();

    return () => {
      controller.abort();
    };
  }, []);

  //Lấy danh sách bài hát sau khi playlist thay đổi
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchedPlaylistSongs = async () => {
      setLoadingSongs(true);
      try {
        const fetchedPlaylistSongs = await getPlaylistSongs(
          selectedPlaylist.id,
        );
        if (!signal.aborted) setPlaylistSongs(fetchedPlaylistSongs);
      } catch (error) {
        if (!signal.aborted)
          console.error("CANNOT FETCH SONGS FROM PLAYLIST", error);
      } finally {
        if (!signal.aborted) setLoadingSongs(false);
      }
    };

    fetchedPlaylistSongs();

    return () => {
      controller.abort();
    };
  }, [selectedPlaylist]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex h-full w-full bg-gray-900 text-white">
      {loading && <Loading />}
      <div className="w-[20%] border-r border-gray-700 bg-gray-800 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-list mx-1 text-xl"></i>
            <h2 className="text-xl font-semibold">Playlists</h2>
          </div>
          <button
            onClick={toggleExpand}
            className="text-gray-400 hover:text-white"
          >
            <i
              className={`fa-solid ${isExpanded ? "fa-chevron-up" : "fa-chevron-down"}`}
            ></i>
          </button>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-2">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                onClick={() => setSelectedPlaylist(playlist)}
                className={`flex cursor-pointer items-center space-x-3 rounded-md p-2 ${
                  selectedPlaylist && selectedPlaylist.id === playlist.id
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
              >
                <i className="fa-solid fa-music text-gray-400"></i>
                <span>{playlist.name}</span>
              </div>
            ))}

            <div className="mt-4 flex cursor-pointer items-center space-x-3 rounded-md p-2 hover:bg-gray-700">
              <i className="fa-solid fa-plus text-gray-400"></i>
              <span>Tạo playlist mới</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1">
        {selectedPlaylist ? (
          <>
            <div className="m-6">
              <h1 className="text-3xl font-bold">{selectedPlaylist.name}</h1>
              <p className="mt-2 text-gray-400">{playlistSongs.length} songs</p>
            </div>
            {loadingSongs && <Loading />}
            <Table data={playlistSongs} setData={setPlaylistSongs} />
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-xl text-gray-400">Choose a playlist to view</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaylistScreen;
