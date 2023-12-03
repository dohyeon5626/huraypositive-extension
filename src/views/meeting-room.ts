import { EventItem } from '../type/google-response';
import { getNowTimeNumber, getTimeNumber } from '../util/date';
import { BaseTag } from './base';

export class MeetingRoomBox extends BaseTag {
    
    public static clearExistsBox () {
        document.querySelectorAll(`#meeting-room-box`).forEach(box => {
            box.remove();
        });
    }

    constructor() {
        super(`
            <div id="meeting-room-box">
                <h1 id="meeting-room-guide">휴레이 회의실</h1>
                <div id="meeting-room-status-box">

                    <div id="small1room" class="meeting-room"><p class="room-name">소1</p></div>
                    <div id="small2room" class="meeting-room"><p class="room-name">소2</p></div>
                    <div id="small3room" class="meeting-room"><p class="room-name">소3</p></div>
                    <div id="small4room" class="meeting-room"><p class="room-name">소4</p></div>

                    <div id="middle1room" class="meeting-room"><p class="room-name">중1</p></div>
                    <div id="middle2room" class="meeting-room"><p class="room-name">중2</p></div>
                    <div id="middle3room" class="meeting-room"><p class="room-name">중3</p></div>

                    <div id="large-room" class="meeting-room"><p class="room-name">대</p></div>
                    <div id="free-room" class="meeting-room"><p class="room-name">프</p></div>

                    <div id="a1" class="etc-room"></div>
                    <div id="b1" class="etc-room"></div>
                    <div id="c1" class="etc-room"></div>
                    <div id="d1" class="etc-room"></div>
                    <div id="e1" class="etc-room"></div>
                    <div id="f1" class="etc-room"></div>
                    <div id="g1" class="etc-room"></div>
                    <div id="h1" class="etc-room"></div>
                    <div id="i1" class="etc-room"></div>
                    <div id="j1" class="etc-room"></div>
                    <div id="k1" class="etc-room"></div>
                    <div id="l1" class="etc-room"></div>

                    <div id="a2" class="etc-room"></div>
                    <div id="b2" class="etc-room"></div>
                    <div id="c2" class="etc-room"></div>
                    <div id="d2" class="etc-room"></div>
                    <div id="e2" class="etc-room"></div>
                    <div id="f2" class="etc-room"></div>
                    <div id="g2" class="etc-room"></div>
                    <div id="h2" class="etc-room"></div>
                    <div id="i2" class="etc-room"></div>
                    <div id="j2" class="etc-room"></div>
                    <div id="k2" class="etc-room"></div>
                    <div id="l2" class="etc-room"></div>

                    <div id="a3" class="etc-room"></div>
                    <div id="b3" class="etc-room"></div>
                    <div id="c3" class="etc-room"></div>
                    <div id="d3" class="etc-room"></div>
                    <div id="e3" class="etc-room"></div>
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
            this.content.querySelector("#" + location)?.classList.add("active-room");
        })

        this.content.querySelectorAll(".room-name").forEach(roomName => {
            (roomName as HTMLElement).style.opacity = "100";
        })
    }

}