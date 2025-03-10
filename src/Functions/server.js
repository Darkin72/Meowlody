import express from "express"; //Server framework
import multer, { diskStorage } from "multer"; // Middleware
import { parseFile } from "music-metadata"; //Metadata parser
import cors from "cors"; // Cross-origin resource sharing
import formatTime from "./FormatTime.js";
import path from "path";
import mysql from "mysql";

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

// // Check folder
// if (!existsSync("app/uploads")) {
//   mkdirSync("uploads"); //New folder
// }

// Upload MP3 file
app.post("/upload", upload.single("mp3file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Bad request: No file uploaded" });
    }

    const metadata = await parseFile(req.file.path);

    const audioInfo = {
      title: metadata.common.title,
      artist: metadata.common.artist,
      album: metadata.common.album,
      genre: metadata.common.genre,
      duration: formatTime(metadata.format.duration),
      date: new Date().toISOString().split("T")[0],
      type: path.extname(req.file.originalname),
    };

    if (audioInfo.genre === undefined) {
      audioInfo.genre = [];
    }

    console.log(audioInfo);

    res.json({
      message: "File uploaded successfully",
      fileInfo: {
        originalName: req.file.originalname,
        savedAs: req.file.filename,
        path: req.file.path,
      },
      metadata: audioInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 7205;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
