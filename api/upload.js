document.getElementById("upload-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("recipe-title").value;
    const image = document.getElementById("recipe-image").value;
    const description = document.getElementById("recipe-description").value;

    alert(`Resep "${title}" berhasil diupload!`);
    document.getElementById("upload-form").reset();
});
