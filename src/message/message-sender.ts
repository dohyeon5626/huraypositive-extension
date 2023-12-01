import { sendMessage } from "../api/chrome";
import { MessageStatus } from "./message-type";

export const getGoogleOauthToken = () => {
    return new Promise<string>((resolve) => {
        sendMessage({
            action: MessageStatus.GET_GOOGLE_OAUTH_TOKEN
        }).then(token => resolve(token));
    });
}

