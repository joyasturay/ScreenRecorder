const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Set storage options for multer (saving files locally)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, `recorded-video-${Date.now()}.webm`); 
    },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to handle video upload
app.post('/upload', upload.single('video'), (req, res) => {
    const videoUrl = `/uploads/${req.file.filename}`; 
    res.json({ videoUrl });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
