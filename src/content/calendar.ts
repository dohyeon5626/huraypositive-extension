import { getTodayCompanySchedule } from "../api/google";

(async () => {
    const schedule = await getTodayCompanySchedule();
    // TODO 스케줄에 따른 ui 관련 로직 작성할 예정
})();
