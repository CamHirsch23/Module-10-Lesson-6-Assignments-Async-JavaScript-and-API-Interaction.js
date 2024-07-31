// Task 1: Countdown Timer
function startCountdown(durationInSeconds) {
    let remainingTime = durationInSeconds;

    let countdownInterval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            alert('Countdown timer has expired!');
        } else {
            console.log(remainingTime);
            remainingTime--;
        }
    }, 1000); // Update every second
}

// Task 2: Delayed Notification
function delayedNotification(message, delayInMilliseconds) {
    setTimeout(() => {
        alert(message);
    }, delayInMilliseconds);
}

// Task 3: Repeat Notification
function repeatNotification(message, intervalInMilliseconds) {
    let repeatInterval = setInterval(() => {
        alert(message);
    }, intervalInMilliseconds);

    // Example: Dismiss after 10 seconds
    setTimeout(() => {
        clearInterval(repeatInterval);
    }, 10000);
}

// Example Usage
startCountdown(60); // Start a 60-second countdown
delayedNotification('This is a delayed notification!', 3000); // Display a notification after 3 seconds
repeatNotification('This notification repeats every 5 seconds!', 5000); // Display a notification every 5 seconds
