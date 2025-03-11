import React from "react";
import Modal from "react-modal";
import Loading from "./Loading";
import { useState, useEffect } from "react";

Modal.setAppElement("#root");

function ModalComponent({
  isOpen,
  onClose,
  title,
  children,
  actionButton = { clickable: true },
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      className="mx-auto mt-20 max-w-md rounded-lg border border-gray-600 bg-gray-800 p-6 text-white shadow-xl"
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <div className="my-4">{children}</div>

      <div className="mt-6 flex justify-end">
        {actionButton.clickable && (
          <button
            onClick={actionButton.onClick}
            className={`rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 ${
              !actionButton.clickable && "cursor-not-allowed"
            }`}
            disabled={!actionButton.clickable}
          >
            {actionButton.label}
          </button>
        )}
      </div>
    </Modal>
  );
}

export function SongPropertiesModal({ isOpen, onClose, song }) {
  if (!song) return null;
  return (
    <ModalComponent
      isOpen={isOpen}
      onClose={onClose}
      title="Properties"
      actionButton={{ clickable: false }}
    >
      <div className="m-8 grid grid-cols-2 gap-[20px]">
        <div className="col-span-2">
          <p className="text-sm text-gray-400">Title</p>
          <p className="text-lg">{song.title || "No information"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Artist</p>
          <p className="text-lg">{song.artist || "No information"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Album</p>
          <p className="text-lg">{song.album || "No information"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Length</p>
          <p className="text-lg">{song.duration || "No information"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Genre</p>
          <p className="text-lg">{song.genre || "No information"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Date added</p>
          <p className="text-lg">{song.date_added || "No information"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Item type</p>
          <p className="text-lg">{song.type || "No information"}</p>
        </div>
      </div>
    </ModalComponent>
  );
}

export function UploadSongModal({ isOpen, onClose, setLibraryChange }) {
  const [isUploaded, setIsUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen && isUploaded) {
    setIsUploaded(false);
    setFile(null);
  }
  const [song, setSong] = useState({});
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setIsUploaded(false);
  };

  const handleUploadClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!file) {
      setError("Please select a file first!");
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("mp3file", file);

    try {
      const res = await fetch(`http://localhost:7205/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setResponse(data);
      setIsUploaded(true);
      setSong(data.metadata);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResponse(null);
    } finally {
      setIsLoading(false);
      setLibraryChange((prev) => !prev);
    }
  };
  return (
    <ModalComponent
      isOpen={isOpen}
      onClose={onClose}
      title="Upload song"
      actionButton={{
        label: "Add to library",
        onClick: handleUploadClick,
        clickable: (!isUploaded && file) || isLoading,
      }}
    >
      {isLoading && <Loading className="" />}
      <div className="m-8">
        <input
          type="file"
          accept=".mp3, .wav, .ogg, .flac"
          className="text-gray-400"
          onChange={handleFileChange}
        ></input>
      </div>

      {isUploaded && (
        <div className="m-8 grid grid-cols-2 gap-[20px]">
          <div className="col-span-2">
            <p className="text-sm text-gray-400">Title</p>
            <p className="text-lg">{song.title || "No information"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Artist</p>
            <p className="text-lg">{song.artist || "No information"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Album</p>
            <p className="text-lg">{song.album || "No information"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Duration</p>
            <p className="text-lg">{song.duration || "No information"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Genre</p>
            <p className="text-lg">{song.genre || "No information"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Date added</p>
            <p className="text-lg">{song.date || "No information"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Item type</p>
            <p className="text-lg">{song.type || "No information"}</p>
          </div>
        </div>
      )}
    </ModalComponent>
  );
}

export default ModalComponent;
