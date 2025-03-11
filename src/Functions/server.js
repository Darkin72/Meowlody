import express from "express"; //Server framework
import multer, { diskStorage } from "multer"; // Middleware
import { parseFile } from "music-metadata"; //Metadata parser
import cors from "cors"; // Cross-origin resource sharing
import formatTime from "./FormatTime.js";
import path from "path";
import mysql from "mysql";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json()); //read json file

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "music_db",
});

//connect to db
try {
  db.connect();
  console.log("Connected to database");
} catch (error) {
  console.log(`Cannot connect to database ${error}`);
}

//request API
app.get("/songs", (req, res) => {
  db.query("SELECT * FROM song", (err, results) => {
    if (err) {
      console.error("Cannot get songs", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
    console.log(results);
  });
});

//update song
app.patch("/favorite/:id", (req, res) => {
  const { id } = req.params;
  const { favorite } = req.query;

  const sql = "UPDATE song SET favorite = ? WHERE id = ?";
  db.query(sql, [favorite, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Delete song
app.delete("/song/:id", (req, res) => {
  const { id } = req.params;
  const { filePath } = req.query;
  const sql = "DELETE FROM song WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error deleting file" });
      }
      res.json({ message: "File deleted successfully" });
    });
  });
});

const storage = diskStorage({
  destination: function (req, file, cb) {
    // req: Request object
    // cb: Callback
    cb(null, "./app/uploads");
    //null là ko có lỗi
  },

  filename: function (req, file, cb) {
    return cb(null, file.fieldname + Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "audio/mpeg", // MP3
    "audio/wav", // WAV
    "audio/wave", // WAV
    "audio/ogg", // OGG
    "audio/flac", // FLAC
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File is not mp3, wav, ogg"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 100, // Limit 100MB
  },
});

// Check folder
if (!fs.existsSync("./app/uploads")) {
  fs.mkdirSync("./app/uploads", { recursive: true });
  console.log("Created uploads folder");
} else {
  console.log("Uploads folder already exists");
}

// Upload MP3 file
app.post("/upload", upload.single("mp3file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Bad request: No file uploaded" });
    }

    const metadata = await parseFile(req.file.path);

    const audioInfo = {
      title: metadata.common.title || "No information",
      artist: metadata.common.artist || "No information",
      album: metadata.common.album || "No information",
      genre: metadata.common.genre || "No information",
      duration: formatTime(metadata.format.duration) || "No information",
      date: new Date().toISOString().split("T")[0],
      type: path.extname(req.file.originalname),
      src: "/app/uploads/" + req.file.filename,
    };

    if (audioInfo.genre !== "No information") {
      audioInfo.genre = audioInfo.genre.join(", ");
    }

    console.log(audioInfo);

    db.query(
      `INSERT INTO song (title, artist, album, genre, duration, date, type, src)
    VALUES ("${audioInfo.title}", "${audioInfo.artist}", "${audioInfo.album}", "${audioInfo.genre}", "${audioInfo.duration}", "${audioInfo.date}", "${audioInfo.type}", "${audioInfo.src}")`,
      (err, results) => {
        if (err) {
          console.error("Cannot insert song", err);
          return res.status(500).json({ error: err.message });
        }
        console.log("Song inserted successfully", results);
        res.json({
          message: "File uploaded successfully",
          fileInfo: {
            originalName: req.file.originalname,
            savedAs: req.file.filename,
            path: req.file.path,
          },
          metadata: audioInfo,
        });
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.resolve("./app/uploads", filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).json({ error: "File not found or error downloading" });
    }
  });
});

const PORT = 7205;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
