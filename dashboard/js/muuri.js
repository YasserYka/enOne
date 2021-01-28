
const grid = new Muuri(".grid", {
  dragEnabled: true,
  layout: {
    fillGaps: true,
  },
  dragStartPredicate: {
    distance: 100,
    delay: 100,
  },
});

function storeGrid(grid) {
    const serializedGrid = JSON.stringify(grid.getItems().map((item) => {
        return item.getElement().getAttribute('data-id');
    }));

    window.localStorage.setItem('layout', serializedGrid); 
}