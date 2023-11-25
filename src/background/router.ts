import { addTabUpdatedListener, executeScript } from "../api/chrome";

addTabUpdatedListener(
    (url, tabId) => {
        if (url.includes("google.com")) {
            executeScript(tabId, "content.js");
        }
    }
);