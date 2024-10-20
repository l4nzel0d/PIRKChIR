const notificationContainer = document.querySelector(".notificationContainer");
const notificationsListContainer = document.querySelector(".notifications-list-container");

let notificationList = [];

let timerNotificationCreator = setInterval(addNewNotification, 3000);

function addNewNotification() {
    let notificationText = "New Notification";
    notificationList.push(notificationText);

    const notificationElement = document.createElement('div');
    notificationElement.className = "notification-item";
    notificationElement.textContent = notificationText;

    notificationsListContainer.appendChild(notificationElement);
}