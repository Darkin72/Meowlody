import { useState } from "react";
import Dropdown from "../Components/Dropdown";
import GetData from "../Database/GetData";
import ModalComponent from "../Components/Modal";
import { SongPropertiesModal, AddToPlaylistModal } from "../Components/Modal";
import { getPlaylists } from "../Database/GetData";

function FavouritesScreen() {
  const [data, setData] = useState(GetData());

  return (
    <div className="flex flex-grow flex-col items-center">
      <SearchBar data={data} setData={setData} />
      <Table data={data} setData={setData} />
    </div>
  );
}

function SearchBar({ data, setData }) {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setData((prevData) =>
      prevData.map((row) =>
        row.title.toLowerCase().includes(value.toLowerCase())
          ? { ...row, valid: true }
          : { ...row, valid: false },
      ),
    );
  };
  return (
    <div className="m-[5%] mx-[10%] flex h-14 w-[70%] flex-row items-center rounded-md border-2 bg-gray-800">
      <i className="fa-solid fa-magnifying-glass px-2 text-[25px]"></i>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className={`flex-grow bg-gray-800 pl-1 text-[20px] focus:outline-none`}
        placeholder="Enter song name..."
      ></input>
    </div>
  );
}

function Table({ data, setData }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverNumber, setHoverNumber] = useState(-1);
  const [activeDropdownRow, setActiveDropdownRow] = useState(-1);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPropertiesModalOpen, setIsPropertiesModalOpen] = useState(false);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  const samplePlaylists = getPlaylists();

  const isRowActive = (index) => {
    return (hoverNumber === index && isHovered) || activeDropdownRow === index;
  };

  const handleDropdownOpenChange = (isOpen, rowIndex) => {
    setActiveDropdownRow(isOpen ? rowIndex : -1);
  };

  const handleOptionClick = (option, row) => {
    console.log(`Option selected: ${option} for song: ${row.title}`);
    setSelectedSong(row);

    switch (option) {
      case "Play next":
        // Xử lý phát bài hát tiếp theo
        console.log(isTestModalOpen);
        console.log(`Playing next: ${row.title}`);
        // Thêm logic xử lý phát bài hát tiếp theo ở đây
        setIsTestModalOpen(true);
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
        // Mở modal hiển thị thông tin chi tiết
        setIsPropertiesModalOpen(true);
        break;
      case "Delete":
        // Xử lý xóa bài hát
        console.log(`Deleting ${row.title}`);
        // Cập nhật dữ liệu để xóa bài hát
        setData((prevData) => prevData.filter((item) => item.id !== row.id));
        break;
      default:
        break;
    }
  };

  const handleAddToPlaylist = (playlistId, songId) => {
    console.log(`Adding song ID ${songId} to playlist ID ${playlistId}`);
    // Thêm logic xử lý thêm bài hát vào playlist ở đây
  };

  return (
    <div className="max-h-[70%] w-[90%] overflow-auto rounded-md">
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
            .filter((row) => row.valid && row.favorite)
            .map((row, index) => (
              <tr
                key={index}
                className={`text-slate-400 ${isRowActive(index) ? "bg-gray-500 text-white" : "hover:bg-gray-500 hover:text-white"}`}
                onMouseEnter={() => {
                  setHoverNumber(index);
                  setIsHovered(true);
                }}
                onMouseLeave={() => setIsHovered(false)}
              >
                <td className="w-[2.5%] overflow-hidden text-ellipsis whitespace-nowrap py-2 pr-1">
                  {isHovered && hoverNumber === index ? (
                    <i className="fa-solid fa-circle-play cursor-pointer"></i>
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
                  {((isHovered && hoverNumber === index) || row.favorite) && (
                    <i
                      className={`fa-regular fa-heart ${row.favorite && "fa-solid text-red-500"} cursor-pointer hover:text-red-100`}
                      onClick={() => {
                        setData((prevData) =>
                          prevData.map((item) =>
                            item.id === row.id
                              ? { ...item, favorite: !item.favorite }
                              : item,
                          ),
                        );
                      }}
                    ></i>
                  )}
                </td>
                <td className="w-[7.5%] overflow-hidden text-ellipsis whitespace-nowrap px-1 py-2 text-center">
                  {row.duration || "Unknown"}
                </td>

                <td>
                  <Dropdown
                    className="z-50 text-white"
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
        playlists={samplePlaylists}
        onAddToPlaylist={handleAddToPlaylist}
      />
    </div>
  );
}

export default FavouritesScreen;
