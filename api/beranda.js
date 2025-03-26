const resepList = [
    {
        nama: "Bakmie",
        gambar: "https://awsimages.detik.net.id/community/media/visual/2021/11/01/20-bakmi-babi-paling-endes-ada-di-tempat-ini-19.jpeg?w=1200",
        deskripsi: "Bakmie lezat dengan topping ayam dan sayuran.",
        link: "bakmie.html"
    },
    {
        nama: "Kwetiau",
        gambar: "https://img-global.cpcdn.com/recipes/8b7948d64465a5b3/680x482cq70/kwetiau-goreng-sayur-kol-foto-resep-utama.jpg",
        deskripsi: "Kwetiau goreng dengan bumbu khas.",
        link: "kwetiau.html"
    },
    {
        nama: "Nasi Goreng",
        gambar: "https://img-global.cpcdn.com/recipes/0820c8cf5a5e18aa/1200x630cq70/photo.jpg",
        deskripsi: "Nasi goreng spesial dengan bumbu khas.",
        link: "nasigoreng.html"
    }
];

function tampilkanResep(keyword = "") {
    const container = document.getElementById("resep-container");
    container.innerHTML = "";
    resepList.forEach((resep) => {
        if (resep.nama.toLowerCase().includes(keyword.toLowerCase())) {
            const card = document.createElement("div");
            card.className = "resep-card";
            card.innerHTML = `
                <img src="${resep.gambar}" alt="Gambar ${resep.nama}" onerror="this.src='https://via.placeholder.com/150?text=No+Image';">
                <div class="resep-card-content">
                    <h2>${resep.nama}</h2>
                    <p>${resep.deskripsi}</p>
                </div>
            `;
            card.onclick = () => {
                window.location.href = resep.link;
            };
            container.appendChild(card);
        }
    });
}

function cariResep() {
    const keyword = document.getElementById("search").value;
    tampilkanResep(keyword);
}

document.addEventListener("DOMContentLoaded", () => {
    tampilkanResep();
});
