// public/script.js

const socket = io();

// Lobby Elements
const createRoomForm = document.getElementById('createRoomForm');
const roomsGrid = document.getElementById('roomsGrid');
const lobby = document.getElementById('lobby');

// Meeting Room Elements
const meetingModal = document.getElementById('meetingModal');
const meetingRoomTitle = document.getElementById('meetingRoomTitle');
const participantsCount = document.getElementById('participantsCount');
const meetingVideoGrid = document.getElementById('meetingVideoGrid');
const micBtn = document.getElementById('micBtn');
const cameraBtn = document.getElementById('cameraBtn');
const screenShareBtn = document.getElementById('screenShareBtn');
const endCallBtn = document.getElementById('endCallBtn');

// State variables
let myStream;
let screenStream;
let peers = {};
let currentRoomId;
let myName;

// --- 1. Lobby Logic ---

// สร้างห้อง
createRoomForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const roomName = document.getElementById('roomName').value;
    myName = document.getElementById('yourName').value;
    const subject = document.getElementById('subject').value;

    if (roomName && myName && subject) {
        socket.emit('create-room', { name: roomName, tutor: myName, subject });
    }
});

// เมื่อเซิร์ฟเวอร์แจ้งว่าห้องถูกสร้างแล้ว ให้เข้าร่วมทันที
socket.on('room-created', (roomId) => {
    joinRoom(roomId, roomName.value);
});


// อัปเดตรายการห้องเรียน
socket.on('update-rooms', (rooms) => {
    roomsGrid.innerHTML = '';
    if (Object.keys(rooms).length === 0) {
        roomsGrid.innerHTML = '<div class="no-rooms">ยังไม่มีห้องเรียนเปิดอยู่</div>';
        return;
    }

    for (const roomId in rooms) {
        const room = rooms[roomId];
        const roomCard = document.createElement('div');
        roomCard.className = 'room-card';
        roomCard.innerHTML = `
            <div class="room-status"></div>
            <div class="room-title">${room.name}</div>
            <div class="room-subject">${room.subject}</div>
            <div class="room-participants">
                👨‍🏫 ${room.tutor} | 👥 ${room.participants.length} คน
            </div>
            <button class="btn btn-join">🎯 เข้าร่วม</button>
        `;
        roomCard.querySelector('.btn-join').addEventListener('click', () => {
            myName = prompt('กรุณาใส่ชื่อของคุณ:');
            if (myName) {
                joinRoom(roomId, room.name);
            }
        });
        roomsGrid.appendChild(roomCard);
    }
});

// --- 2. Meeting Room Logic ---

async function joinRoom(roomId, roomName) {
    currentRoomId = roomId;
    
    try {
        myStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        lobby.style.display = 'none';
        meetingModal.style.display = 'block';
        meetingRoomTitle.innerText = roomName;

        addVideoStream(myStream, socket.id, `${myName} (You)`);

        socket.emit('join-room', roomId, { name: myName }, (response) => {
            if (response.error) {
                alert(response.error);
                return;
            }
            // เชื่อมต่อกับคนที่อยู่ในห้องอยู่แล้ว
            response.usersInRoom.forEach(user => {
                const peer = createPeer(user.id, socket.id, myStream);
                peers[user.id] = peer;
            });
            updateParticipantsCount();
        });

    } catch (err) {
        console.error('Failed to get media', err);
        alert('ไม่สามารถเข้าถึงกล้องหรือไมโครโฟนได้');
    }
}

// เมื่อมีคนใหม่เข้ามา
socket.on('user-joined', (payload) => {
    const peer = addPeer(null, payload.newUserId, myStream);
    peers[payload.newUserId] = peer;
    updateParticipantsCount();
});

// เมื่อมีคนออก
socket.on('user-left', (userId) => {
    if (peers[userId]) peers[userId].destroy();
    delete peers[userId];
    removeVideoStream(userId);
    updateParticipantsCount();
});

// จัดการสัญญาณ WebRTC
socket.on('signal', (payload) => {
    const peer = peers[payload.sender];
    if (peer) {
        peer.signal(payload.signal);
    } else {
        // กรณีที่ได้รับ signal ก่อนที่จะสร้าง peer object
        const newPeer = addPeer(payload.signal, payload.sender, myStream);
        peers[payload.sender] = newPeer;
    }
});


