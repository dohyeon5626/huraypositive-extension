import { TestLogger } from '../etc/test-mode';
import { BaseTag } from './base';

const statusBox = `<input id='spreadSearchBar' class='spread-search-bar' type=text/>`;

export class SpreadSearchBar extends BaseTag {

    private logger = new TestLogger("[SpreadSearchBar]");

    constructor() {
        super(`${statusBox}`);
    }

    public static isExist(): boolean {
        return document.getElementById("spreadSearchBar") != null;
    }

    public putSearchBar() {
        this.logger.print("[START] putSearchBar");
        const searchBar = this.content as HTMLInputElement;
        this.logger.print("[START] putSearchBar append search bar");
        const target = document.getElementById('waffle-disclaimer-bar')?.nextSibling?.firstChild!! as HTMLElement
        target?.append(searchBar);
        this.logger.print("[END] putSearchBar append search bar");
        
        searchBar.addEventListener("keydown", (event) => {
            if (event.key == "Enter") event.preventDefault();
        });

        searchBar.addEventListener("keyup", () => {
            this.logger.print("[START] putSearchBar keyup");
            const searchValue = searchBar.value;
            const testElements = document.getElementsByClassName("docs-sheet-tab-name");
            
            if (searchValue.trim() == "") {
                this.logger.print("[START] putSearchBar searchValue trim");
                Array.prototype.filter.call(
                    testElements,
                    (testElement) => testElement
                ).forEach((element) => element.offsetParent?.classList.remove("search-disabled"));
                this.logger.print("[END] putSearchBar searchValue trim");
            } else {
                this.logger.print("[START] putSearchBar searchValue not trim");
                Array.prototype.filter.call(
                    testElements,
                    (testElement) => !testElement.innerHTML.includes(searchValue)
                )?.forEach((element) => element.offsetParent?.classList.add("search-disabled"));

                Array.prototype.filter.call(
                    testElements,
                    (testElement) => testElement.innerHTML.includes(searchValue)
                )?.forEach((element) => element.offsetParent?.classList.remove("search-disabled"));
                this.logger.print("[END] putSearchBar searchValue not trim");
            }
            this.logger.print("[END] putSearchBar keyup");
        });
        this.logger.print("[END] putSearchBar");
    }
}
