import { useState } from "react";

function LibraryScreen() {
  const [data, setData] = useState([
    {
      id: 1,
      title: "C418",
      artist: "InfernalEntertain",
      album: "",
      genre: "",
      date_added: "2025-03-04",
      duration: "03:35",
      favorite: false,
      valid: true,
    },
    {
      id: 2,
      title: "C418  - Sweden - Minecraft Volume Alpha",
      artist: "InfernalEntertain",
      album: "",
      genre: "",
      date_added: "2025-03-04",
      duration: "03:35",
      favorite: true,
      valid: true,
    },
    {
      id: 3,
      title: "C418  - Sweden - Minecraft Volume Alpha",
      artist: "InfernalEntertain",
      album: "",
      genre: "",
      date_added: "2025-03-04",
      duration: "03:35",
      favorite: false,
      valid: true,
    },
  ]);
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
    console.log(data);
  };
  return (
    <div className="m-[5%] flex w-[70%] flex-row items-center rounded-md border-2 bg-gray-800">
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
  return (
    <table className="m-3 w-[90%] border-collapse">
      <thead>
        <tr className="">
          <th className="w-[5%] border-b border-gray-400 py-2 text-left">#</th>
          <th className="w-[30%] border-b border-gray-400 py-2 text-left">
            Title
          </th>
          <th className="w-[20%] border-b border-gray-400 py-2 text-left">
            Artist
          </th>
          <th className="w-[10%] border-b border-gray-400 py-2 text-left">
            Album
          </th>
          <th className="w-[10%] border-b border-gray-400 py-2 text-left">
            Genre
          </th>
          <th className="w-[15%] border-b border-gray-400 py-2 text-left">
            Date added
          </th>
          <th className="w-[5%] border-b border-gray-400 py-2"></th>
          <th className="w-[5%] border-b border-gray-400 py-2 text-center">
            <i className="fa-regular fa-clock"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        {data
          .filter((row) => row.valid)
          .map((row, index) => (
            <tr
              key={index}
              className="cursor-pointer text-slate-300 hover:bg-gray-500 hover:text-white"
            >
              <td className="w-[5%] overflow-hidden text-ellipsis whitespace-nowrap py-2">
                {index + 1}
              </td>
              <td className="w-[30%] overflow-hidden text-ellipsis whitespace-nowrap py-2">
                {row.title || "Unknown"}
              </td>
              <td className="w-[20%] overflow-hidden text-ellipsis whitespace-nowrap py-2">
                {row.artist || "Unknown"}
              </td>
              <td className="w-[10%] overflow-hidden text-ellipsis whitespace-nowrap py-2">
                {row.album || "Unknown"}
              </td>
              <td className="w-[10%] overflow-hidden text-ellipsis whitespace-nowrap py-2">
                {row.genre || "Unknown"}
              </td>
              <td className="w-[15%] overflow-hidden text-ellipsis whitespace-nowrap py-2">
                {row.date_added || "Unknown"}
              </td>
              <td className="w-[5%] overflow-hidden text-ellipsis whitespace-nowrap py-2">
                <i
                  className={`fa-regular fa-heart ${row.favorite && "fa-solid text-red-500"} hover:text-red-100`}
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
              </td>
              <td className="w-[5%] overflow-hidden text-ellipsis whitespace-nowrap py-2 text-center">
                {row.duration || "Unknown"}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default LibraryScreen;
