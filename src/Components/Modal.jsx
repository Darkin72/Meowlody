import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); 

function ModalComponent({ isOpen, onClose, title, children, actionButton }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md mx-auto mt-20 text-white border border-gray-600"
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-white"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>
      
      <div className="my-4">
        {children}
      </div>
      
      <div className="flex justify-end mt-6">
        <button 
          onClick={onClose} 
          className="px-4 py-2 bg-gray-700 text-white rounded-lg mr-2 hover:bg-gray-600"
        >
          Đóng
        </button>
        
        {actionButton && (
          <button 
            onClick={actionButton.onClick} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
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
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400 text-sm">Title</p>
          <p className="text-lg">{song.title || "No information"}</p>
        </div>
        
        <div>
          <p className="text-gray-400 text-sm">Artist</p>
          <p className="text-lg">{song.artist || "No information"}</p>
        </div>
        
        <div>
          <p className="text-gray-400 text-sm">Album</p>
          <p className="text-lg">{song.album || "No information"}</p>
        </div>
        
        <div>
          <p className="text-gray-400 text-sm">Length</p>
          <p className="text-lg">{song.duration || "No information"}</p>
        </div>
        
        <div>
          <p className="text-gray-400 text-sm">Genre</p>
          <p className="text-lg">{song.genre || "No information"}</p>
        </div>
        
        <div>
          <p className="text-gray-400 text-sm">Date added</p>
          <p className="text-lg">{song.date_added || "No information"}</p>
        </div>
        
        <div>
          <p className="text-gray-400 text-sm">Item type</p>
          <p className="text-lg">{song.type || "No information"}</p>
        </div>
      </div>
    </ModalComponent>
  );
}

export function AddToPlaylistModal({ isOpen, onClose, song, playlists, onAddToPlaylist }) {
  if (!song) return null;
  
  return (
    <ModalComponent
      isOpen={isOpen}
      onClose={onClose}
      title="Thêm vào playlist"
    >
      <div>
        <p className="mb-2">Choose playlist to add: <strong>{song.title}</strong></p>
        
        <div className="max-h-60 overflow-y-auto mt-4 border border-gray-700 rounded-lg">
          {playlists && playlists.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {playlists.map((playlist, index) => (
                <li 
                  key={index} 
                  className="px-4 py-3 hover:bg-gray-700 cursor-pointer"
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
            className="w-full py-2 bg-green-600 hover:bg-green-500 rounded-lg flex items-center justify-center"
            onClick={() => {
              console.log("Tạo playlist mới");
              // Thêm logic tạo playlist mới ở đây
            }}
          >
            <i className="fa-solid fa-plus mr-2"></i> Tạo playlist mới
          </button>
        </div>
      </div>
    </ModalComponent>
  );
}

export default ModalComponent;