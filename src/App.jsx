import { useState } from "react";
import HomeScreen from "./HomeScreen.jsx";
import LibraryScreen from "./LibraryScreen.jsx";
import FavouritesScreen from "./FavouritesScreen.jsx";
import PlaylistScreen from "./PlaylistScreen.jsx";
import HistoryScreen from "./HistoryScreen.jsx";
function App() {
  const [mainScreen, setMainScreen] = useState("home");
  const [userName, setUserName] = useState("");
  const [latestMusic, setLatestMusic] = useState("");
  return (
    <>
      <div className="flex h-screen">
        <Sidebar mainScreen={mainScreen} setMainScreen={setMainScreen} />
        <MainScreens
          mainScreen={mainScreen}
          userName={userName}
          setMainScreen={setMainScreen}
          setUserName={setUserName}
        />
      </div>
      {latestMusic !== "" ? (
        <CurrentMusic className="fixed bottom-0 left-0 w-full" />
      ) : (
        ""
      )}
    </>
  );
}

function MainScreens({
  mainScreen = "home",
  userName = "",
  setMainScreen,
  setUserName,
}) {
  switch (mainScreen) {
    case "home":
      return (
        <HomeScreen
          userName={userName}
          setMainScreen={setMainScreen}
          setUserName={setUserName}
        />
      );
    case "library":
      return <LibraryScreen />;
    case "favourites":
      return <FavouritesScreen />;
    case "playlist":
      return <PlaylistScreen />;
    case "history":
      return <HistoryScreen />;
  }
}

function Sidebar({ mainScreen, setMainScreen }) {
  return (
    <div className="flex w-72 min-w-64 flex-col bg-black p-4">
      <Header mainScreen={mainScreen} setMainScreen={setMainScreen}></Header>
      <FunctionList
        mainScreen={mainScreen}
        setMainScreen={setMainScreen}
      ></FunctionList>
    </div>
  );
}

function Header({ setMainScreen }) {
  return (
    <header className="mx-auto mb-10 mt-5">
      <button
        className="flex items-center justify-between gap-3 text-2xl font-bold opacity-80 hover:opacity-100"
        onClick={() => setMainScreen("home")}
      >
        <img className="h-16 w-16" src="/images/logo.png" alt="MEOWLODY_LOGO" />
        MEOWLODY
      </button>
    </header>
  );
}
function FunctionList({ mainScreen, setMainScreen }) {
  return (
    <nav className="mt-8 flex-1">
      <ul className="flex h-[50%] flex-col items-start text-xl">
        <li
          className={`${mainScreen === "home" ? "border-white" : "border-black"} flex w-full flex-grow cursor-pointer rounded-lg border-[5px] pl-3 opacity-80 hover:opacity-100`}
          onClick={() => setMainScreen("home")}
        >
          <button className="flex items-center">
            <i className="fa-solid fa-home ml-2 mr-4"></i>
            Home
          </button>
        </li>
        <li
          className={`${mainScreen === "library" ? "border-white" : "border-black"} flex w-full flex-grow cursor-pointer rounded-lg border-[5px] pl-3 opacity-80 hover:opacity-100`}
          onClick={() => setMainScreen("library")}
        >
          <button className="flex items-center">
            <i className="fa-solid fa-music ml-2 mr-4"></i>
            Library
          </button>
        </li>
        <li
          className={`${mainScreen === "favourites" ? "border-white" : "border-black"} flex w-full flex-grow cursor-pointer rounded-lg border-[5px] pl-3 opacity-80 hover:opacity-100`}
          onClick={() => setMainScreen("favourites")}
        >
          <button className="flex items-center">
            <i className="fa-solid fa-heart ml-2 mr-4"></i>
            Favourites
          </button>
        </li>
        <li
          className={`${mainScreen === "playlist" ? "border-white" : "border-black"} flex w-full flex-grow cursor-pointer rounded-lg border-[5px] pl-3 opacity-80 hover:opacity-100`}
          onClick={() => setMainScreen("playlist")}
        >
          <button className="flex items-center">
            <i className="fa-solid fa-list-ul ml-2 mr-4"></i>
            Playlist
          </button>
        </li>
        <li
          className={`${mainScreen === "history" ? "border-white" : "border-black"} flex w-full flex-grow cursor-pointer rounded-lg border-[5px] pl-3 opacity-80 hover:opacity-100`}
          onClick={() => setMainScreen("history")}
        >
          <button className="flex items-center">
            <i className="fa-solid fa-clock-rotate-left ml-2 mr-4"></i>
            History
          </button>
        </li>
      </ul>
    </nav>
  );
}
function CurrentMusic() {
  return (
    <div className="fixed bottom-0 flex w-full items-center justify-between bg-gray-800 p-4">
      <div className="flex w-[15%] items-center">
        <img
          alt="Album cover"
          className="mr-4 h-12 w-12 rounded-md object-cover"
          height="50"
          src="https://placehold.co/50x50"
          width="50"
        />
        <div className="w-[70%]">
          <h4 className="overflow-clip text-ellipsis text-sm font-semibold">
            Sweden
          </h4>
          <p className="overflow-clip text-ellipsis text-xs text-gray-400">
            InfernalEntertain
          </p>
        </div>
      </div>
      <div className="m-2 flex w-[15%] items-center justify-center">
        <button className="flex-grow text-gray-400">
          <i className="fa-solid fa-heart"></i>
        </button>
        <button className="flex-grow text-gray-400">
          <i className="fa-solid fa-backward"></i>
        </button>
        <button className="flex-grow text-gray-400">
          <i className="fa-solid fa-play"></i>
        </button>
        <button className="flex-grow text-gray-400">
          <i className="fa-solid fa-forward"></i>
        </button>
        <button className="flex-grow text-gray-400">
          <i className="fa-solid fa-repeat"></i>
        </button>
      </div>
      <div className="flex w-[45%] items-center">
        <span className="mr-2 w-[13%] text-xs text-gray-400">0:00 / 3:47</span>
        <div className="h-2 w-[90%] max-w-[720px] overflow-hidden rounded-full bg-gray-600">
          <div className="h-full w-0 bg-amber-50"></div>
        </div>
      </div>
      <div className="flex max-w-[12%] flex-grow items-center justify-center gap-3">
        <button className="text-gray-400">
          <i className="fa-solid fa-volume-up"></i>
        </button>
        <div className="h-2 flex-auto overflow-hidden rounded-full bg-gray-600">
          <div className="h-full w-full bg-amber-50"></div>
        </div>
        <button className="text-gray-400">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  );
}

export default App;
