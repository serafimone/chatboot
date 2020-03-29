'use strict';


let messageForm = document.querySelector('#messageForm');
let messageInput = document.querySelector('#message');
let messageArea = document.querySelector('#messageArea');
let connectingElement = document.querySelector('#connecting');

let stompClient = null;
let username = null;


function connect() {
    username = document.getElementById("username").innerText.trim();

    let socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
}

// Connect to WebSocket Server.
connect();

function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/chatRoom', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({senderName: username, type: 'JOIN'})
    )

    connectingElement.classList.add('hidden');
}


function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}


function sendMessage(event) {
    let messageContent = messageInput.value.trim();
    if(messageContent && stompClient) {
        let chatMessage = {
            senderName: username,
            content: messageInput.value,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}


function onMessageReceived(payload) {
    console.log(payload + " RECEIVED")
    let message = JSON.parse(payload.body);

    let messageElement = document.createElement('li');

    if(message.type === 'JOIN') {
        messageElement.classList.add('system-message');
        message.content = message.senderName + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('system-message');
        message.content = message.senderName + ' left!';
    } else {
        messageElement.classList.add('card-panel','teal', message.senderName == username ? 'message-right' : 'message-left');
        let usernameElement = document.createElement('p');
        usernameElement.classList.add('white-text', 'sender');
        let usernameText = document.createTextNode(message.senderName);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    let textElement = document.createElement('p');
    if (message.type == 'CHAT') {
        textElement.classList.add('white-text');
    }
    let messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);

    if (message.type == 'CHAT') {
        messageArea.appendChild(createDateBlock(message.senderName == username));
    }

    messageArea.scrollTop = messageArea.scrollHeight;
}


function createDateBlock(isCurrentUser) {
    let messageDateElement = document.createElement('p');
    messageDateElement.classList.add('message-time',isCurrentUser ? 'right' : 'left')
    let currentDate = new Date();
    let dateTextElement = document.createTextNode(
        currentDate.getHours() + ':' + String(currentDate.getMinutes()).padStart(2, '0'))
    messageDateElement.appendChild(dateTextElement);

    return messageDateElement;
}


messageForm.addEventListener('submit', sendMessage, true);