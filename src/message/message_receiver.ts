import { addMessageListener, getGoogleOauthToken, refreshGoogleOauthToken } from "../api/chrome";
import { MessageStatus } from "./message-type";

addMessageListener(
    (request, callback) => {
        (async () => { switch(request.action) {
            case MessageStatus.GET_GOOGLE_OAUTH_TOKEN:
                callback(await getGoogleOauthToken());
                break;
            case MessageStatus.REFRESH_GOOGLE_OAUTH_TOKEN:
                refreshGoogleOauthToken().then(callback);
                break;
        }})();
        return true;
    }
)