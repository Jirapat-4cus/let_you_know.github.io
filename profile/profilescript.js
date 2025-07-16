// ตัวแปรสำหรับจัดการโหมดแก้ไข
let isEditMode = false;

// ฟังก์ชันเปิดหน้าต่างเลือกไฟล์รูป
function triggerFileUpload() {
    document.getElementById('profileImageInput').click();
}

// ฟังก์ชันโหลดรูป profile
function loadProfileImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profileImage = document.querySelector('.profile-image');
            const placeholder = profileImage.querySelector('.profile-image-placeholder');
            const navbarAvatar = document.getElementById('navbarAvatar');
            const navbarPlaceholder = navbarAvatar.querySelector('.user-avatar-placeholder');
            
            // อัปเดตรูป profile หลัก (ใช้รูปต้นฉบับ)
            if (placeholder) {
                placeholder.style.display = 'none';
            }
            profileImage.style.backgroundImage = 'url(' + e.target.result + ')';
            
            // เพิ่ม img element สำหรับ profile หลัก
            let img = profileImage.querySelector('img');
            if (!img) {
                img = document.createElement('img');
                profileImage.appendChild(img);
            }
            img.src = e.target.result;
            img.alt = 'Profile Picture';
            
            // สร้างรูปย่อสำหรับ navbar
            resizeImageForNavbar(e.target.result, 40, function(resizedDataUrl) {
                // ซ่อน placeholder ใน navbar
                if (navbarPlaceholder) {
                    navbarPlaceholder.style.display = 'none';
                }
                
                // ลบ background image เก่า
                navbarAvatar.style.backgroundImage = 'none';
                
                // ลบ img เก่าถ้ามี
                const oldImg = navbarAvatar.querySelector('img');
                if (oldImg) {
                    navbarAvatar.removeChild(oldImg);
                }
                
                // สร้าง img element ใหม่สำหรับ navbar
                const navbarImg = document.createElement('img');
                navbarImg.src = resizedDataUrl;
                navbarImg.alt = 'Profile Picture';
                navbarAvatar.appendChild(navbarImg);
            });
        };
        reader.readAsDataURL(file);
    }
}

// ฟังก์ชันย่อขนาดรูปสำหรับ navbar (รักษาสัดส่วน ไม่ crop)
function resizeImageForNavbar(imageDataUrl, maxSize, callback) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
        // คำนวณขนาดใหม่โดยรักษาสัดส่วน
        let newWidth = img.width;
        let newHeight = img.height;
        
        // หาด้านที่ใหญ่กว่าแล้วย่อให้เท่ากับ maxSize
        if (newWidth > newHeight) {
            // รูปแนวนอน
            if (newWidth > maxSize) {
                newHeight = (newHeight * maxSize) / newWidth;
                newWidth = maxSize;
            }
        } else {
            // รูปแนวตั้ง
            if (newHeight > maxSize) {
                newWidth = (newWidth * maxSize) / newHeight;
                newHeight = maxSize;
            }
        }
        
        // ตั้งขนาด canvas ตามขนาดใหม่
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        // วาดรูปเต็มลง canvas ด้วยขนาดใหม่
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        
        // แปลงเป็น data URL คุณภาพสูง
        const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        callback(resizedDataUrl);
    };
    
    img.src = imageDataUrl;
}

