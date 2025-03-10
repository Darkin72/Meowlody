import { useState } from "react";
import Dropdown from "./Dropdown";
import { SongPropertiesModal, AddToPlaylistModal } from "./Modal";
import { getPlaylists } from "../Database/GetData";
import Loading from "./Loading";

function Table({ data, setData, setLatestSong, setIsFavoriteChange }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverNumber, setHoverNumber] = useState(-1);
  const [activeDropdownRow, setActiveDropdownRow] = useState(-1);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPropertiesModalOpen, setIsPropertiesModalOpen] = useState(false);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isRowActive = (index) => {
    return (hoverNumber === index && isHovered) || activeDropdownRow === index;
  };

  const handleDropdownOpenChange = (isOpen, rowIndex) => {
    setActiveDropdownRow(isOpen ? rowIndex : -1);
    console.log(`Dropdown ${isOpen ? "opened" : "closed"} for row ${rowIndex}`);
  };

  const handleOptionClick = async (option, row) => {
    setIsLoading(true);
    setSelectedSong(row);

    switch (option) {
      case "Play next":
        // Xử lý phát bài hát tiếp theo
        console.log(`Playing next: ${row.title}`);
        // Thêm logic xử lý phát bài hát tiếp theo ở đây
        break;
      case "Add to queue":
        // Xử lý thêm vào hàng đợi
        console.log(`Adding to queue: ${row.title}`);
        // Thêm logic xử lý thêm vào hàng đợi ở đây
        break;
      case "Add to playlist":
        // Mở modal thêm vào playlist
        setIsPlaylistModalOpen(true);
        break;
      case "Properties":
        setIsPropertiesModalOpen(true);
        break;
      case "Delete":
        try {
          const response = await fetch(
            `http://localhost:7205/song/${row.id}?filePath=.${row.src}`,
            {
              method: "DELETE",
            },
          );
          setData((prevData) => prevData.filter((song) => song.id !== row.id));
          console.log(await response.json());
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
          break;
        }
      case "Download":
        window.location.href =
          "http://localhost:7205/download/" + row.src.substring(13);
      default:
        break;
    }
  };

  const handlePlayClick = (row) => {
    setLatestSong(row);
  };

  const handleAddToPlaylist = (playlistId, songId) => {
    console.log(`Adding song ID ${songId} to playlist ID ${playlistId}`);
    // Thêm logic xử lý thêm bài hát vào playlist ở đây
  };

  const toggleFavorite = async (song) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:7205/favorite/${song.id}?favorite=${1 - song.favorite}`,
        { method: "PATCH" },
      );
      song.favorite = 1 - song.favorite;
      console.log(await response.json());
      setIsFavoriteChange((e) => !e);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`${activeDropdownRow !== -1 ? "pointer-events-none" : ""} h-[67.5%] w-full overflow-auto rounded-md`}
    >
      {isLoading && <Loading />}
      <table className="m-3 w-[97.5%] table-auto border-collapse">
        <thead className="sticky top-0 bg-gray-900">
          <tr className="">
            <th className="w-[2.5%] border-b border-gray-400 py-2 pr-1 text-left">
              #
            </th>
            <th className="w-[30%] border-b border-gray-400 px-1 py-2 text-left">
              Title
            </th>
            <th className="w-[20%] border-b border-gray-400 px-1 py-2 text-left">
              Artist
            </th>
            <th className="w-[12.5%] border-b border-gray-400 px-1 py-2 text-left">
              Album
            </th>
            <th className="w-[10%] border-b border-gray-400 px-1 py-2 text-left">
              Date added
            </th>
            <th className="w-[2.5%] border-b border-gray-400 px-1 py-2"></th>
            <th className="w-[10%] border-b border-gray-400 py-2 pl-1 text-center">
              <i className="fa-regular fa-clock"></i>
            </th>
            <th className="w-[2.5%] border-b border-gray-400 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((row) => row.valid)
            .map((row, index) => (
              <tr
                key={row.id}
                className={`text-slate-400 ${isRowActive(index) ? "bg-gray-500 text-white" : "hover:bg-gray-500 hover:text-white"}`}
                onMouseEnter={() => {
                  setHoverNumber(index);
                  setIsHovered(true);
                }}
                onMouseLeave={() => setIsHovered(false)}
              >
                <td className="w-[2.5%] overflow-hidden text-ellipsis whitespace-nowrap py-2 pr-1">
                  {isHovered && hoverNumber === index ? (
                    <i
                      className="fa-solid fa-circle-play cursor-pointer"
                      onClick={() => handlePlayClick(row)}
                    ></i>
                  ) : (
                    index + 1
                  )}
                </td>
                <td className="w-[30%] overflow-hidden text-ellipsis whitespace-nowrap px-1 py-2">
                  {row.title || "Unknown"}
                </td>
                <td className="w-[20%] overflow-hidden text-ellipsis whitespace-nowrap px-1 py-2">
                  {row.artist || "Unknown"}
                </td>
                <td className="w-[12.5%] overflow-hidden text-ellipsis whitespace-nowrap px-1 py-2">
                  {row.album || "Unknown"}
                </td>
                <td className="w-[10%] overflow-hidden text-ellipsis whitespace-nowrap px-1 py-2">
                  {row.date_added || "Unknown"}
                </td>
                <td className="w-[2.5%] overflow-hidden text-ellipsis whitespace-nowrap px-1 py-2 text-center">
                  {((isHovered && hoverNumber === index) ||
                    row.favorite == true) && (
                    <i
                      className={`fa-regular fa-heart ${row.favorite == true && "fa-solid text-red-500"} cursor-pointer hover:text-red-100`}
                      onClick={() => toggleFavorite(row)}
                    ></i>
                  )}
                </td>
                <td className="w-[7.5%] overflow-hidden text-ellipsis whitespace-nowrap px-1 py-2 text-center">
                  {row.duration || "Unknown"}
                </td>

                <td>
                  <Dropdown
                    className="text-white"
                    buttonLabel="..."
                    isHovered={isRowActive(index)}
                    onOpenChange={(isOpen) =>
                      handleDropdownOpenChange(isOpen, index)
                    }
                    onOptionClick={(option) => handleOptionClick(option, row)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <SongPropertiesModal
        isOpen={isPropertiesModalOpen}
        onClose={() => setIsPropertiesModalOpen(false)}
        song={selectedSong}
      />

      <AddToPlaylistModal
        isOpen={isPlaylistModalOpen}
        onClose={() => setIsPlaylistModalOpen(false)}
        song={selectedSong}
        onAddToPlaylist={handleAddToPlaylist}
      />
    </div>
  );
}

export default Table;
