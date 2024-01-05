const setBlockAttribute = (blockList: NodeListOf<Element>) => {
    blockList.forEach(block => {
        (block as HTMLElement).style.height = (block as HTMLElement).getBoundingClientRect().height + "px";
        if (!block.classList.contains("block")) {
            block.classList.add("block");
        }
    });
}

const setExecuteEvent = () => {
    new MutationObserver((mutations) => {
        setBlockAttribute(document.querySelectorAll(".microlight"));
    }).observe(document.querySelector('.responses-inner')!!, {
        childList: true,
        attributes: false,
        characterData: true,
        subtree: true
    });
}

const finderIntervalId = setInterval(() => {
    const blockList = document.querySelectorAll(".microlight");
    if (blockList.length > 0) {
        setBlockAttribute(blockList);
        setExecuteEvent();
        clearInterval(finderIntervalId);
    }
}, 500);

setTimeout(() => {
    clearInterval(finderIntervalId);
}, 10000);