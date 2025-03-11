import { createContext, useState, useContext, useEffect } from "react";

// Tạo context với giá trị mặc định null
const QueueContext = createContext(null);

// Định nghĩa hook như một named function declaration
// Điều này quan trọng cho Fast Refresh
export function useQueue() {
  const context = useContext(QueueContext);
  if (context === null) {
    throw new Error("useQueue must be used within a QueueProvider");
  }
  return context;
}

// Định nghĩa provider như một named function component
// Điều này quan trọng cho Fast Refresh
export function QueueProvider({ children }) {
  const [queue, setQueue] = useState([]);

  const updateQueue = (updater) => {
    if (typeof updater === "function") {
      setQueue((prevQueue) => {
        const newQueue = updater(prevQueue);
        return newQueue;
      });
    } else {
      setQueue(updater);
    }
  };

  // Không cần useEffect trống
  
  const value = {
    queue,
    setQueue: updateQueue,
  };

  return (
    <QueueContext.Provider value={value}>{children}</QueueContext.Provider>
  );
}
