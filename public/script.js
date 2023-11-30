const socket = io();
let username = "";

function setUsername(){
    username = document.getElementById("username").value;
    if (username.trim() !== "") {
        socket.emit('setUsername', username);
        document.getElementById("username-setter").style.display = 'none';
        document.getElementById("chat").style.display = 'block';
    } else {
       alert("Por favor, digite seu username antes de continuar!"); 
    }
}

function sendMessage() {
    const message = document.getElementById('m').value.trim();
    if (message !== "") {
        socket.emit('chat message', message);
        document.getElementById('m').value = "";
    } else {
        alert("digite sua mensagem antes de enviar");
    }
}

function scrollToBottom() {
    const chat = document.getElementById('mensagens');
    chat.scrollTop = chat.scrollHeight;
}

socket.on('chat message', (data) => {
    const messages = document.getElementById("messages");
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${data.username}: ${data.message}`));

    if (data.username === username) {
        li.classList.add('message-container', 'sent');
    } else {
        li.classList.add('message-container', 'received');
    }

    messages.appendChild(li);
    scrollToBottom();
})