const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Điều chỉnh kích thước canvas để phù hợp màn hình
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

let drawing = false;
let color = '#000';
let brushSize = 5;

// Tạo bảng màu tương tự Gartic.io
const colorPalette = ['#FF5733', '#33FF57', '#3357FF', '#F0E68C', '#FF69B4', '#000', '#FFF', '#FF6347', '#008080', '#FFD700'];
const colorPicker = document.getElementById('colorPalette');

// Tạo ô màu
colorPalette.forEach(c => {
    const colorDiv = document.createElement('div');
    colorDiv.classList.add('color');
    colorDiv.style.backgroundColor = c;
    colorDiv.addEventListener('click', () => color = c);
    colorPicker.appendChild(colorDiv);
});

// Thêm sự kiện cho ô chọn màu tùy chỉnh
const customColorInput = document.getElementById('customColor');
customColorInput.addEventListener('input', (e) => {
    color = e.target.value; // Cập nhật màu theo giá trị từ ô chọn
});

// Cập nhật kích thước bút
const brushSizeInput = document.getElementById('brushSize');
brushSizeInput.addEventListener('input', (e) => {
    brushSize = e.target.value;
});

// Thiết lập các sự kiện chuột
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    draw(e); // Gọi hàm vẽ ngay lập tức khi nhấn chuột
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath(); // Kết thúc đường vẽ
});

canvas.addEventListener('mousemove', draw);

// Chức năng vẽ
function draw(e) {
    if (!drawing) return;

    // Tính toán vị trí con trỏ chuột trên canvas
    const x = e.offsetX; // Sử dụng offsetX để lấy tọa độ x
    const y = e.offsetY; // Sử dụng offsetY để lấy tọa độ y

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath(); // Bắt đầu đường vẽ mới
    ctx.moveTo(x, y); // Đặt vị trí bắt đầu đường vẽ tại vị trí hiện tại
}

// Hiển thị đồng hồ thời gian thực
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
