import { getFunctionActiveMap, getUserEmail } from '../api/chrome';
import { BASE_FUNC_INDEX_MAP, FUNCTION } from '../etc/func-base';
import { Function, FunctionBox } from '../views/function';
import { TextBox, TextType } from '../views/text';

(async () => {
    const email = await getUserEmail();
    const box = new FunctionBox();

    if (email.includes("huray.net")) {
        getFunctionActiveMap().then(functionActiveMap => {
            Array.from(functionActiveMap)
                .sort((func1, func2) => 
                    (BASE_FUNC_INDEX_MAP.get(func1[0] as FUNCTION)!! < BASE_FUNC_INDEX_MAP.get(func2[0] as FUNCTION)!!) ? -1 : 1)
                .forEach(([functionName, functionActive]) => {
                    box.addTag(new Function(functionName, functionActive));
                });
        });
    } else {
        box.addTag(new TextBox('Huray Positive 계정만 사용이 가능합니다.', TextType.INVALID));
    }
    box.arrangeBase();
    box.addTestActiveEvent();
})();