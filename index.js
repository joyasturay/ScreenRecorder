const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

//  multer for file uploading
const upload = multer({ dest: 'uploads/' });

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve the page for recording (index.ejs)
app.get('/', (req, res) => {
    res.render('index'); // Rendering the EJS view
});

// Upload endpoint for receiving the video
app.post('/upload', upload.single('video'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const videoUrl = `/uploads/${file.filename}`; // URL where the video will be available
    res.json({ videoUrl }); // Return the URL for viewing the video
});

// Serve static files 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
