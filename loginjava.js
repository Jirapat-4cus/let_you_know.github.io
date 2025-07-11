// จำลองฐานข้อมูลผู้ใช้
const users = [
    { username: 'admin', password: 'admin123' },
    { username: 'student', password: 'student123' },
    { username: 'teacher', password: 'teacher123' }
];

// รอให้ DOM โหลดเสร็จก่อน
document.addEventListener('DOMContentLoaded', function() {
    
    // ฟังก์ชัน login
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');
        const successMessage = document.getElementById('successMessage');
        const loadingMessage = document.getElementById('loadingMessage');
        
        // ซ่อนข้อความก่อนหน้า
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
        
        // แสดง loading
        loadingMessage.style.display = 'block';
        
        // จำลองการเรียก API
        setTimeout(() => {
            loadingMessage.style.display = 'none';
            
            // ตรวจสอบ username และ password
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                successMessage.textContent = 'เข้าสู่ระบบสำเร็จ! กำลังเปลี่ยนหน้า...';
                successMessage.style.display = 'block';
                
                // จำลองการเปลี่ยนหน้า
                setTimeout(() => {
                    alert('ยินดีต้อนรับ ' + username + '! \n\nในระบบจริงจะเปลี่ยนหน้าไปยังหน้าหลักของระบบ');
                    // window.location.href = '/dashboard'; // ในระบบจริง
                }, 1500);
            } else {
                errorMessage.textContent = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
                errorMessage.style.display = 'block';
            }
        }, 1000);
    });

    // เพิ่มเอฟเฟกต์ให้กับ input fields
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Auto-focus ที่ username field
    document.getElementById('username').focus();
});

// ฟังก์ชัน register (จำลอง) - ประกาศเป็น global function
function showRegisterForm() {
    alert('ฟังก์ชัน Register\n\nในระบบจริงจะเปลี่ยนหน้าไปยังหน้าสมัครสมาชิก\n\nสำหรับทดสอบ Login ใช้:\n- admin / admin123\n- student / student123\n- teacher / teacher123');
}