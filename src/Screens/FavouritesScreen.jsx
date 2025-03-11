import { useState, useEffect } from "react";
import getData from "../Database/GetData";
import Table from "../Components/Table";
import Loading from "../Components/Loading";

function FavouritesScreen({ setLatestSong, setIsFavoriteChange, setQueue }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
          console.error("CANNOT FETCH FAVORITE SONGS FROM DATABASE", error);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div
      className={`relative flex h-full flex-grow flex-col items-center ${loading ? "pointer-events-none opacity-60" : ""}`}
    >
      <SearchBar data={data} setData={setData} />
      {loading && <Loading />}

      <Table
        data={data.filter((row) => row.favorite)}
        setData={setData}
        setLatestSong={setLatestSong}
        setIsFavoriteChange={setIsFavoriteChange}
        setQueue={setQueue}
      />
      <p>
        There are {data.filter((row) => row.favorite).length} favorite songs!
      </p>
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

export default FavouritesScreen;
