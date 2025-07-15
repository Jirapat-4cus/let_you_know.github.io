// server.js
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { v4: uuidV4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ก่อนรันเซิร์ฟเวอร์ อย่าลืมติดตั้ง uuid: npm install uuid

app.use(express.static('public'));

// เปลี่ยนมาใช้ Object เพื่อเก็บข้อมูลห้องทั้งหมด
let rooms = {};

io.on('connection', (socket) => {
    // เมื่อ Client เชื่อมต่อเข้ามาครั้งแรก ให้ส่งรายชื่อห้องทั้งหมดไปให้
    socket.emit('update-rooms', rooms);

    // เมื่อมีการสร้างห้องใหม่
    socket.on('create-room', (roomData) => {
        const roomId = uuidV4().substring(0, 8);
        rooms[roomId] = {
            id: roomId,
            name: roomData.name,
            tutor: roomData.tutor,
            subject: roomData.subject,
            participants: [], // เก็บ socket.id ของผู้เข้าร่วม
        };
        // แจ้งเตือน Client ทุกคนว่ามีห้องใหม่ถูกสร้างขึ้น
        io.emit('update-rooms', rooms);
        // ส่ง ID ห้องกลับไปให้ผู้สร้างเพื่อเข้าร่วมทันที
        socket.emit('room-created', roomId);
    });

    // เมื่อมีการเข้าร่วมห้อง
    socket.on('join-room', (roomId, userInfo, callback) => {
        if (!rooms[roomId]) {
            return callback({ error: "Room not found" });
        }

        socket.join(roomId);
        const room = rooms[roomId];
        
        // เพิ่มผู้ใช้คนนี้เข้าไปในห้อง
        room.participants.push({ id: socket.id, name: userInfo.name });
        
        // ส่งรายชื่อผู้ใช้ที่อยู่ในห้องกลับไปให้คนที่เพิ่งเข้ามา
        const usersInRoom = room.participants.filter(p => p.id !== socket.id);
        callback({ usersInRoom });

        // อัปเดตข้อมูลห้องให้ทุกคน
        io.emit('update-rooms', rooms);
        // บอกคนอื่นในห้องว่ามีคนใหม่เข้ามา
        socket.to(roomId).emit('user-joined', { newUserId: socket.id, name: userInfo.name });
    });

    // จัดการสัญญาณ WebRTC
    socket.on('signal', (payload) => {
        io.to(payload.target).emit('signal', {
            signal: payload.signal,
            sender: payload.sender,
            senderName: payload.senderName
        });
    });

    // เมื่อผู้ใช้ตัดการเชื่อมต่อ
    socket.on('disconnect', () => {
        for (const roomId in rooms) {
            const room = rooms[roomId];
            const userIndex = room.participants.findIndex(p => p.id === socket.id);
            if (userIndex > -1) {
                room.participants.splice(userIndex, 1);
                // ถ้าไม่มีคนอยู่ในห้องแล้ว ให้ลบห้องทิ้ง
                if (room.participants.length === 0) {
                    delete rooms[roomId];
                }
                io.emit('update-rooms', rooms); // อัปเดตข้อมูลห้อง
                io.to(roomId).emit('user-left', socket.id);
                break;
            }
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 TutorSpace Server is running on http://localhost:${PORT}`);
});