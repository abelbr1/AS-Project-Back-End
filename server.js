const express = require("express");
const mongoose = require("mongoose");
const SongRouter = require("./routes/songRoutes");
const SongController = require("./controllers/songcontroller");
const SOng = require("./models/songModel");
const cors = require("cors");
const dotenv =require("dotenv");
dotenv.config({path:"./config.env"});

const app = express();


app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

console.log(process.env.DATABASE);
const uri =process.env.DATABASE;
  
// Establish MongoDB connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// Handle connection events
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected to " + uri);
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

app.use("/song", SongRouter);

//handle for non-existing routes
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
