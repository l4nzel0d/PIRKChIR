const notificationContainer = document.querySelector(".notificationContainer");
const notificationIconElement = document.querySelector(".notification-icon");
const notificationsListContainer = document.querySelector(".notifications-list-container");
const notificationCounterElement = document.querySelector(".notification-count");

let notificationCount = 0;

let timerNotificationCreator;
function startNotificationCreatorTimer() {
    timerNotificationCreator = setInterval(addNewNotification, 3000);
    console.log("Timer Set");
} 

function addNewNotification() {
    let notificationText = "New Notification";

    const notificationElement = document.createElement('div');
    notificationElement.className = "notification-item";
    notificationElement.textContent = notificationText;

    notificationsListContainer.appendChild(notificationElement);
    notificationCount++;
    updateNotificationCount();
}

function updateNotificationCount() {
    notificationCounterElement.textContent = notificationCount;
}


notificationIconElement.addEventListener('click', () => {
    clearInterval(timerNotificationCreator);
    
    console.log("Timer Cleared");

    setTimeout(() => {
        startNotificationCreatorTimer();
    }, 10000);
})


startNotificationCreatorTimer();
updateNotificationCount();

const notificationStopStartButton = document.getElementById('notification-stop-start-button');
notificationStopStartButton.addEventListener('click', () => {
    if (notificationStopStartButton.dataset.action == "toStop") {
        clearInterval(timerNotificationCreator);
        notificationStopStartButton.dataset.action = "toStart";
        notificationStopStartButton.textContent = "Start Notification Creation";
    }
    else {
        startNotificationCreatorTimer();
        notificationStopStartButton.dataset.action = "toStop";
        notificationStopStartButton.textContent = "Stop Notification Creation";
    }
})