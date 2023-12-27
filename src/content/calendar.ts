import { getTodayCompanySchedule, addMissingMeetingRoomCalendar } from '../api/google';
import { LeftNavMeetingRoomBox, ScheduleMeetingRoomBox } from '../views/meeting-room';

(async () => {
    addMissingMeetingRoomCalendar(() => location.reload());

    if (!LeftNavMeetingRoomBox.isExistCalendarLeftNav()) {
        const meetingRoomBox = new LeftNavMeetingRoomBox();

        meetingRoomBox.arrangeCalendarLeftNav();
        meetingRoomBox.changeMeetingRoomStatus(await getTodayCompanySchedule());
    }
})();

(async () => {
    new MutationObserver((mutations) => {
        if (!ScheduleMeetingRoomBox.isExistCalendarInfoSchedule() && ScheduleMeetingRoomBox.isReadyCalendarInfoSchedule()) {
            new ScheduleMeetingRoomBox().arrangeCalendarInfoSchedule();
        }
    }).observe(document.querySelector('.yDmH0d')!!, {
        childList: true,
        attributes: false,
        characterData: true,
        subtree: true
    });
})();