const textarea = document.querySelector('textarea');


textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`; 
});

textarea.addEventListener('keydown', (event) => {
    if (event.shiftKey) {
        return;
    }
    if (event.key === 'Enter') {
        event.preventDefault();
        createNotificationFromTextarea();
    }
})

const button = document.getElementById('create-notification').addEventListener('click', createNotificationFromTextarea);


function createNotificationFromTextarea() {
    const notificationText = textarea.value;
    if (notificationText.trim() === "") return;
    showNotification(notificationText);
    textarea.value = "";
}

function showNotification(options) {
    const notification = document.createElement('div');
    notification.className = 'notification';

    const textInside = document.createElement('p');
    textInside.innerHTML = options.trim().replace(/\n/g, '<br>');

    notification.appendChild(textInside);
    document.querySelector('.notifications-container').appendChild(notification);
    
    
    setTimeout(() => {
        notification.classList.add("fade-out");
        setTimeout(() => {
            notification.remove();
        }, 300)
    }, 1500);    
}