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

export const getFunctionActiveMap = () => {
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
        chrome.storage.sync.set({ functionActiveMap: Object.fromEntries(functionActiveMap) }, resolve);
    });
}

export const saveFunctionActive = async (functionName: string, isFunctionActive: boolean) => {
    const functionActiveMap = await getFunctionActiveMap();
    functionActiveMap.set(functionName, isFunctionActive);
    saveFunctionActiveMap(functionActiveMap);
}

export const getGoogleOauthToken = () => {
    return new Promise<string>(resolve => {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            if (token) { // FIXME 토큰이 빈 값으로 올때가 있는데 재로그인 하는 방법을 찾아봐야함
                resolve(token);
            }
        });
    });
}

export const getUserEmail = (): Promise<string> => {
    return new Promise<string>(resolve => {
        chrome.identity.getProfileUserInfo(
            { accountStatus: chrome.identity.AccountStatus.ANY },
            (user_info) => {
                resolve(user_info.email);
            });
    });
}

export const addMessageListener = (func: (request: any, callback: (response: any) => void) => void) => {
    chrome.runtime.onMessage.addListener((request, sender, callback) => func(request, callback));
}

export const sendMessage = (action: any) => {
    return new Promise<any>(resolve => {
        chrome.runtime.sendMessage(action, value => resolve(value));
    });
}