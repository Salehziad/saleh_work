// const axios =require('axios')

// const publicVapidKey =
//   "BENkEd8FVuv9UKNlxVCwEo53On94gZYkOhp4O5fwvGhYcQ2LM1aAzNkf5Cy3xXe2NSCUNt2QxTbCff4tAPLKNb0";
// // let x=true
// // Check for service worker
// if ('serviceWorker' in navigator) {
//   send().catch((err) => console.error(err));
// }
// console.log('gg');

// // Register SW, Register Push, Send Push
// async function send() {
//   console.log('hhh');
//   // Register Service Worker
//   console.log("Registering service worker...");
//   const register = await navigator.serviceWorker.register("worker.js", {
//     scope: "/",
//   });
//   console.log("Service Worker Registered...");

//   // Register Push
//   console.log("Registering Push...");
//   const subscription = await register.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
//   });
//   console.log("Push Registered...");

//   // Send Push Notification
//   console.log("Sending Push...");
//   // await fetch("http://localhost:3000/subscribe", {
//   //   method: "POST",
//   //   body: JSON.stringify(subscription),
//   //   headers: {
//   //     "content-type": "application/json",
//   //   },
//   // });
//   await axios.post("http://localhost:3000/subscribe",subscription)
//   console.log("Push Sent...");
// }

// function urlBase64ToUint8Array(base64String) {
//   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding)
//     .replace(/\-/g, "+")
//     .replace(/_/g, "/");

//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }

// module.exports=send