"use strict";
self.addEventListener("install", () => {
    console.log("installing");
});
self.addEventListener("activate", () => {
    console.log("activating");
});
self.addEventListener("fetch", () => {
    console.log("fetching");
});
window.addEventListener("beforeinstallprompt", e => {
    console.log("before install");
    e.preventDefault();
});
navigator.serviceWorker.ready.then(registration => {
    if (!registration.pushManager) {
        console.log("no notifications support");
        return false;
    }
    registration.pushManager.subscribe({
        userVisibleOnly: true
    }).then(subscription => {
        console.log("subscribed");
    }).catch(error => {
        console.log("error in subscription", error);
    });
});
