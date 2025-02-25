let startTime;
let testStarted = false;
let originalText = "Type this text as fast as you can!";
let typingArea = document.getElementById("typingArea");
let textToTypeElement = document.getElementById("textToType");
let resultElement = document.getElementById("result");

function startTest() {
    typingArea.disabled = false;  // Enable typing area
    typingArea.value = "";  // Clear previous input
    typingArea.focus();
    textToTypeElement.textContent = originalText;  // Show the original text
    testStarted = true;
    startTime = new Date().getTime();  // Track the start time
    typingArea.addEventListener('input', checkTyping);  // Start checking input
}

function checkTyping() {
    let typedText = typingArea.value;
    let textToType = originalText;
    let errorMessage = "";
    
    // Compare typed text with the original text character by character
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] !== textToType[i]) {
            errorMessage += "<span style='color: red'>" + typedText[i] + "</span>";
        } else {
            errorMessage += typedText[i];
        }
    }

    // Update error display with incorrect characters highlighted
    document.getElementById("errorMessage").innerHTML = errorMessage;

    // If the user typed the entire text correctly, stop the test and show the result
    if (typedText === textToType) {
        let endTime = new Date().getTime();
        let timeTaken = (endTime - startTime) / 1000;  // Time in seconds
        let wpm = (typedText.length / 5) / (timeTaken / 60);  // Calculate words per minute
        resultElement.textContent = `Test Complete! Your typing speed is ${wpm.toFixed(2)} words per minute.`;
        typingArea.disabled = true;  // Disable typing after test completion
        typingArea.removeEventListener('input', checkTyping);  // Stop checking input
    }
}

function restartTest() {
    typingArea.disabled = true;
    resultElement.textContent = "";
    textToTypeElement.textContent = "Click 'Start' to begin the test.";
    document.getElementById("errorMessage").innerHTML = "";
}
