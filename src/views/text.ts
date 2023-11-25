import { BaseTag } from "./base";
export class TextBox extends BaseTag {
    constructor(text: string) {
        super('<div id="text-box">'+text+'</div>');
    }
}
