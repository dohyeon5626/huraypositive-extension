export enum FUNCTION {
    MEETING_ROOM = "구글 캘린더 회의실 정보 보기",
    SPREADSHEET_SEARCH = "스프레드시트 시트 검색",
    SWAGGER_JSON = "Swagger Json칸 크기 조절"
}

export const BASE_FUNC_ACTIVE_MAP = new Map([
    [FUNCTION.MEETING_ROOM, true],
    [FUNCTION.SPREADSHEET_SEARCH, true],
    [FUNCTION.SWAGGER_JSON, false],
]);

export const BASE_FUNC_INDEX_MAP = new Map([
    [FUNCTION.MEETING_ROOM, 1],
    [FUNCTION.SPREADSHEET_SEARCH, 2],
    [FUNCTION.SWAGGER_JSON, 3],
]);

