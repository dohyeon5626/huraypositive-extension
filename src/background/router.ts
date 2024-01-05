import { addTabUpdatedListener, applySheetAndScript, executeScript, getFunctionActiveMap } from "../api/chrome";
import { FUNCTION } from "../func-base";

addTabUpdatedListener(
    async (url, tabId) => {
        let functionActiveMap = await getFunctionActiveMap();
        if (functionActiveMap.get(FUNCTION.MEETING_ROOM) && url.startsWith("https://calendar.google.com/calendar/u/0/r")) {
            applySheetAndScript(tabId, "calendar-content.css", "calendar-content.js");
        }
        else if (functionActiveMap.get(FUNCTION.SPREADSHEET_SEARCH) && url.startsWith("https://docs.google.com/spreadsheets")) {
            // TODO 스프레드시트 시트 검색바 추가 로직
        }
        else if (functionActiveMap.get(FUNCTION.SWAGGER_JSON) && url.includes("huray") && url.includes("swagger")) {
            applySheetAndScript(tabId, "swagger-content.css", "swagger-content.js");
        }
    }
);