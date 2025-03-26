const reactions = JSON.parse(localStorage.getItem('reactions')) || {};

function toggleReaction(recipeName) {
    if (!reactions[recipeName]) {
        reactions[recipeName] = 0;
    }
    reactions[recipeName]++;
    localStorage.setItem('reactions', JSON.stringify(reactions));
    updateReactionCount(recipeName);
}

function updateReactionCount(recipeName) {
    const countElement = document.getElementById(`reaction-count-${recipeName}`);
    if (countElement) {
        countElement.textContent = reactions[recipeName] || 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Object.keys(reactions).forEach(recipeName => {
        updateReactionCount(recipeName);
    });
});

function navigateToRecipe(recipePath) {
    window.location.href = recipePath;
}
