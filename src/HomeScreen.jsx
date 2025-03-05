import { useState } from "react";
function HomeScreen({ userName = "", setMainScreen, setUserName }) {
  const [form, setForm] = useState("login");
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-4">
      <h1 className="overflow-hidden text-ellipsis whitespace-nowrap font-madimi text-[50px] uppercase">
        {userName !== ""
          ? `how are you, ${userName} ?`
          : `welcome to MEOWLODY!!!`}
      </h1>
      {userName === "" ? (
        form === "login" ? (
          <>
            <LoginForm setUserName={setUserName} />
            <LoginFormEnd setForm={setForm} />
          </>
        ) : (
          <>
            <RegisterForm setUserName={setUserName} />
            <RegisterFormEnd setForm={setForm} />
          </>
        )
      ) : (
        <div className="flex flex-row">
          <button
            className="m-2 rounded-md border-2 border-neutral-300 bg-gray-800 p-3 text-[20px] transition-all duration-[300ms] hover:scale-105 hover:bg-zinc-500 active:animate-ping"
            onClick={() => setMainScreen("library")}
          >
            Start listening...
          </button>
          <button
            className="m-2 rounded-md border-2 border-neutral-300 bg-gray-800 p-3 text-[20px] transition-all duration-[300ms] hover:scale-105 hover:bg-zinc-500 active:animate-ping"
            onClick={() => setUserName("")}
          >
            Logout
            <i class="fa-solid fa-right-from-bracket ml-2"></i>
          </button>
        </div>
      )}
    </div>
  );
}
function isValidInput(input) {
  const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{1,16}$/;
  return regex.test(input);
}
function isUsernameExists(username) {
  return true;
}
function addUserToDatabase(username) {
  return;
}
function LoginForm({ setUserName }) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (!isValidInput(value)) {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-[20px]">Username : </span>
        <span className="text-[20px]">Password : </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className={`${error ? "border-red-500 focus:border-red-500" : "border-neutral-300 focus:border-neutral-300"} rounded-md border-2 bg-gray-800 pl-2 text-[20px]`}
          placeholder="Enter username..."
        ></input>
        <input
          type="password"
          className="rounded-md border-2 border-neutral-300 bg-gray-800 pl-2 text-[20px]"
          placeholder="Not supported yet..."
        ></input>
      </div>
      <button
        className="rounded-md border-2 border-neutral-300 bg-gray-800 px-4 text-[20px] transition-all duration-[300ms] hover:scale-105 hover:bg-zinc-500 active:animate-ping"
        type="submit"
        onClick={() => {
          if (inputValue === "") {
            alert("Please enter a username.");
            return;
          }
          if (error)
            alert(
              "Username must be alphanumeric, length 1-16, and no special characters or spaces.",
            );
          else {
            if (isUsernameExists(inputValue)) {
              setUserName(inputValue);
            } else {
              alert("Username does not exist.");
            }
          }
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
        className="flex-grow hover:underline"
        onClick={() => {
          alert("NOT SUPPORTED YET...");
        }}
      >
        {" "}
        Forgot Password{" "}
      </button>
      <button
        className="flex-grow hover:underline"
        onClick={() => setForm("register")}
      >
        {" "}
        Create Account{" "}
      </button>
    </div>
  );
}
function RegisterForm({ setUserName }) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (!isValidInput(value)) {
      setError(true);
    } else {
      setError(false);
    }
  };
  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-[20px]">New Username : </span>
        <span className="text-[20px]">New Password : </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className={`${error ? "border-red-500 focus:border-red-500" : "border-neutral-300 focus:border-neutral-300"} rounded-md border-2 bg-gray-800 pl-2 text-[20px]`}
          placeholder="Enter username..."
        ></input>
        <input
          type="password"
          className="rounded-md border-2 border-neutral-300 bg-gray-800 pl-2 text-[20px]"
          placeholder="Not supported yet..."
        ></input>
      </div>
      <button
        className="rounded-md border-2 border-neutral-300 bg-gray-800 px-4 text-[20px] transition-all duration-[300ms] hover:scale-105 hover:bg-zinc-500 active:animate-ping"
        type="submit"
        onClick={() => {
          if (inputValue === "") {
            alert("Please enter a username.");
            return;
          }
          if (error)
            alert(
              "Username must be alphanumeric, length 1-16, and no special characters or spaces.",
            );
          else {
            if (isUsernameExists(inputValue)) {
              alert("Username already exist.");
            } else {
              setUserName(inputValue);
              addUserToDatabase(inputValue);
            }
          }
        }}
      >
        Register
      </button>
    </div>
  );
}
function RegisterFormEnd({ setForm }) {
  return (
    <button className="hover:underline" onClick={() => setForm("login")}>
      <i className="fa-solid fa-arrow-left mr-2"></i>
      Back to login.
    </button>
  );
}
export default HomeScreen;
