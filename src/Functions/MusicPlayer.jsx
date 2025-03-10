import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import image from "/images/music.png";
import testMusic from "/images/c418-sweden-minecraft-volume-alpha.mp3";
import formatTime from "./FormatTime";

function MusicPlayer() {
  const [queue, setQueue] = useState([1, 2, 3]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const soundRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (currentIndex >= 0) {
      if (soundRef.current) {
        soundRef.current.unload();
      }
      soundRef.current = new Howl({
        src: [testMusic],
        volume: volume,
        html5: true,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onend: () => setIsPlaying(false),
      });
    }
    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [currentIndex, volume]);

  //Time update
  useEffect(() => {
    let interval;
    if (isPlaying && soundRef.current) {
      interval = setInterval(() => {
        setCurrentTime(soundRef.current.seek());
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying]);

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
  console.log(
    Math.round(
      soundRef.current ? (currentTime / soundRef.current.duration()) * 100 : 0,
    ),
  );
  return (
    <div className="fixed bottom-0 flex w-full items-center justify-between bg-gray-800 p-4">
      <div className="flex w-[15%] items-center">
        <img
          alt="Album cover"
          className="mr-4 h-12 w-12 rounded-md object-cover"
          height="50"
          src={image}
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
        <button className="flex-grow text-gray-400">
          <i className="fa-solid fa-forward"></i>
        </button>
        <button className="flex-grow text-gray-400">
          <i className="fa-solid fa-repeat"></i>
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

export default MusicPlayer;
