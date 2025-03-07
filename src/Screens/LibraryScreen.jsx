import { useState, useEffect } from "react";
import Dropdown from "../Components/Dropdown";
import getData from "../Database/GetData";
import { SongPropertiesModal, AddToPlaylistModal } from "../Components/Modal";
import Table from "../Components/Table";
import Loading from "../Components/Loading";

function LibraryScreen() {
  //TODO: Lấy danh sách bài hát từ database
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // isMounted kiểm tra xem component có tổn tại ko ?
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await getData();
        if (isMounted) setData(fetchedData);
      } catch (error) {
        console.error("CANNOT FETCH DATA", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      className={`relative flex h-full flex-grow flex-col items-center ${loading ? "pointer-events-none opacity-60" : ""}`}
    >
      <SearchBar data={data} setData={setData} />
      {loading && <Loading className="" />}

      <Table data={data} setData={setData} />
      <p>There are {data.length} songs in total!</p>
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
        onClick={() => setData(data)}
      >
        <i className="fa-solid fa-circle-plus mr-3"></i>
        Add new song
      </button>
    </div>
  );
}

export default LibraryScreen;
