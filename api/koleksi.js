// Function to toggle a recipe in the collection
function toggleKoleksiMenu(nama, link, button) {
    const koleksi = JSON.parse(localStorage.getItem('koleksiResep')) || [];
    const index = koleksi.findIndex(item => item.nama === nama);

    if (index === -1) {
        // Add to collection
        koleksi.push({ nama, link });
        localStorage.setItem('koleksiResep', JSON.stringify(koleksi));
        button.classList.add('saved');
        button.innerHTML = `<i class="fas fa-bookmark"></i> Tersimpan`;
    } else {
        // Remove from collection
        koleksi.splice(index, 1);
        localStorage.setItem('koleksiResep', JSON.stringify(koleksi));
        button.classList.remove('saved');
        button.innerHTML = `<i class="fas fa-bookmark"></i> Koleksi Menu`;
    }

    updateKoleksiMenu();
}

// Function to update the "Koleksi Resep" navigation dynamically
function updateKoleksiMenu() {
    const koleksi = JSON.parse(localStorage.getItem('koleksiResep')) || [];
    const koleksiNav = document.getElementById('koleksi-nav');
    if (koleksiNav) {
        if (koleksi.length === 0) {
            koleksiNav.innerHTML = "<p style='text-align: center; font-size: 1.2em;'>Tidak ada resep yang disimpan.</p>";
        } else {
            koleksiNav.innerHTML = koleksi
                .map(item => `<a href="${item.link}" target="_blank">${item.nama}</a>`)
                .join('');
        }
    }
}

// Function to initialize the button state for saved recipes
function initializeButtonState(button, nama) {
    const koleksi = JSON.parse(localStorage.getItem('koleksiResep')) || [];
    if (koleksi.some(item => item.nama === nama)) {
        button.classList.add('saved');
        button.innerHTML = `<i class="fas fa-bookmark"></i> Tersimpan`;
    }
}

// Initialize the "Koleksi Resep" navigation and button states on page load
document.addEventListener('DOMContentLoaded', () => {
    updateKoleksiMenu();

    // Initialize button states for all save buttons
    document.querySelectorAll('.save-button').forEach(button => {
        const nama = button.getAttribute('data-nama');
        initializeButtonState(button, nama);
    });
});
