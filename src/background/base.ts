import { saveFunctionActiveMap } from "../api/chrome";

const defaultFunctionActiveMap = new Map([
    ["구글 캘린더 회의실 정보 보기", true],
    ["스프레드시트 시트 검색바 추가", true]
]);

chrome.runtime.onInstalled.addListener(({reason}) => {
    if (reason === 'install') {
        saveFunctionActiveMap(defaultFunctionActiveMap);
    }
});