// ฟังก์ชันเปิด/ปิดโหมดแก้ไข
function toggleEditMode() {
    isEditMode = !isEditMode;
    const editables = document.querySelectorAll('.editable');
    const editIcon = document.querySelector('.edit-icon');
    const addAchievementBtn = document.getElementById('addAchievementBtn');
    const addVideoBtn = document.getElementById('addVideoBtn');
    
    if (isEditMode) {
        // เข้าสู่โหมดแก้ไข
        editIcon.textContent = '💾';
        editIcon.title = 'บันทึก';
        addAchievementBtn.style.display = 'block'; // แสดงปุ่มเพิ่มผลงาน
        addVideoBtn.style.display = 'flex';        // แสดงปุ่มเพิ่มวีดิโอ
        
        editables.forEach(function(element) {
            element.classList.add('editing');
            const currentText = element.textContent.trim();
            
            if (element.tagName === 'H1' || element.tagName === 'P') {
                // สำหรับชื่อและคำอธิบาย ใช้ input
                element.innerHTML = '<input type="text" value="' + currentText + '">';
            } else {
                // สำหรับผลงาน ใช้ textarea และเพิ่มปุ่มลบ
                const deleteBtn = document.createElement('span');
                deleteBtn.innerHTML = ' ❌';
                deleteBtn.style.cursor = 'pointer';
                deleteBtn.style.float = 'right';
                deleteBtn.style.marginLeft = '10px';
                deleteBtn.onclick = function(e) {
                    e.stopPropagation();
                    element.remove();
                };
                
                const textarea = document.createElement('textarea');
                textarea.rows = 1;
                textarea.value = currentText;
                textarea.style.width = '80%';
                textarea.style.border = 'none';
                textarea.style.background = 'transparent';
                textarea.style.fontSize = 'inherit';
                textarea.style.fontFamily = 'inherit';
                textarea.style.color = 'inherit';
                textarea.style.resize = 'vertical';
                textarea.style.outline = 'none';
                
                textarea.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = this.scrollHeight + 'px';
                });
                
                element.innerHTML = '';
                element.appendChild(textarea);
                element.appendChild(deleteBtn);
            }
            
            const input = element.querySelector('input, textarea');
            if (input) {
                input.focus();
                if (input.tagName === 'TEXTAREA') {
                    input.style.height = 'auto';
                    input.style.height = input.scrollHeight + 'px';
                }
            }
        });
    } else {
        // ออกจากโหมดแก้ไข (บันทึก)
        editIcon.textContent = '✏️';
        editIcon.title = 'แก้ไข';
        addAchievementBtn.style.display = 'none'; // ซ่อนปุ่มเพิ่มผลงาน
        addVideoBtn.style.display = 'none';       // ซ่อนปุ่มเพิ่มวีดิโอ
        
        editables.forEach(function(element) {
            element.classList.remove('editing');
            const input = element.querySelector('input, textarea');
            if (input) {
                element.textContent = input.value;
                
                // อัปเดต navbar ถ้าเป็นชื่อ
                if (element.getAttribute('data-field') === 'name') {
                    document.getElementById('navbarUsername').textContent = input.value;
                }
            }
        });
    }
}

// ฟังก์ชันเพิ่มผลงานใหม่
function addNewAchievement() {
    const achievementsContainer = document.querySelector('.achievements');
    const addButton = achievementsContainer.querySelector('.add-achievement');
    
    const newAchievement = document.createElement('div');
    newAchievement.className = 'achievement-item editable editing';
    newAchievement.setAttribute('data-field', 'achievement');
    
    // สร้าง textarea สำหรับแก้ไขทันที
    const textarea = document.createElement('textarea');
    textarea.rows = 1;
    textarea.value = 'ผลงานใหม่';
    textarea.style.width = '80%';
    textarea.style.border = 'none';
    textarea.style.background = 'transparent';
    textarea.style.fontSize = 'inherit';
    textarea.style.fontFamily = 'inherit';
    textarea.style.color = 'inherit';
    textarea.style.resize = 'vertical';
    textarea.style.outline = 'none';
    
    // ปรับขนาด textarea อัตโนมัติ
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
    
    // เมื่อเสร็จสิ้นการแก้ไข
    textarea.addEventListener('blur', function() {
        newAchievement.classList.remove('editing');
        newAchievement.textContent = this.value;
        // เพิ่มปุ่มลบกลับมา
        const deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = ' ❌';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.float = 'right';
        deleteBtn.onclick = function(e) {
            e.stopPropagation();
            newAchievement.remove();
        };
        newAchievement.appendChild(deleteBtn);
    });
    
    // กด Enter เพื่อเสร็จสิ้น
    textarea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.blur();
        }
    });
    
    // เพิ่มปุ่มลบ
    const deleteBtn = document.createElement('span');
    deleteBtn.innerHTML = ' ❌';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.float = 'right';
    deleteBtn.onclick = function(e) {
        e.stopPropagation();
        newAchievement.remove();
    };
    
    newAchievement.appendChild(textarea);
    newAchievement.appendChild(deleteBtn);
    
    achievementsContainer.insertBefore(newAchievement, addButton);
    
    // Focus และเลือกข้อความ
    textarea.focus();
    textarea.select();
}

// ฟังก์ชันเปิดหน้าต่างเลือกไฟล์วีดิโอ
function triggerVideoUpload() {
    document.getElementById('videoInput').click();
}

