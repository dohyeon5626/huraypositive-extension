import { TestLogger } from '../etc/test-mode';
import { SpreadSearchBar } from '../views/spread-search';

const logger = new TestLogger("[SPREAD]");
logger.print("[START]" + window.location.href);

if (!SpreadSearchBar.isExist()) {
    logger.print("[START] SpreadSearchBar exist");
    const meetingRoomBox = new SpreadSearchBar();
    meetingRoomBox.putSearchBar();
    logger.print("[END] SpreadSearchBar exist");
}

logger.print("[END]" + window.location.href);