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

    let typedText = this.value.trim(); // Fixed: TO match selectedText correctly
    let targetText = selectedText.trim(); // Fixed: For accuracy

    if (typedText === targetText) {
        endTime = new Date().getTime();
        let timeTaken = (endTime - startTime) / 1000 / 60; // Fixed: Converts milliseconds to min..

        let words = targetText.split(/\s+/).length; // Fixed: To make the word count more accurate
        let wpm = Math.round(words / timeTaken);

        if (timeTaken < 0.1) { // If time taken to type is too low. Made this to protect shorter text inacurracy 
            document.getElementById("result").innerText = `Too fast! Try again.`;
        } else {
            document.getElementById("result").innerText = `You typed at ${wpm} words per minute!`;
        }

        document.getElementById("typingArea").disabled = true; // Fixed: Users cannot type after they submit

    }
});
