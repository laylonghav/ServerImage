const express = require("express");
const path = require("path");
const cors = require("cors");
const ImageUploadRouter = require("./src/routes/ImageUploadRouter");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mount image upload router
app.use("/api", ImageUploadRouter); // now use /api/upload and /api/images

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
