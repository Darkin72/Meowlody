import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import image from "/images/music.png";
import formatTime from "./FormatTime";
import Loading from "../Components/Loading";

function MusicPlayer({
  song,
  isPlaying,
  setIsPlaying,
  isRepeat,
  setIsRepeat,
  volume,
  setVolume,
  setIsFavoriteChange,
}) {
  const [queue, setQueue] = useState([1, 2, 3]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const soundRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  //song change
  useEffect(() => {
    if (currentIndex >= 0) {
      if (soundRef.current) {
        soundRef.current.unload();
      }
      soundRef.current = new Howl({
        src: [song.src],
        volume: volume / 100,
        html5: true,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onend: () => setIsPlaying(false),
      });
    }
    soundRef.current.play();
    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [song]);

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

  const toggleFavorite = async (song) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:7205/favorite/${song.id}?favorite=${1 - song.favorite}`,
        { method: "PATCH" },
      );
      song.favorite = 1 - song.favorite;
      console.log(await response.json());
      setIsFavoriteChange((e) => !e);
    } catch (error) {
      console.log(error);
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
    soundRef.current.stop();
    soundRef.current.play();
  };
  const toggleLoop = () => {
    if (!soundRef.current) return;
    soundRef.current.loop(!isRepeat);
    setIsRepeat(!isRepeat);
  };
  const toggleVolumeDown = () => {
    if (!soundRef.current || volume === 0) return;
    setVolume((volume) => Math.max(0, volume - 5));
  };
  const toggleVolumeUp = () => {
    if (!soundRef.current || volume === 100) return;
    setVolume((volume) => Math.min(100, volume + 5));
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
          disabled={currentIndex < 0}
        >
          {isPlaying ? (
            <i className="fa-solid fa-pause"></i>
          ) : (
            <i className="fa-solid fa-play"></i>
          )}
        </button>
        <button className="flex-grow text-gray-400 hover:text-gray-100">
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
        <button className="text-gray-400 hover:text-gray-100">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
