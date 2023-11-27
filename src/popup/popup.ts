import { getFunctionActiveMap, getUserEmail } from '../api/chrome';
import { Function, FunctionBox } from '../views/function';
import { TextBox, TextType } from '../views/text';

const box = new FunctionBox();
getUserEmail().then(email => {
    if (email.includes("huray.net")) {
        getFunctionActiveMap().then(functionActiveMap => {
            functionActiveMap.forEach((functionActive, functionName) => {
                box.addTag(new Function(functionName, functionActive));
            });
        });
    } else {
        box.addTag(new TextBox('Huray Positive 계정만 사용이 가능합니다.', TextType.INVALID));
    }
    box.arrangeBase();
}
);