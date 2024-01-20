import { getIsTest, saveFunctionActive, saveIsTest } from '../api/chrome';
import { BaseTag } from './base';

export class FunctionBox extends BaseTag {

    private testCount = 0;

    constructor() {
        super(`<div id="function-box"></div>`);
    }

    public addTestActiveEvent() {
        this.content.onclick = async (e) => {
            if ((e.target!! as HTMLElement).id == "function-box") {
                this.testCount++;
                if (this.testCount == 5) {
                    this.testCount = 0;
                    const isTest = await getIsTest();
                    
                    if (!isTest) {
                        this.content.style.backgroundColor = "#FF0000";
                        saveIsTest(true);
                    } else {
                        this.content.style.backgroundColor = "#0000FF";
                        saveIsTest(false);
                    }

                    setTimeout(() => {
                        this.content.style.backgroundColor = "#FFFFFF";
                    }, 1000);
                }
            }
        }
    }
}

export class Function extends BaseTag {

    private functionName: string;
    private isActive: boolean;

    private static getCheckBox (isActive: boolean): string {
        return `
            <svg class="check-box" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3 0C1.34315 0 0 1.34315 0 3V9C0 10.6569 1.34315 12 3 12H9C10.6569 12 12 10.6569 12 9V3.79575L6.83621 8.71682L6.16679 9.35477L5.4785 8.73723L2.43556 6.00707C2.02448 5.63824 1.99023 5.00601 2.35905 4.59493C2.72788 4.18385 3.36011 4.14959 3.77119 4.51842L6.12584 6.63103L11.5124 1.49764C11.5305 1.48041 11.5491 1.46398 11.5681 1.44836C11.0424 0.580214 10.089 0 9 0H3Z"
                    fill="${isActive ? "#4830F2" : "#7E8798"}"
                />
            </svg>
        `;
    }

    constructor(functionName: string, isActive: boolean) {
        super(`
            <div class="function">
                <div class="function-check-box">${Function.getCheckBox(isActive)}</div>
                <p class="function-name">${functionName}</p>
            </div>`
        );
        this.functionName = functionName;
        this.isActive = isActive;
        this.content.onclick = () => {
            this.changeActive();
        }
    }

    public changeActive() {
        this.isActive = !this.isActive;
        this.content.querySelector(".check-box > path")?.setAttribute("fill", this.isActive ? "#4830F2" : "#7E8798");
        saveFunctionActive(this.functionName, this.isActive);
    }

}