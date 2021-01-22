
PLUGIN_POSITION_KEY = 'pluginsposition';

const getPluginsPosition = () => {

    return JSON.parse(localStorage.getItem(PLUGIN_POSITION_KEY));
}

const setPluginsPosition = positions => {

    localStorage.setItem(PLUGIN_POSITION_KEY, JSON.stringify(positions));
}

const grid = GridStack.init({
      alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
});

grid.on('change', (event, itme) => {
    const positions = Array.from(document.getElementsByClassName('grid-stack-item')).map(element => ({
        x: element.getAttribute('gs-x'),
        y: element.getAttribute('gs-y'),
        w: element.getAttribute('gs-w'),
        h: element.getAttribute('gs-h'),
    }));

    setPluginsPosition(positions);
});
