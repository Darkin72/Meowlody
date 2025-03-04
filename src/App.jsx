import { useState } from "react";

function App() {
  const [mainScreen, setMainScreen] = useState("home");
  const [userName, setUserName] = useState("");
  const [latestMusic, setLatestMusic] = useState("");
  console.log(mainScreen);
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
    <div className="flex w-72 flex-col bg-black p-4">
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
function HomeScreen({ userName = "", setMainScreen, setUserName }) {
  const [form, setForm] = useState("login");
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-4">
      <h1 className="font-madimi text-[50px] uppercase">
        {userName !== ""
          ? `how are you, ${userName} ?`
          : `welcome to MEOWLODY!!!`}
      </h1>
      {userName === "" ? (
        form === "login" ? (
          <>
            <LoginForm
              setMainScreen={setMainScreen}
              setUserName={setUserName}
              userName={userName}
            />
            <LoginFormEnd setForm={setForm} />
          </>
        ) : (
          <RegisterForm />
        )
      ) : (
        <button
          className="m-2 rounded-md border-2 border-neutral-300 bg-gray-800 p-3 text-[20px]"
          onClick={() => setMainScreen("library")}
        >
          Start listening...
        </button>
      )}
    </div>
  );
}
function LoginForm({ setMainScreen, setUserName, userName }) {
  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-[20px]">Username : </span>
        <span className="text-[20px]">Password : </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <input
          type="text"
          value={userName}
          className="rounded-md border-2 border-neutral-300 bg-gray-800 pl-2 text-[20px]"
          placeholder="Enter username..."
        ></input>
        <input
          type="password"
          className="rounded-md border-2 border-neutral-300 bg-gray-800 pl-2 text-[20px]"
          placeholder="Not supported yet..."
        ></input>
      </div>
      <button
        className="rounded-md border-2 border-neutral-300 bg-gray-800 px-4 text-[20px]"
        type="submit"
        onClick={() => {
          setMainScreen("library");
        }}
      >
        Login
      </button>
    </div>
  );
}
function LoginFormEnd({ setForm }) {
  return (
    <div className="flex w-[40%] items-center">
      <button
        className="flex-grow"
        onClick={() => {
          alert("NOT SUPPORTED YET...");
        }}
      >
        {" "}
        Forgot Password{" "}
      </button>
      <button className="flex-grow" onClick={() => setForm("register")}>
        {" "}
        Create Account{" "}
      </button>
    </div>
  );
}
function RegisterForm() {
  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-[20px]">New Username : </span>
        <span className="text-[20px]">New Password : </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <input
          type="text"
          className="rounded-md border-2 border-neutral-300 bg-gray-800 pl-2 text-[20px]"
          placeholder="Enter username..."
        ></input>
        <input
          type="password"
          className="rounded-md border-2 border-neutral-300 bg-gray-800 pl-2 text-[20px]"
          placeholder="Not supported yet..."
        ></input>
      </div>
      <button
        className="rounded-md border-2 border-neutral-300 bg-gray-800 px-4 text-[20px]"
        type="submit"
      >
        Register
      </button>
    </div>
  );
}
function LibraryScreen() {
  return (
    <div className="flex items-center justify-center">
      <h1>LIBRARY</h1>
    </div>
  );
}
function FavouritesScreen() {
  return <h1>FAVOURITES</h1>;
}
function PlaylistScreen() {
  return <h1>PLAYLIST</h1>;
}
function HistoryScreen() {
  return <h1>HISTORY</h1>;
}
export default App;
