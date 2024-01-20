import { TestLogger } from '../etc/test-mode';

const logger = new TestLogger("[SWAGGER]");
logger.print("[START]" + window.location.href);

const setBlockAttribute = (blockList: NodeListOf<Element>) => {
    logger.multiPrint("[START] setBlockAttribute", blockList);
    blockList.forEach(block => {
        (block as HTMLElement).style.height = (block as HTMLElement).getBoundingClientRect().height + "px";
        if (!block.classList.contains("block")) {
            block.classList.add("block");
        }
    });
    logger.print("[END] setBlockAttribute");
}

const setExecuteEvent = () => {
    logger.print("[START] setExecuteEvent");
    new MutationObserver((mutations) => {
        setBlockAttribute(document.querySelectorAll(".microlight"));
    }).observe(document.querySelector('.responses-inner')!!, {
        childList: true,
        attributes: false,
        characterData: true,
        subtree: true
    });
    logger.print("[END] setExecuteEvent");
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

logger.print("[END]" + window.location.href);