import { getTodayCompanySchedule } from "../api/google";
import { MeetingRoomBox } from "../views/meeting-room";

(async () => {
    if (!MeetingRoomBox.isExistCalendarLeftNav()) {
        const meetingRoomBox = new MeetingRoomBox();

        meetingRoomBox.arrangeCalendarLeftNav();
        meetingRoomBox.changeMeetingRoomStatus(await getTodayCompanySchedule());
    }
})();
