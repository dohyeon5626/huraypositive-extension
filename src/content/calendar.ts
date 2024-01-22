import { getTodayCompanySchedule, addMissingMeetingRoomCalendar } from '../api/google';
import { TestLogger } from '../etc/test-mode';
import { LeftNavMeetingRoomBox, ScheduleMeetingRoomBox } from '../views/meeting-room';

const logger = new TestLogger("[CALENDAR]");
logger.print("[START]" + window.location.href);

(async () => {
    addMissingMeetingRoomCalendar(() => location.reload());

    if (!LeftNavMeetingRoomBox.isExistCalendarLeftNav()) {
        logger.print("[START] exist calendar left nav");
        const meetingRoomBox = new LeftNavMeetingRoomBox();

        meetingRoomBox.arrangeCalendarLeftNav();
        meetingRoomBox.changeMeetingRoomStatus(await getTodayCompanySchedule());
        meetingRoomBox.addCalendarButtonEvent();
        logger.print("[END] exist calendar left nav");
    }
})();

(async () => {
    new MutationObserver((mutations) => {
        if (!ScheduleMeetingRoomBox.isExistCalendarInfoSchedule() && ScheduleMeetingRoomBox.isReadyCalendarInfoSchedule()) {
            logger.print("[START] exist calendarInfoSchedule, ready calendarInfoSchedule");
            new ScheduleMeetingRoomBox().arrangeCalendarInfoSchedule();
            logger.print("[END] exist calendarInfoSchedule, ready calendarInfoSchedule");
        }
    }).observe(document.querySelector('.yDmH0d')!!, {
        childList: true,
        attributes: false,
        characterData: true,
        subtree: true
    });
})();

logger.print("[END]" + window.location.href);