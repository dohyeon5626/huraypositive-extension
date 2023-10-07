import { addTabUpdatedListener, executeScript } from "../api/chrome";

console.log("Hello background");

addTabUpdatedListener(
    (url, tabId) => {
        if (url.includes("google.com")) {
            executeScript(tabId, "content.js");
        }
    }
);