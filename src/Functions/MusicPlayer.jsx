import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import image from "/images/music.png";
import formatTime from "./FormatTime";
import Loading from "../Components/Loading";
import { useQueue } from "../Context/QueueContext";

function MusicPlayer({
  song,
  setSong,
  isPlaying,
  setIsPlaying,
  isRepeat,
  setIsRepeat,
  volume,
  setVolume,
  setIsFavoriteChange,
}) {
  const { queue, setQueue } = useQueue();
  const [history, setHistory] = useState([]);
  const soundRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  //song change
  useEffect(() => {
    if (!song) return;

    if (soundRef.current) {
      soundRef.current.unload();
    }

    if (queue.length > 0) {
      if (queue[0]?.id !== song.id) {
        setQueue((prevQueue) => [song, ...prevQueue.slice(1)]);
      }
    } else {
      setQueue([song]);
    }

    soundRef.current = new Howl({
      src: [song.src],
      volume: volume / 100,
      html5: true,
      onload: function () {
        console.log("File đã load thành công!");
      },
      onloaderror: function (id, err) {
        console.error("Lỗi khi tải file:", err);
      },
      loop: isRepeat,
      onplay: () => {
        if (history[history.length - 1]?.id !== song.id) {
          setHistory((prevHistory) => [...prevHistory, song]);
        }
        setIsPlaying(true);
      },
      onpause: () => setIsPlaying(false),
    });
    soundRef.current.play();
    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [song]);

  //Queue change
  useEffect(() => {
    if (queue.length > 0 && song?.id !== queue[0]?.id) {
      setSong(queue[0]);
    } else if (queue.length === 0 && song) {
      setSong("");
    }
  }, [queue]);

  //Time update
  useEffect(() => {
    let interval;
    if (isPlaying && soundRef.current) {
      interval = setInterval(() => {
        setCurrentTime(soundRef.current.seek());
      }, 50);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying]);

  //Volume change
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(volume / 100);
    }
  }, [volume]);

  //Loop change
  useEffect(() => {
    if (soundRef.current) {
      console.log("Setting loop state directly:", isRepeat);
      soundRef.current.loop(isRepeat);
    }
  }, [isRepeat]);

  useEffect(() => {
    const handleSongEnd = () => {
      console.log("Song ended event triggered, isRepeat:", isRepeat);

      if (!isRepeat) {
        console.log("Not in repeat mode, removing song from queue");
        setQueue((prevQueue) => prevQueue.slice(1));
      } else {
        console.log("In repeat mode, keeping song in queue");
        setIsPlaying(true);
      }
    };

    if (soundRef.current) {
      soundRef.current.off("end");
      soundRef.current.on("end", handleSongEnd);
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.off("end");
      }
    };
  }, [isRepeat, song]);

  const toggleFavorite = async (song) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:7205/favorite/${song.id}?favorite=${1 - song.favorite}`,
        { method: "PATCH" },
      );
      song.favorite = 1 - song.favorite;
      setIsFavoriteChange((e) => !e);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
    } else {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleBackward = () => {
    if (!soundRef.current) return;
    if (history.length > 1) {
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      setQueue((prevQueue) => [song, ...prevQueue]);
      setSong(history[history.length - 2]);
    } else {
      soundRef.current.stop();
      soundRef.current.play();
    }
  };

  const toggleForward = () => {
    if (!soundRef.current) return;
    if (queue.length > 1) {
      setQueue((prevQueue) => prevQueue.slice(1));
    }
  };

  const toggleLoop = () => {
    if (!soundRef.current) return;

    // Đảo ngược trạng thái isRepeat
    const newRepeatState = !isRepeat;

    console.log("Toggle Loop clicked:", {
      current: isRepeat,
      new: newRepeatState,
    });

    // Cập nhật state React
    setIsRepeat(newRepeatState);
  };

  const toggleVolumeDown = () => {
    if (!soundRef.current || volume === 0) return;
    setVolume((volume) => Math.max(0, volume - 5));
  };

  const toggleVolumeUp = () => {
    if (!soundRef.current || volume === 100) return;
    setVolume((volume) => Math.min(100, volume + 5));
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div
      className={`fixed bottom-0 flex h-[75px] w-full items-center justify-between bg-gray-800 p-4 ${isLoading && "opacity-50"}`}
    >
      {isLoading && <Loading />}
      <div className="ml-5 flex h-full w-[18%] items-center">
        <img
          alt="Album cover"
          className="mr-4 h-12 w-12 rounded-md object-cover"
          height="50"
          src={image}
          width="50"
        />
        <div className="h-full max-w-[90%]">
          <h4 className="overflow-clip text-ellipsis whitespace-nowrap text-sm font-semibold">
            {song.title}
          </h4>
          <p className="overflow-clip text-ellipsis whitespace-nowrap text-xs text-gray-400">
            {song.artist}
          </p>
        </div>
      </div>
      <div className="m-2 flex w-[15%] items-center justify-center">
        <button
          className="flex-grow text-gray-400"
          onClick={() => toggleFavorite(song)}
        >
          <i
            className={`fa-regular fa-heart ${song.favorite == true && "fa-solid text-red-500"} cursor-pointer hover:text-red-100`}
          ></i>
        </button>
        <button
          className="flex-grow text-gray-400 hover:text-gray-100"
          onClick={toggleBackward}
        >
          <i className="fa-solid fa-backward"></i>
        </button>
        <button
          className="flex-grow cursor-pointer text-gray-400 hover:text-gray-100"
          onClick={togglePlayPause}
          disabled={queue.length === 0}
        >
          {isPlaying ? (
            <i className="fa-solid fa-pause"></i>
          ) : (
            <i className="fa-solid fa-play"></i>
          )}
        </button>
        <button
          className="flex-grow text-gray-400 hover:text-gray-100"
          onClick={toggleForward}
        >
          <i className="fa-solid fa-forward"></i>
        </button>
        <button className="flex-grow text-gray-400" onClick={toggleLoop}>
          <i
            className={`fa-solid fa-repeat ${isRepeat ? "text-green-600" : ""} hover:text-green-200`}
          ></i>
        </button>
      </div>
      <div className="flex w-[45%] items-center">
        <span className="mr-2 w-[13%] text-xs text-gray-400">
          {formatTime(currentTime)} /{" "}
          {soundRef.current ? formatTime(soundRef.current.duration()) : "0:00"}
        </span>
        <div className="h-2 w-[90%] max-w-[720px] overflow-hidden rounded-full bg-gray-600">
          <div
            className={`h-full bg-amber-500`}
            style={{
              width: `${(soundRef.current
                ? (currentTime / soundRef.current.duration()) * 100
                : 0
              ).toFixed(2)}%`,
            }}
          ></div>
        </div>
      </div>
      <div className="flex max-w-[12%] flex-grow items-center justify-center gap-7">
        <button
          className="text-gray-400 hover:text-gray-100"
          onClick={toggleVolumeUp}
        >
          <i className="fa-solid fa-volume-up"></i>
        </button>
        <div className="flex w-[25px] justify-center">
          <p>{volume}</p>
        </div>
        <button
          className="text-gray-400 hover:text-gray-100"
          onClick={toggleVolumeDown}
        >
          <i className="fa-solid fa-volume-down"></i>
        </button>
        <button
          className="text-gray-400 hover:text-gray-100"
          onClick={toggleSidebar}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      {showSidebar && (
        <div className="fixed right-0 top-0 z-50 h-full w-[20%] overflow-auto bg-gray-800 p-4 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Queue</h2>
            <button
              className="text-gray-400 hover:text-gray-100"
              onClick={toggleSidebar}
            >
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
          <div className="space-y-2">
            {queue.length > 0 ? (
              queue.map((queuedSong, index) => (
                <div
                  key={index}
                  className={`flex items-center rounded-md p-2 ${
                    index === 0 ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                >
                  <img
                    src={image}
                    alt="Album cover"
                    className="mr-3 h-10 w-10 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="overflow-clip text-ellipsis whitespace-nowrap text-sm font-medium text-white">
                      {queuedSong.title}
                    </p>
                    <p className="overflow-clip text-ellipsis whitespace-nowrap text-xs text-gray-400">
                      {queuedSong.artist}
                    </p>
                  </div>
                  {index === 0 && (
                    <span className="ml-2">
                      {isRepeat ? (
                        <i className="fa-solid fa-repeat text-green-600"></i>
                      ) : (
                        <i className="fa-solid fa-volume-high text-amber-500"></i>
                      )}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="py-4 text-center text-gray-400">
                No songs in queue
              </p>
            )}
          </div>
        </div>
      )}
      {showSidebar && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default MusicPlayer;
