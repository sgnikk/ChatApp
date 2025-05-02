firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const messagesRef = db.ref("messages");
  
function sendMessage() {
    const username = document.getElementById("username").value.trim() || "Anonymous";
    const message = document.getElementById("messageInput").value.trim();
    if (!message) return;
    
    messagesRef.push({ name: username, text: message });
    document.getElementById("messageInput").value = "";
}
  
messagesRef.on("child_added", snapshot => {
    const msg = snapshot.val();
    const currentUser = document.getElementById("username").value.trim() || "Anonymous";
    const isCurrentUser = msg.name === currentUser;
  
    const container = document.createElement("div");
    container.className = `message-container ${isCurrentUser ? 'you' : 'other'}`;
  
    const avatar = document.createElement("img");
    avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.name)}&background=0D8ABC&color=fff`;
    avatar.alt = msg.name;
    avatar.className = "profile-pic";
  
    const wrapper = document.createElement("div");
    wrapper.className = "message-wrapper";
  
    const nameDiv = document.createElement("div");
    nameDiv.className = "message-name";
    nameDiv.textContent = msg.name;
  
    const textDiv = document.createElement("div");
    textDiv.className = `message ${isCurrentUser ? 'you' : 'other'}`;
    textDiv.textContent = msg.text;
  
    wrapper.appendChild(nameDiv);
    wrapper.appendChild(textDiv);
  
    if (isCurrentUser) {
      container.appendChild(wrapper);
      container.appendChild(avatar);
    } else {
      container.appendChild(avatar);
      container.appendChild(wrapper);
    }
  
    const messagesEl = document.getElementById("messages");
    messagesEl.appendChild(container);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  });
