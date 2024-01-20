import { getIsTest } from '../api/chrome';

const executeWhenTestModeOn = (resolve: () => void) => {
    getIsTest().then((isTest) => {
        if (isTest) resolve();
    });
}

export class TestLogger {

    private code: string;

    constructor(code: string) {
        this.code = code;
    }

    public print(log: any) {
        executeWhenTestModeOn(() => console.log(this.code, log));
    } 

    public multiPrint(log1: any, log2: any) {
        executeWhenTestModeOn(() => console.log(this.code, log1, log2));
    } 


}