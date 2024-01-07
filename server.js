const express = require('express');
const XLSX = require('xlsx');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { searchByName, getAllRows } = require('./src/bussinessLayer');
const uploadFolder = path.join(__dirname, 'file'); // 'file' is the folder within your application
const EXCEL_FILE_PATH = path.join(__dirname, 'file', 'users.xls');
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        // Use the original file name; you can modify this if needed
        cb(null, 'users.xls');
    },
});

const upload = multer({ storage: storage });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/search', (req, res) => {
    const name = req.query.name;
    const matchingUsers = searchByName(name);
    res.json(matchingUsers);
});

app.get('/download', (req, res) => {
    res.download(EXCEL_FILE_PATH, 'users.xls', (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});
app.get('/getAll',(req,res)=>{
    const allData=getAllRows();
    res.json(allData);
})
app.post('/submit', upload.single('file'), async (req, res) => {
    const uploadedFile = req.file;
    const existingFilePath = path.join(uploadFolder, 'users.xls');

    try {
        // Delete the existing file if it exists
        // await fs.promises.unlink(existingFilePath);
        // console.log('Deleted existing file:', existingFilePath);

        // Move the new file to the specified path using the absolute path
        const absoluteFilePath = path.join(uploadFolder, 'users.xls');
        await fs.promises.rename(uploadedFile.path, absoluteFilePath);

        console.log('File saved to:', absoluteFilePath);
        res.json({ message: 'File uploaded and replaced successfully.' });
    } catch (error) {
        console.error('Error handling file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
