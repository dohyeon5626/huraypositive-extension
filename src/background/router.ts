import { addTabUpdatedListener, applySheetAndScript, getFunctionActiveMap } from "../api/chrome";
import { FUNCTION } from "../code";

addTabUpdatedListener(
    async (url, tabId) => {
        let functionActiveMap = await getFunctionActiveMap();
        if (functionActiveMap.get(FUNCTION.MEETING_ROOM) && url.startsWith("https://calendar.google.com/calendar/u/0/r")) {
            applySheetAndScript(tabId, "calendar-content.css", "calendar-content.js");
        }
        else if (functionActiveMap.get(FUNCTION.SPREADSHEET_SEARCH) && url.startsWith("https://docs.google.com/spreadsheets")) {
            applySheetAndScript(tabId, "spread-search.css", "spread-search.js");
        }
    }
);