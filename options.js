document.getElementById('saveChanges').addEventListener('click', () => {
    const oldAvatarUrl = document.getElementById('oldAvatarUrl').value;
    const newAvatarUrl = document.getElementById('newAvatarUrl').value;

    // Lưu các URL vào chrome storage
    chrome.storage.sync.set({ oldAvatarUrl, newAvatarUrl }, () => {
        alert('Avatar URLs saved successfully!');
    });
});