// --- 3. WebRTC Helper Functions (using simple-peer) ---

function createPeer(userToSignal, callerID, stream) {
    const peer = new SimplePeer({ initiator: true, trickle: false, stream, config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] } });
    peer.on('signal', signal => {
        socket.emit('signal', { target: userToSignal, sender: callerID, senderName: myName, signal });
    });
    peer.on('stream', (remoteStream, metadata) => {
        const remoteSocketId = Object.keys(peers).find(key => peers[key] === peer);
        addVideoStream(remoteStream, remoteSocketId, 'User'); // อาจจะต้องส่งชื่อมาด้วย
    });
    return peer;
}

function addPeer(incomingSignal, callerID, stream) {
    const peer = new SimplePeer({ initiator: false, trickle: false, stream, config: { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] } });
    peer.on('signal', signal => {
        socket.emit('signal', { target: callerID, sender: socket.id, senderName: myName, signal });
    });
    peer.on('stream', remoteStream => {
        addVideoStream(remoteStream, callerID, 'User');
    });
    if (incomingSignal) {
        peer.signal(incomingSignal);
    }
    return peer;
}


// --- 4. UI Control Functions ---

function addVideoStream(stream, socketId, name) {
    if (document.getElementById(socketId)) return;
    const container = document.createElement('div');
    container.className = 'video-container';
    container.id = socketId;
    const video = document.createElement('video');
    video.srcObject = stream;
    video.autoplay = true;
    video.playsInline = true;
    if (socketId === socket.id) video.muted = true;
    const nameTag = document.createElement('p');
    nameTag.className = 'video-name';
    nameTag.innerText = name;
    container.append(video, nameTag);
    meetingVideoGrid.append(container);
}

function removeVideoStream(socketId) {
    const videoContainer = document.getElementById(socketId);
    if (videoContainer) videoContainer.remove();
}

function updateParticipantsCount() {
    const count = Object.keys(peers).length + 1;
    participantsCount.innerText = `👥 ${count} คน`;
}

// ควบคุมปุ่ม
micBtn.addEventListener('click', () => {
    const enabled = myStream.getAudioTracks()[0].enabled;
    myStream.getAudioTracks()[0].enabled = !enabled;
    micBtn.classList.toggle('active', !enabled);
    micBtn.innerHTML = enabled ? '🔇' : '🎤';
    micBtn.style.background = enabled ? '#ea4335' : '#34a853';
});

cameraBtn.addEventListener('click', () => {
    const enabled = myStream.getVideoTracks()[0].enabled;
    myStream.getVideoTracks()[0].enabled = !enabled;
    cameraBtn.classList.toggle('active', !enabled);
    cameraBtn.innerHTML = enabled ? '📸' : '📹';
    cameraBtn.style.background = enabled ? '#ea4335' : '#34a853';
});

endCallBtn.addEventListener('click', () => {
    window.location.reload();
});

screenShareBtn.addEventListener('click', async () => {
    if (screenStream) {
        stopScreenShare();
    } else {
        try {
            screenStream = await navigator.mediaDevices.getDisplayMedia({ cursor: true });
            replaceTrack(screenStream.getVideoTracks()[0]);
            document.getElementById(socket.id).querySelector('video').srcObject = screenStream;
            screenShareBtn.classList.add('active');
            screenStream.getVideoTracks()[0].onended = stopScreenShare;
        } catch (err) {
            console.error("Screen share error", err);
        }
    }
});

function stopScreenShare() {
    if (screenStream) screenStream.getTracks().forEach(track => track.stop());
    replaceTrack(myStream.getVideoTracks()[0]);
    document.getElementById(socket.id).querySelector('video').srcObject = myStream;
    screenShareBtn.classList.remove('active');
    screenStream = null;
}

function replaceTrack(newTrack) {
    for (const peerId in peers) {
        const peer = peers[peerId];
        const sender = peer.streams[0].getTracks().find(track => track.kind === 'video');
        if (sender) {
            peer.replaceTrack(sender, newTrack, myStream);
        }
    }
}