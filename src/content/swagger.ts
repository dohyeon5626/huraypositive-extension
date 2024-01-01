const setBlockAttribute = (blockList: NodeListOf<Element>) => {
    blockList.forEach(block => {
        (block as HTMLElement).style.resize = "vertical";
        (block as HTMLElement).style.height = (block as HTMLElement).getBoundingClientRect().height + "px";
        (block as HTMLElement).style.maxHeight = "none";
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