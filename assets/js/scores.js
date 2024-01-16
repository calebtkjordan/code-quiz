function loadHighScores() {
    var highscoresList = document.getElementById('highscores');
    var highscores = JSON.parse(localStorage.getItem('highscores')) || [];

    // Sort highscores in descending order
    highscores.sort((a, b) => b.score - a.score);

    // Clear existing list
    highscoresList.innerHTML = '';

    // Append each high score to the list
    highscores.forEach(function(score) {
        var scoreElement = document.createElement('li');
        scoreElement.textContent = score.initials + ': ' + score.score;
        highscoresList.appendChild(scoreElement);
    });
}

// Call the function to load and display high scores
loadHighScores();

// Event listener for the clear highscores button
document.getElementById('clear').addEventListener('click', function() {
    localStorage.removeItem('highscores');
    loadHighScores();
});
