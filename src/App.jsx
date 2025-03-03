import { useState } from "react";

function App() {
  console.log("App");
  const [mainScreen, isMainScreen] = useState(true);
  return (
    <>
      <div className="flex h-screen">
        <Sidebar mainScreen={mainScreen} isMainScreen={isMainScreen}></Sidebar>
      </div>
      <CurrentMusic className="fixed bottom-0 left-0 w-full"></CurrentMusic>
    </>
  );
}

function Sidebar({ mainScreen, isMainScreen }) {
  return (
    <div className="flex w-72 flex-col bg-black p-4">
      <Header mainScreen={mainScreen} isMainScreen={isMainScreen}></Header>
      <FunctionList></FunctionList>
    </div>
  );
}

function Header({ mainScreen, isMainScreen }) {
  return (
    <header className="mx-auto mb-10 mt-3">
      <button
        className="flex items-center justify-between gap-3 text-2xl font-bold opacity-80 hover:opacity-100"
        onClick={() => isMainScreen(true)}
      >
        <img className="h-16 w-16" src="/images/logo.png" alt="MEOWLODY_LOGO" />
        MEOWLODY
      </button>
    </header>
  );
}
function FunctionList() {
  return (
    <nav className="mt-4 flex justify-center">
      <ul className="pr-20 text-xl">
        <li className="mb-4 opacity-80 hover:opacity-100">
          <a className="flex items-center" href="#">
            <i className="fa-solid fa-music ml-2 mr-4"></i>
            Library
          </a>
        </li>
        <li className="mb-4 opacity-80 hover:opacity-100">
          <a className="flex items-center" href="#">
            <i className="fa-solid fa-heart ml-2 mr-4"></i>
            Favourites
          </a>
        </li>
        <li className="mb-4 opacity-80 hover:opacity-100">
          <a className="flex items-center" href="#">
            <i className="fa-solid fa-list-ul ml-2 mr-4"></i>
            Playlist
          </a>
        </li>
        <li className="mb-4 opacity-80 hover:opacity-100">
          <a className="flex items-center" href="#">
            <i className="fa-solid fa-clock-rotate-left ml-2 mr-4"></i>
            History
          </a>
        </li>
      </ul>
    </nav>
  );
}
function CurrentMusic() {
  return (
    <div className="fixed bottom-0 flex w-full items-center justify-between bg-gray-800 p-4">
      <div className="flex w-1/5 items-center">
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
      <div className="m-2 flex w-[10%] items-center justify-center">
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
      <div className="flex w-[40%] items-center">
        <span className="mr-2 text-xs text-gray-400">0:00 / 3:47</span>
        <div className="h-2 w-[90%] max-w-[720px] overflow-hidden rounded-full bg-gray-600">
          <div className="h-full w-0 bg-amber-50"></div>
        </div>
      </div>
      <div className="flex max-w-[10%] flex-grow items-center justify-center gap-3">
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
