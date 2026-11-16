
// ==================================
// J.A.R.V.I.S AI - MAIN BRAIN
// ==================================

const status = document.getElementById("status");
const response = document.getElementById("response");
const userInput = document.getElementById("userInput");

let recognition;
let listening = false;

// Jarvis Voice
function speak(text) {
    response.innerText = text;

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-IN";
    speech.rate = 0.95;
    speech.pitch = 0.85;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}

// Voice Recognition
function startJarvis() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        speak("Sorry Sir, voice recognition is not supported in this browser.");
        return;
    }

    if (listening) {
        recognition.stop();
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function () {
        listening = true;
        status.innerText = "LISTENING...";
        response.innerText = "Yes Sir, I am listening.";
    };

    recognition.onresult = function (event) {
        const command =
            event.results[0][0].transcript.toLowerCase();

        response.innerText = "You: " + command;
        processCommand(command);
    };

    recognition.onerror = function () {
        status.innerText = "SYSTEM ONLINE";
        speak("Sorry Sir, I could not hear you.");
    };

    recognition.onend = function () {
        listening = false;
        status.innerText = "SYSTEM ONLINE";
    };

    recognition.start();
}

// Command Processing
function processCommand(command) {

    if (command.includes("hello") ||
        command.includes("hi jarvis")) {

        speak("Hello Sir. Jarvis is ready.");
    }

    else if (command.includes("your name")) {

        speak("I am Jarvis, your personal AI assistant.");
    }

    else if (command.includes("how are you")) {

        speak("I am doing great, Sir. How can I help you?");
    }

    else if (command.includes("time")) {

        const time = new Date().toLocaleTimeString("en-IN");

        speak("Sir, the time is " + time);
    }

    else if (command.includes("date")) {

        const date = new Date().toLocaleDateString("en-IN");

        speak("Today's date is " + date);
    }

    else if (command.includes("open youtube")) {

        speak("Opening YouTube, Sir.");
        window.open("https://www.youtube.com", "_blank");
    }

    else if (command.includes("open google")) {

        speak("Opening Google, Sir.");
        window.open("https://www.google.com", "_blank");
    }

    else if (command.includes("stop")) {

        window.speechSynthesis.cancel();
        speak("Okay Sir.");
    }

    else if (command.includes("thank you")) {

        speak("Always welcome, Sir.");
    }

    else {

        speak("Sorry Sir, I don't understand that command yet.");
    }
}

// Text Chat
function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") return;

    response.innerText = "You: " + message;

    userInput.value = "";

    processCommand(message.toLowerCase());
}

// Enter Key
userInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});

// Startup
window.addEventListener("load", function() {

    status.innerText = "SYSTEM ONLINE";

    response.innerText =
        "Welcome Sir. Jarvis systems are ready.";

});
