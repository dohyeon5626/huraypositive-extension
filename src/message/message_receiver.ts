import { addMessageListener, getGoogleOauthToken } from "../api/chrome";
import { MessageStatus } from "./message-type";

addMessageListener(
    (request, callback) => {
        (async () => { switch(request.action) {
            case MessageStatus.GET_GOOGLE_OAUTH_TOKEN:
                callback(await getGoogleOauthToken());
                break;
        }})();
        return true;
    }
)