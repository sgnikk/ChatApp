const firebaseConfig = {
    apiKey: "AIzaSyAKBWqwNj7IZedngwAmXo7pyYJDayHBlHw",
    authDomain: "chat-app-33908.firebaseapp.com",
    databaseURL: "https://chat-app-33908-default-rtdb.firebaseio.com",
    projectId: "chat-app-33908",
    storageBucket: "chat-app-33908.appspot.com",
    messagingSenderId: "1023503771082",
    appId: "1:1023503771082:web:723b90204b9c24d4021b33"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const messagesRef = db.ref("messages");

function sendMessage() {
    const username = document.getElementById("username").value.trim() || "Anonymous";
    const message = document.getElementById("messageInput").value.trim();
    if (message) {
        messagesRef.push({ name: username, text: message });
        document.getElementById("messageInput").value = "";
    }
}

messagesRef.on("child_added", function (snapshot) {
    const msg = snapshot.val();
    const messageDiv = document.createElement("div");
    const currentUser = document.getElementById("username").value.trim() || "Anonymous";
    messageDiv.className = "message " + (msg.name === currentUser ? "you" : "other");
    messageDiv.textContent = `${msg.name === currentUser ? "You" : msg.name}: ${msg.text}`;
    const messagesContainer = document.getElementById("messages");
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});