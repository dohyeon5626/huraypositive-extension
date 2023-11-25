import { addTabUpdatedListener, executeScript, getFunctionActiveMap } from "../api/chrome";
import { FUNCTION } from "../code";

addTabUpdatedListener(
    async (url, tabId) => {
        let functionActiveMap = await getFunctionActiveMap();
        if (functionActiveMap.get(FUNCTION.MEETING_ROOM) && url.startsWith("https://calendar.google.com/")) {
            // TODO 구글 캘린더 회의실 정보 보기 로직
            executeScript(tabId, "content.js");
        }
        else if (functionActiveMap.get(FUNCTION.SPREADSHEET_SEARCH) && url.startsWith("https://docs.google.com/spreadsheets")) {
            // TODO 스프레드시트 시트 검색바 추가 로직
            executeScript(tabId, "content.js");
        }
    }
);