const notificationContainer = document.querySelector(".notification-container");
const notificationsListContainer = document.querySelector(".notifications-list-container");
const notificationCounterElement = document.querySelector(".notification-count");

let notificationCount = 0;

let timerNotificationCreator;

function startNotificationCreatorTimer() {
    timerNotificationCreator = setInterval(addNewNotification, 3000);
    console.log("Timer Set");
} 

function addNewNotification() {
    let notificationText = "New Notification!";

    const notificationElement = document.createElement('div');
    notificationElement.className = "notification-item";
    notificationElement.innerHTML = `${notificationText} <i data-action="removeNotification" class="fa-regular fa-circle-xmark"></i></i>`;

    notificationsListContainer.appendChild(notificationElement);
    notificationCount++;
    updateNotificationCount();
}

function updateNotificationCount() {
    notificationCounterElement.textContent = notificationCount;
}

notificationContainer.addEventListener('click', (event) => {
    let bellIcon = event.target.closest('.bell-icon-container')
    if (bellIcon) {
        clearInterval(timerNotificationCreator);
    
        console.log("Timer Cleared");
    
        setTimeout(() => {
            startNotificationCreatorTimer();
        }, 10000);
    }

    if (event.target.dataset.action == 'removeNotification') {
        removeNotification(event.target.closest('.notification-item'));
    }
})

function removeNotification(notification) {
    notification.classList.add("in-removal");
    setTimeout(() => {
        notification.remove();
        notificationCount--;
        updateNotificationCount();
    }, 400)
}

startNotificationCreatorTimer();
updateNotificationCount();

const notificationStopStartButton = document.getElementById('notification-stop-start-button');
notificationStopStartButton.addEventListener('click', () => {
    if (notificationStopStartButton.dataset.action == "toStop") {
        clearInterval(timerNotificationCreator);
        console.log("Timer Cleared");
        notificationStopStartButton.dataset.action = "toStart";
        notificationStopStartButton.textContent = "Start Notification Creation";
    }
    else {
        startNotificationCreatorTimer();
        console.log("Timer Started");
        notificationStopStartButton.dataset.action = "toStop";
        notificationStopStartButton.textContent = "Stop Notification Creation";
    }
})