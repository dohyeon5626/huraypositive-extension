import { BaseTag } from './base';

const statusBox = `<input id='spreadSearchBar' class='spread-search-bar' type=text/>`;

export class SpreadSearchBar extends BaseTag {

    constructor() {
        super(`${statusBox}`);
    }

    public static isExist(): boolean {
        return document.getElementById("spreadSearchBar") != null;
    }

    public putSearchBar() {
        const searchBar = this.content as HTMLInputElement;
        const target = document.getElementById('waffle-disclaimer-bar')?.nextSibling?.firstChild!! as HTMLElement

        target?.append(searchBar);
        
        searchBar.addEventListener("keydown", (event) => {
            if (event.key == "Enter") event.preventDefault();
        });

        searchBar.addEventListener("keyup", () => {
            const searchValue = searchBar.value;
            const testElements = document.getElementsByClassName("docs-sheet-tab-name");
            
            if (searchValue.trim() == "") {
                Array.prototype.filter.call(
                    testElements,
                    (testElement) => testElement
                ).forEach((element) => element.offsetParent?.classList.remove("search-disabled"));
            } else {
                Array.prototype.filter.call(
                    testElements,
                    (testElement) => !testElement.innerHTML.includes(searchValue)
                )?.forEach((element) => element.offsetParent?.classList.add("search-disabled"));

                Array.prototype.filter.call(
                    testElements,
                    (testElement) => testElement.innerHTML.includes(searchValue)
                )?.forEach((element) => element.offsetParent?.classList.remove("search-disabled"));
            }
        });
    }
}
