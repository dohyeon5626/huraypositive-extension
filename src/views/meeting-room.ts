import { EventItem } from '../type/google-response';
import { getNowTimeNumber, getTimeNumber } from '../util/date';
import { BaseTag } from './base';

export class MeetingRoomBox extends BaseTag {
    
    public static isExistCalendarLeftNav () {
        return document.querySelectorAll(`.meeting-room-box`).length > 0
    }

    constructor() {
        super(`
            <div class="meeting-room-box">
                <h1 class="meeting-room-guide">휴레이 회의실</h1>
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
            </div>
        `);
    }

    public arrangeCalendarLeftNav() {
        this.arrangeBehindPosition(document.querySelector(`div[jscontroller="vYumwc"]`)!!);
    }

    public changeMeetingRoomStatus(schedule: EventItem[]) {
        const now = getNowTimeNumber();

        const result = schedule.filter(schedule =>
            schedule.location &&
            schedule.location.startsWith("휴레이-7층-") &&
            getTimeNumber(schedule.start.dateTime) <= now &&
            now < getTimeNumber(schedule.end.dateTime)
        ).map(schedule => schedule.location)
        .map(location => location.replace("휴레이-7층-", ""))
        .map(location => location.split(" ")[0])
        .map(location => location.replace("소회의실", "small"))
        .map(location => location.replace("중회의실", "middle"))
        .map(location => location.replace("대회의실", "large-"))
        .map(location => location.replace("프리토킹룸", "free-"))
        .map(location => location + "room");

        result.forEach(location => {
            this.content.querySelector("." + location)?.classList.add("active-room");
        })

        this.content.querySelectorAll(".room-name").forEach(roomName => {
            (roomName as HTMLElement).style.opacity = "100";
        })
    }

}