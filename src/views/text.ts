import { BaseTag } from "./base";

export enum TextType {
    INVALID = 'invalid'
}
export class TextBox extends BaseTag {
    
    constructor(text: string, type: TextType) {
        super('<div id="text-box" class="'+type+'">'+text+'</div>');
    }
}
