import { refreshFunctionActiveMap/*, getUserEmail*/ } from "../api/chrome";
import { BASE_FUNC_ACTIVE_MAP } from "../etc/func-base";

refreshFunctionActiveMap(BASE_FUNC_ACTIVE_MAP);

// chrome.runtime.onInstalled.addListener(({ reason }) => {
//     if (reason === 'install') {
//         getUserEmail().then(email => {
//             if (!email.includes("huray.net")) {
//                 chrome.tabs.create({ url: 'validation.html' });
//             }
//         })
//     }
// });