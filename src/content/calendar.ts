import { getTodayCompanySchedule } from "../api/google";
import { getNowTimeNumber, getTimeNumber } from "../util/date";
import { MeetingRoomBox } from "../views/meeting-room";

(async () => {
    MeetingRoomBox.clearExistsBox();
    const meetingRoomBox = new MeetingRoomBox();

    meetingRoomBox.arrangeCalendarLeftNav();
    meetingRoomBox.changeMeetingRoomStatus(await getTodayCompanySchedule());
})();
