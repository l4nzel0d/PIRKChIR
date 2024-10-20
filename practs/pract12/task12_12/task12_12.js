const notificationContainer = document.querySelector(".notificationContainer");
const notificationIconElement = document.querySelector(".notification-icon");
const notificationsListContainer = document.querySelector(".notifications-list-container");
const notificationCounterElement = document.querySelector(".notification-count");

let notificationCount = 0;

let timerNotificationCreator = setInterval(addNewNotification, 3000);

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

updateNotificationCount();

