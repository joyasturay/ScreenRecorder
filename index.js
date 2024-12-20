const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

//storage options for multer (saving files locally)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, `recorded-video-${Date.now()}.webm`); 
    },
});


const upload = multer({ storage: storage });


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('video'), (req, res) => {
    const videoUrl = `/uploads/${req.file.filename}`; 
    res.json({ videoUrl });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
