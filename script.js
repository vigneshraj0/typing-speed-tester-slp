const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed tests are fun and challenging.",
    "Improve your typing by practicing every day."
];

let startTime, endTime, selectedText;

function startTest() {
    selectedText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    document.getElementById("textToType").innerText = selectedText;
    document.getElementById("typingArea").value = "";
    document.getElementById("typingArea").disabled = false;
    document.getElementById("typingArea").focus();
    startTime = performance.now(); // More precise timing
}

function restartTest() {
    document.getElementById("typingArea").value = "";
    document.getElementById("textToType").innerText = "Click 'Start' to begin the test.";
    document.getElementById("result").innerText = "";
    document.getElementById("typingArea").disabled = true;
}

document.getElementById("typingArea").addEventListener("input", function () {
    let typedText = this.value;
    let targetText = selectedText;

    // Create a string where each word is checked and color-coded
    let feedbackText = '';
    
    let typedWords = typedText.split(/\s+/);
    let targetWords = targetText.split(/\s+/);

    // Compare each word and color the feedback
    typedWords.forEach((word, index) => {
        let targetWord = targetWords[index] || ''; // If there are fewer words typed than the target
        if (word === targetWord) {
            feedbackText += `<span style="color: green">${word}</span> `;
        } else {
            feedbackText += `<span style="color: red">${word}</span> `;
        }
    });

    // Append the rest of the target text (if the user typed fewer words)
    if (typedWords.length < targetWords.length) {
        feedbackText += targetWords.slice(typedWords.length).map(word => `<span style="color: grey">${word}</span>`).join(' ');
    }

    // Update the feedback display
    document.getElementById("textToType").innerHTML = feedbackText.trim();

    // Check if the user has typed everything correctly
    if (typedText === targetText) {
        endTime = new Date().getTime();
        let timeTaken = (endTime - startTime) / 1000 / 60; // Convert milliseconds to minutes

        let words = targetText.split(/\s+/).length; // Word count
        let wpm = Math.round(words / timeTaken);

        if (timeTaken < 0.1) {
            document.getElementById("result").innerText = `Too fast! Try again.`;
        } else {
            document.getElementById("result").innerText = `You typed at ${wpm} words per minute!`;
        }

        document.getElementById("typingArea").disabled = true; // Disable the text area after completion
    }
});
