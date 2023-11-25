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

export const getFunctionActiveMap = (): Promise<Map<string, boolean>> => {
    return new Promise<Map<string, boolean>>((resolve) => {
        chrome.storage.sync.get(['functionActiveMap'], (result) => {
            if (result.functionActiveMap) {
                resolve(new Map<string, boolean>(Object.entries(result.functionActiveMap)));
            } else {
                resolve(new Map<string, boolean>());
            }
        });
    });
}

export const saveFunctionActiveMap = (functionActiveMap: Map<string, boolean>) => {
    return new Promise<void>((resolve) => {
        chrome.storage.sync.set({functionActiveMap: Object.fromEntries(functionActiveMap)}, resolve);
    });
}

export const saveFunctionActive = async (functionName: string, isFunctionActive: boolean) => {
    const functionActiveMap = await getFunctionActiveMap();
    functionActiveMap.set(functionName, isFunctionActive);
    saveFunctionActiveMap(functionActiveMap);
}

export const getGoogleOauthToken = (): Promise<string|undefined> => {
    return new Promise<string|undefined>(resolve => {
        chrome.identity.getAuthToken({interactive: true}, (token) => {
            resolve(token);
        });
    });
}

export const getUserEmail = (func: (email: string) => void) => {
    chrome.identity.getProfileUserInfo({ accountStatus: chrome.identity.AccountStatus.ANY }, function (user_info) {
        func(user_info.email);
    })
}