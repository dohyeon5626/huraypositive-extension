import { BaseTag } from "./base";

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

                    <div id="small1room" class="meeting-room">소1</div>
                    <div id="small2room" class="meeting-room">소2</div>
                    <div id="small3room" class="meeting-room">소3</div>
                    <div id="small4room" class="meeting-room">소4</div>

                    <div id="middle1room" class="meeting-room">중1</div>
                    <div id="middle2room" class="meeting-room">중2</div>
                    <div id="middle3room" class="meeting-room">중3</div>

                    <div id="largeRoom" class="meeting-room">대</div>
                    <div id="freeRoom" class="meeting-room">프</div>

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

}