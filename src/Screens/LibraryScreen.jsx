import { useState, useEffect } from "react";
import Dropdown from "../Components/Dropdown";
import getData from "../Database/GetData";
import { UploadSongModal } from "../Components/Modal";
import Table from "../Components/Table";
import Loading from "../Components/Loading";

function LibraryScreen({ setLatestSong, setFavoriteChange }) {
  //TODO: Lấy danh sách bài hát từ database
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [libraryChange, setLibraryChange] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await getData();
        if (!signal.aborted) setData(fetchedData);
      } catch (error) {
        if (!signal.aborted)
          console.error("CANNOT FETCH SONGS FROM DATABASE", error);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [libraryChange]);

  return (
    <div
      className={`relative flex h-full flex-grow flex-col items-center ${loading ? "pointer-events-none opacity-60" : ""}`}
    >
      <SearchBar
        data={data}
        setData={setData}
        setLibraryChange={setLibraryChange}
      />
      {loading && <Loading className="" />}

      <Table data={data} setData={setData} setLatestSong={setLatestSong} />
      <p>There are {data.length} songs in total!</p>
    </div>
  );
}

function SearchBar({ data, setData, setLibraryChange }) {
  const [inputValue, setInputValue] = useState("");
  const [isUploadSongOpen, setUploadSongOpen] = useState(false);
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
    <div className="flex w-full">
      <div className="m-[5%] ml-[7%] mr-[1%] flex h-14 w-[70%] flex-row items-center rounded-md border-2 bg-gray-800">
        <i className="fa-solid fa-magnifying-glass px-2 text-[25px]"></i>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className={`flex-grow bg-gray-800 pl-1 text-[20px] focus:outline-none`}
          placeholder="Enter song name..."
        ></input>
      </div>
      <button
        className="m-[5%] ml-0 mr-[7%] h-14 w-[20%] rounded-md border-2 border-gray-300 bg-gray-800 hover:bg-gray-500 active:animate-ping"
        onClick={() => {
          setUploadSongOpen(true);
          // setData(data);
        }}
      >
        <i className="fa-solid fa-circle-plus mr-3"></i>
        Add new song
      </button>
      <UploadSongModal
        isOpen={isUploadSongOpen}
        setLibraryChange={setLibraryChange}
        onClose={() => setUploadSongOpen(false)}
      />
    </div>
  );
}

export default LibraryScreen;
