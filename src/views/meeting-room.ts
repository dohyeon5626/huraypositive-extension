import { EventItem } from '../type/google-response';
import { getNowTime, getTime } from '../util/date';
import { BaseTag } from './base';

const statusBox = `
                <div class="meeting-room-status-box">
                    <div class="small1room meeting-room"><p class="room-name">소1</p></div>
                    <div class="small2room meeting-room"><p class="room-name">소2</p></div>
                    <div class="small3room meeting-room"><p class="room-name">소3</p></div>
                    <div class="small4room meeting-room"><p class="room-name">소4</p></div>

                    <div class="middle1room meeting-room"><p class="room-name">중1</p></div>
                    <div class="middle2room meeting-room"><p class="room-name">중2</p></div>
                    <div class="middle3room meeting-room"><p class="room-name">중3</p></div>

                    <div class="large-room meeting-room"><p class="room-name">대</p></div>
                    <div class="free-room meeting-room"><p class="room-name">프</p></div>

                    <div class="a1 etc-room"></div>
                    <div class="b1 etc-room"></div>
                    <div class="c1 etc-room"></div>
                    <div class="d1 etc-room"></div>
                    <div class="e1 etc-room"></div>
                    <div class="f1 etc-room"></div>
                    <div class="g1 etc-room"></div>
                    <div class="h1 etc-room"></div>
                    <div class="i1 etc-room"></div>
                    <div class="j1 etc-room"></div>
                    <div class="k1 etc-room"></div>
                    <div class="l1 etc-room"></div>

                    <div class="a2 etc-room"></div>
                    <div class="b2 etc-room"></div>
                    <div class="c2 etc-room"></div>
                    <div class="d2 etc-room"></div>
                    <div class="e2 etc-room"></div>
                    <div class="f2 etc-room"></div>
                    <div class="g2 etc-room"></div>
                    <div class="h2 etc-room"></div>
                    <div class="i2 etc-room"></div>
                    <div class="j2 etc-room"></div>
                    <div class="k2 etc-room"></div>
                    <div class="l2 etc-room"></div>

                    <div class="a3 etc-room"></div>
                    <div class="b3 etc-room"></div>
                    <div class="c3 etc-room"></div>
                    <div class="d3 etc-room"></div>
                    <div class="e3 etc-room"></div>
                <div>
                `;

const isLocationString = (location: string | null) => {
    return location && location.startsWith("휴레이-7층-");
}

const getLocationClass = (location: string) => {
    location = location.replace("휴레이-7층-", "");
    location = location.split(" ")[0];
    location = location.replace("소회의실", "small");
    location = location.replace("중회의실", "middle");
    location = location.replace("대회의실", "large-");
    location = location.replace("프리토킹룸", "free-");
    location = location + "room";
    return location;
}

export class LeftNavMeetingRoomBox extends BaseTag {
    
    public static isExistCalendarLeftNav () {
        return document.querySelectorAll(`.hEtGGf.HDIIVe.sBn5T > .left-nav-meeting-room-box`).length > 0
    }

    constructor() {
        super(`
            <div class="left-nav-meeting-room-box">
                <h1 class="meeting-room-guide">휴레이 회의실</h1>
                ${statusBox}
            </div>
        `);
    }

    public arrangeCalendarLeftNav() {
        this.arrangeBehindPosition(document.querySelector(`div[jscontroller="vYumwc"]`)!!);
    }

    public changeMeetingRoomStatus(schedule: EventItem[]) {
        const now = getNowTime();

        schedule.filter(schedule =>
            isLocationString(schedule.location) &&
            getTime(schedule.start.dateTime) <= now &&
            now < getTime(schedule.end.dateTime)
        ).map(schedule => getLocationClass(schedule.location))
        .forEach(location => {
            this.content.querySelector("." + location)?.classList.add("active-room");
        });

        this.content.querySelectorAll(".room-name").forEach(roomName => roomName.classList.add("show-name"));
    }

    public addCalendarButtonEvent() {
        document.querySelectorAll("#tkQpTb .XXcuqd").forEach(buttonBox => {
            const location = buttonBox.querySelector("span")!!.textContent!!;
            if (isLocationString(location)) {
                const inputBox = buttonBox.querySelector("input")!!;
                const meetingRoomBox = this.content.querySelector(`.${getLocationClass(location)}`)!!;

                meetingRoomBox.addEventListener('click', (event) => inputBox.click());
                meetingRoomBox.addEventListener('mouseover', (event) => buttonBox.classList.add("meeting-room-input"));
                meetingRoomBox.addEventListener('mouseout', (event) => buttonBox.classList.remove("meeting-room-input"));
            }
        });
    }

}

export class ScheduleMeetingRoomBox extends BaseTag {

    constructor() {
        super(`<div class="schedule-meeting-room-box">${statusBox}</div>`);
    }

    public static isExistCalendarInfoSchedule () {
        return document.querySelectorAll(`.Mz3isd > .schedule-meeting-room-box`).length > 0
    }

    public static isReadyCalendarInfoSchedule () {
        return document.querySelectorAll(`.Mz3isd > .nBzcnc.OcVpRe:not(.OjZ2cc.IyS93d.N1DhNb)`).length > 0
    }

    public arrangeCalendarInfoSchedule() {
        const position = document.querySelector(`.Mz3isd > .nBzcnc.OcVpRe:not(.OjZ2cc.IyS93d.N1DhNb)`)!!;

        const location = position.querySelector(".p9T8o")!!.textContent!!;
        if (isLocationString(location)) {
            this.content.querySelector("." + getLocationClass(location))?.classList.add("active-room");
            this.content.querySelectorAll(".room-name").forEach(roomName => roomName.classList.add("show-name"));
            this.arrangeBehindPosition(position as HTMLElement);
        }
    }
}