
/* 
    Muuri's grid can't detect if an item has been changed
    resulting in overlapped elements in case an item got 
    larger in size, the best sloution I found is to observe 
    items and refresh Muuri's grid on change
*/

/* TODO: refresh only observed item, for better optimization */

var observer = new MutationObserver(_ => {

    muuriRefresh();
});

const observeElement = element => {

    // TODO: these options might be an overkill double check
    observer.observe(element, { attributes: true, childList: true, characterData: true, subtree: true });    
} 