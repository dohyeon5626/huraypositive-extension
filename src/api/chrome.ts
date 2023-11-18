export const addTabUpdatedListener = (func: (url: string, tabId: number) => void) => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (tab.url && changeInfo.status == 'complete') {
            func(tab.url, tabId);
        }
    });
}

export const executeScript = (tabId: number, file: string) => {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [file]
    });
}

export const getGoogleOauthToken = (): Promise<string> => {
    return new Promise<string>(resolve => {
        chrome.identity.getAuthToken({'interactive': true}, (token) => {
            resolve(token!!);
        });
    })
}