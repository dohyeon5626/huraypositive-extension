import { saveFunctionActiveMap, getUserEmail } from "../api/chrome";
import { FUNCTION } from "../code";

const defaultFunctionActiveMap = new Map([
    [FUNCTION.MEETING_ROOM, true],
    [FUNCTION.SPREADSHEET_SEARCH, true]
]);

chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
        saveFunctionActiveMap(defaultFunctionActiveMap);
        getUserEmail().then(email => {
            if (!email.includes("huray.net")) {
                chrome.tabs.create({ url: 'validation.html' });
            }
        })
    }
});