// Đặt khoảng thời gian kiểm tra (ms)
const CHECK_INTERVAL = 1; // 1 ms

// Hàm để thay đổi ảnh đại diện
function changeAvatar(oldAvatarUrl, newAvatarUrl) {
    // Tìm phần tử <img> bên trong <div class="nav-user_avatar">
    let userAvatar = document.querySelector('.nav-user_avatar img');

    if (userAvatar && userAvatar.src === oldAvatarUrl) {
        // Thay đổi thuộc tính src của ảnh
        userAvatar.src = newAvatarUrl;
        console.log("User avatar image source has been changed!");
    } else {
        console.log("User avatar image not found or the old URL does not match!");
    }

    // Tìm tất cả các thẻ <img> với src cụ thể
    let imgElements = document.querySelectorAll(`img[src="${oldAvatarUrl}"]`);

    // Lặp qua tất cả các thẻ <img> tìm được và thay đổi thuộc tính src
    imgElements.forEach(img => {
        img.src = newAvatarUrl;
        console.log("Image source has been changed!");
    });
}

// Hàm để kiểm tra và thay đổi ảnh liên tục
function monitorImages() {
    chrome.storage.sync.get(['oldAvatarUrl', 'newAvatarUrl'], (data) => {
        if (data.oldAvatarUrl && data.newAvatarUrl) {
            changeAvatar(data.oldAvatarUrl, data.newAvatarUrl);
        }
    });
}

// Gọi hàm monitorImages ngay khi tải trang
window.addEventListener('load', () => {
    monitorImages(); // Thay đổi ảnh ngay khi tải trang
    setInterval(monitorImages, CHECK_INTERVAL); // Kiểm tra và thay đổi ảnh liên tục
});

// Lắng nghe tin nhắn từ popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "changeAvatar") {
        const oldAvatarUrl = request.oldAvatarUrl;
        const newAvatarUrl = request.newAvatarUrl;

        // Thay đổi ảnh đại diện
        changeAvatar(oldAvatarUrl, newAvatarUrl);

        // Gửi phản hồi về kết quả
        sendResponse({ status: "Avatar changed!" });
    }
});



/*// Tìm phần tử <img> bên trong <div class="nav-user_avatar">
let userAvatar = document.querySelector('.nav-user_avatar img');

if (userAvatar) {
  // Thay đổi thuộc tính src của ảnh
  userAvatar.src = "https://i.ibb.co/mBv06sX/ce55140ede04c5b332152f2ab66aaa35-upscayl-2x-realesrgan-x4plus-1-1.png";
  console.log("User avatar image source has been changed!");
} else {
  console.log("User avatar image not found!");
}


setInterval(() => {
  // Tìm tất cả các thẻ <img> với src cụ thể
  let imgElements = document.querySelectorAll('img[src="https://i.hako.vn/ln/users/avatars/u176255-d5ba2d53-3da1-47ca-b624-03c4639d5264.jpg"]');

  // Lặp qua tất cả các thẻ <img> tìm được và thay đổi thuộc tính src
  imgElements.forEach(img => {
    img.src = "https://i.ibb.co/mBv06sX/ce55140ede04c5b332152f2ab66aaa35-upscayl-2x-realesrgan-x4plus-1-1.png";
    console.log("Image source has been changed!");
  });
}, 1); // Lặp lại mỗi 1000 ms (1 giây)*/