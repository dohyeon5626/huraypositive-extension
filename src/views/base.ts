export abstract class BaseTag {

    protected content: HTMLElement;

    constructor(html: string) {
        this.content = this.createTag(html);
    }

    public arrangeBase() {
        document.body.append(this.content);
    }

    public addTag(child: BaseTag) {
        this.content.append(child.content);
    }

    private createTag(html: string): HTMLElement {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.firstElementChild as HTMLElement;
    }

}