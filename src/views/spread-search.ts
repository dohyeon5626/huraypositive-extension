import { EventItem } from '../type/google-response';
import { BaseTag } from './base';

const statusBox = `
                    <input id='spreadSearchBar' class='spread-search-bar' type=text/>
                `;

export class SpreadSearchBar extends BaseTag {

    constructor() {
        super(` 
                ${statusBox}
                
        `);
    }
    public static isExist(): boolean {
        return document.getElementById("spreadSearchBar") != null;
    }
    public putSearchBar() {
        console.log(this.content);
        var searchBar = this.content as HTMLInputElement;
        var target = document.getElementById('waffle-disclaimer-bar')?.nextSibling?.firstChild!! as HTMLElement
        target.append(searchBar);
        searchBar.addEventListener("keyup", () => {
            var searchValue = searchBar.value;
            const testElements = document.getElementsByClassName("docs-sheet-tab-name");
            if(searchValue.trim() == "") {
                Array.prototype.filter.call(
                        testElements,
                        (testElement) => testElement).forEach((element) => {
                            if(element.offsetParent != null)
                                element.offsetParent.classList.remove("search-disabled");
                        });
            } else {
        
                const testDivsNot = Array.prototype.filter.call(
                        testElements,
                        (testElement) => !testElement.innerHTML.includes(searchValue)
                );
                const testDivs = Array.prototype.filter.call(
                        testElements,
                        (testElement) => testElement.innerHTML.includes(searchValue)
                );
                if (testDivsNot != null) {
                    testDivsNot.forEach((element) => {
                        if (element.offsetParent == null) return;
                        element.offsetParent.classList.add("search-disabled");
            
                    });
                }
                if (testDivs != null) {
                    testDivs.forEach((element) => {
                        if (element.offsetParent == null) return;
                        element.offsetParent.classList.remove("search-disabled");
                    })
                }
            }
        });
    }
}
