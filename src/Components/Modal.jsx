import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function ModalComponent({ isOpen, onClose, title, children, actionButton }) {
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
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
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
    <ModalComponent isOpen={isOpen} onClose={onClose} title="Properties">
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

export function AddToPlaylistModal({
  isOpen,
  onClose,
  song,
  playlists,
  onAddToPlaylist,
}) {
  if (!song) return null;

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose} title="Add to playlist">
      <div className="m-8">
        <p className="mb-2">
          Choose playlist to add: <strong>{song.title}</strong>
        </p>

        <div className="mt-4 max-h-60 overflow-y-auto rounded-lg border border-gray-700">
          {playlists && playlists.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {playlists.map((playlist, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-4 py-3 hover:bg-gray-700"
                  onClick={() => {
                    onAddToPlaylist(playlist.id, song.id);
                    onClose();
                  }}
                >
                  {playlist.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-gray-400">Không có playlist nào</p>
          )}
        </div>

        <div className="mt-4">
          <button
            className="flex w-full items-center justify-center rounded-lg bg-green-600 py-2 hover:bg-green-500"
            onClick={() => {
              console.log("Tạo playlist mới");
              // Thêm logic tạo playlist mới ở đây
            }}
          >
            <i className="fa-solid fa-plus mr-2"></i> New playlist
          </button>
        </div>
      </div>
    </ModalComponent>
  );
}

export default ModalComponent;