// ฟังก์ชันโหลดวีดิโอ
function loadVideos(event) {
    const files = event.target.files;
    const videoGrid = document.getElementById('videoGrid');
    
    if (files.length === 0) return;
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('video/')) {
            const videoItem = document.createElement('div');
            videoItem.className = 'gallery-item';
            
            const video = document.createElement('video');
            const videoURL = URL.createObjectURL(file);
            video.src = videoURL;
            video.muted = true;
            video.preload = 'metadata';
            video.controls = false;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            video.style.borderRadius = '10px';
            
            // รอให้วีดิโอโหลด metadata
            video.addEventListener('loadedmetadata', function() {
                if (video.duration > 1) {
                    video.currentTime = 1;
                } else {
                    video.currentTime = 0.1;
                }
            });
            
            // สร้าง overlay สำหรับเล่นวีดิโอ
            const overlay = document.createElement('div');
            overlay.className = 'video-overlay';
            overlay.innerHTML = '▶️';
            overlay.style.fontSize = '30px';
            
            // เมื่อคลิกให้เล่นวีดิโอแบบ modal
            videoItem.onclick = function(e) {
                e.stopPropagation();
                playVideoModal(videoURL, file.name);
            };
            
            // สร้างปุ่มลบ
            const deleteBtn = document.createElement('div');
            deleteBtn.innerHTML = '❌';
            deleteBtn.style.position = 'absolute';
            deleteBtn.style.top = '5px';
            deleteBtn.style.right = '5px';
            deleteBtn.style.cursor = 'pointer';
            deleteBtn.style.background = 'rgba(0,0,0,0.7)';
            deleteBtn.style.borderRadius = '50%';
            deleteBtn.style.width = '25px';
            deleteBtn.style.height = '25px';
            deleteBtn.style.display = 'flex';
            deleteBtn.style.alignItems = 'center';
            deleteBtn.style.justifyContent = 'center';
            deleteBtn.style.fontSize = '12px';
            deleteBtn.style.zIndex = '10';
            deleteBtn.style.color = 'white';
            deleteBtn.onclick = function(e) {
                e.stopPropagation();
                URL.revokeObjectURL(videoURL);
                videoItem.remove();
            };
            
            videoItem.appendChild(video);
            videoItem.appendChild(overlay);
            videoItem.appendChild(deleteBtn);
            
            // เพิ่มก่อนปุ่ม "เพิ่มวีดิโอ" (ถ้ามี)
            const addVideoBtn = videoGrid.querySelector('.add-video');
            if (addVideoBtn) {
                videoGrid.insertBefore(videoItem, addVideoBtn);
            } else {
                videoGrid.appendChild(videoItem);
            }
        }
    }
    
    // รีเซ็ต input
    event.target.value = '';
}

// ฟังก์ชันเล่นวีดิโอแบบ modal
function playVideoModal(videoSrc, fileName) {
    // สร้าง modal overlay
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0,0,0,0.9)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1000';
    modal.style.flexDirection = 'column';
    
    // ชื่อไฟล์
    if (fileName) {
        const title = document.createElement('div');
        title.textContent = fileName;
        title.style.color = 'white';
        title.style.marginBottom = '10px';
        title.style.fontSize = '18px';
        modal.appendChild(title);
    }
    
    // สร้าง video player
    const videoPlayer = document.createElement('video');
    videoPlayer.src = videoSrc;
    videoPlayer.controls = true;
    videoPlayer.autoplay = true;
    videoPlayer.style.maxWidth = '90%';
    videoPlayer.style.maxHeight = '80%';
    videoPlayer.style.borderRadius = '10px';
    videoPlayer.style.backgroundColor = '#000';
    
    // ปุ่มปิด
    const closeBtn = document.createElement('div');
    closeBtn.innerHTML = '✕';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '20px';
    closeBtn.style.right = '20px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontSize = '30px';
    closeBtn.style.color = 'white';
    closeBtn.style.background = 'rgba(0,0,0,0.7)';
    closeBtn.style.borderRadius = '50%';
    closeBtn.style.width = '50px';
    closeBtn.style.height = '50px';
    closeBtn.style.display = 'flex';
    closeBtn.style.alignItems = 'center';
    closeBtn.style.justifyContent = 'center';
    closeBtn.style.border = '2px solid white';
    
    // เมื่อคลิกปิด modal
    closeBtn.onclick = function() {
        videoPlayer.pause();
        document.body.removeChild(modal);
    };
    
    // เมื่อคลิกที่ background ให้ปิด modal
    modal.onclick = function(e) {
        if (e.target === modal) {
            videoPlayer.pause();
            document.body.removeChild(modal);
        }
    };
    
    // กด ESC เพื่อปิด modal
    const escHandler = function(e) {
        if (e.key === 'Escape') {
            videoPlayer.pause();
            document.body.removeChild(modal);
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    modal.appendChild(videoPlayer);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Focus ที่ video player
    videoPlayer.focus();
}