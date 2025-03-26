const express = require('express');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const app = express();
app.use(express.json());

// Direktori untuk menyimpan file HTML baru
const menuDir = path.join(__dirname, 'menus');
const templateFile = path.join(__dirname, 'templates', 'recipe-template.ejs');
const berandaFile = path.join(__dirname, 'beranda.html');

// Pastikan direktori menus ada
if (!fs.existsSync(menuDir)) {
    fs.mkdirSync(menuDir);
}

// Endpoint untuk menerima data form dan generate file HTML baru
app.post('/upload-menu', (req, res) => {
    const { title, image, description, ingredients, steps, youtube, motivation, creator } = req.body;

    if (!title || !image || !description || !ingredients || !steps || !youtube || !motivation || !creator) {
        return res.status(400).send('Semua data harus diisi.');
    }

    try {
        // Nama file HTML baru
        const fileName = title.toLowerCase().replace(/\s+/g, '-') + '.html';
        const filePath = path.join(menuDir, fileName);

        // Render template EJS dengan data
        const htmlContent = ejs.render(fs.readFileSync(templateFile, 'utf-8'), {
            title,
            image,
            description,
            ingredients: ingredients.split(',').map(item => item.trim()),
            steps: steps.split(',').map(item => item.trim()),
            youtube,
            motivation,
            creator,
        });

        // Simpan file HTML baru
        fs.writeFileSync(filePath, htmlContent);
        console.log(`File ${fileName} berhasil dibuat di ${menuDir}`);

        // Tambahkan card baru ke beranda
        const berandaContent = fs.readFileSync(berandaFile, 'utf-8');
        const newCard = `
            <div class="resep-card">
                <img src="${image}" alt="Gambar ${title}" onerror="this.src='https://via.placeholder.com/150?text=No+Image';">
                <div class="resep-card-content">
                    <h2>${title}</h2>
                    <p>${description}</p>
                    <a href="menus/${fileName}" target="_blank">Lihat Resep</a>
                </div>
            </div>
        `;
        const updatedContent = berandaContent.replace(
            '<div id="resep-container" class="resep-container">',
            `<div id="resep-container" class="resep-container">${newCard}`
        );
        fs.writeFileSync(berandaFile, updatedContent);

        res.status(200).send('Menu berhasil diupload.');
    } catch (error) {
        console.error('Error saat mengupload menu:', error);
        res.status(500).send('Terjadi kesalahan pada server.');
    }
});

// Endpoint untuk mendapatkan daftar file HTML di direktori menus
app.get('/get-menus', (req, res) => {
    try {
        const files = fs.readdirSync(menuDir).map(file => ({
            name: file.replace('.html', ''),
            link: `menus/${file}`,
        }));
        res.status(200).json(files);
    } catch (error) {
        console.error('Error saat membaca daftar menu:', error);
        res.status(500).send('Terjadi kesalahan pada server.');
    }
});

// Endpoint untuk mendapatkan daftar menu dari direktori menus
app.get('/api/menus', (req, res) => {
    try {
        const files = fs.readdirSync(menuDir).map(file => {
            const name = file.replace('.html', '');
            const image = {
                'babi-kecap': 'https://www.finnafood.com/blog/wp-content/uploads/2023/12/resep-babi-kecap.webp',
                'bakmie': 'https://awsimages.detik.net.id/community/media/visual/2021/11/01/20-bakmi-babi-paling-endes-ada-di-tempat-ini-19.jpeg?w=1200',
                'kwetiau': 'https://img-global.cpcdn.com/recipes/8b7948d64465a5b3/680x482cq70/kwetiau-goreng-sayur-kol-foto-resep-utama.jpg',
                'nasigoreng': 'https://img-global.cpcdn.com/recipes/0820c8cf5a5e18aa/1200x630cq70/photo.jpg'
            }[name] || 'https://via.placeholder.com/150?text=No+Image';

            const description = {
                'babi-kecap': 'Babi kecap spesial dengan rasa manis gurih.',
                'bakmie': 'Bakmie lezat dengan topping ayam dan sayuran.',
                'kwetiau': 'Kwetiau goreng dengan bumbu khas.',
                'nasigoreng': 'Nasi goreng spesial dengan bumbu khas.'
            }[name] || 'Deskripsi tidak tersedia.';

            return {
                name: name.replace(/-/g, ' ').toUpperCase(),
                link: `menus/${file}`,
                image,
                description
            };
        });
        res.status(200).json(files);
    } catch (error) {
        console.error('Error saat membaca daftar menu:', error);
        res.status(500).send('Terjadi kesalahan pada server.');
    }
});

// Route untuk mengarahkan ke halaman babi kecap
app.get('/menus/babi-kecap.html', (req, res) => {
    const filePath = path.join(menuDir, 'babi-kecap.html');
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Halaman tidak ditemukan.');
    }
});

// Route untuk mengarahkan ke halaman resep berdasarkan menu
app.get('/menus/:menu', (req, res) => {
    const menu = req.params.menu;
    const filePath = path.join(menuDir, menu);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Halaman tidak ditemukan.');
    }
});

// Jalankan server
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
