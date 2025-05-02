function scrollToBottom() {
    const messages = document.getElementById('messages');
    messages.scrollTop = messages.scrollHeight;
}

scrollToBottom()

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        alert('File selected: ' + file.name);
    }
}