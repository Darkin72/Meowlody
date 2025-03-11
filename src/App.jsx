import { useState, useEffect } from "react";
import HomeScreen from "./Screens/HomeScreen.jsx";
import LibraryScreen from "./Screens/LibraryScreen.jsx";
import FavouritesScreen from "./Screens/FavouritesScreen.jsx";
import PlaylistScreen from "./Screens/PlaylistScreen.jsx";
import MusicPlayer from "./Functions/MusicPlayer.jsx";
import { QueueProvider, useQueue } from "./Context/QueueContext.jsx";

function App() {
  const [mainScreen, setMainScreen] = useState("home");
  const [userName, setUserName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [latestSong, setLatestSong] = useState(null);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isFavoriteChange, setIsFavoriteChange] = useState(false);

  return (
    <QueueProvider>
      <AppContent
        mainScreen={mainScreen}
        setMainScreen={setMainScreen}
        userName={userName}
        setUserName={setUserName}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        latestSong={latestSong}
        setLatestSong={setLatestSong}
        isRepeat={isRepeat}
        setIsRepeat={setIsRepeat}
        volume={volume}
        setVolume={setVolume}
        isFavoriteChange={isFavoriteChange}
        setIsFavoriteChange={setIsFavoriteChange}
      />
    </QueueProvider>
  );
}

function AppContent({
  mainScreen,
  setMainScreen,
  userName,
  setUserName,
  isPlaying,
  setIsPlaying,
  latestSong,
  setLatestSong,
  isRepeat,
  setIsRepeat,
  volume,
  setVolume,
  isFavoriteChange,
  setIsFavoriteChange,
}) {
  const { queue, setQueue } = useQueue();

  return (
    <>
      <div className="flex h-screen">
        <Sidebar mainScreen={mainScreen} setMainScreen={setMainScreen} />
        <MainScreens
          mainScreen={mainScreen}
          userName={userName}
          setMainScreen={setMainScreen}
          setUserName={setUserName}
          setLatestSong={setLatestSong}
          setIsFavoriteChange={setIsFavoriteChange}
          queue={queue}
          setQueue={setQueue}
        />
      </div>
      {latestSong != null ? (
        <MusicPlayer
          song={latestSong}
          setSong={setLatestSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          isRepeat={isRepeat}
          setIsRepeat={setIsRepeat}
          volume={volume}
          setVolume={setVolume}
          setIsFavoriteChange={setIsFavoriteChange}
          queue={queue}
          setQueue={setQueue}
        />
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
  setLatestSong,
  setIsFavoriteChange,
  queue,
  setQueue,
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
      return (
        <LibraryScreen
          setLatestSong={setLatestSong}
          setIsFavoriteChange={setIsFavoriteChange}
          queue={queue}
          setQueue={setQueue}
        />
      );
    case "favourites":
      return (
        <FavouritesScreen
          setLatestSong={setLatestSong}
          setIsFavoriteChange={setIsFavoriteChange}
          queue={queue}
          setQueue={setQueue}
        />
      );
    case "playlist":
      return <PlaylistScreen queue={queue} setQueue={setQueue} />;
    default:
      return null;
  }
}

function Sidebar({ mainScreen, setMainScreen }) {
  return (
    <div className="flex w-72 min-w-72 flex-col bg-black p-4">
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
      </ul>
    </nav>
  );
}

export default App;
