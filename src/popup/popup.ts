import { getFunctionActiveMap } from '../api/chrome';
import { Function, FunctionBox } from '../views/function';

const box = new FunctionBox();
getFunctionActiveMap().then(functionActiveMap => {
    functionActiveMap.forEach((functionActive, functionName) => {
        box.addTag(new Function(functionName, functionActive));
    });
    box.arrangeBase();
});