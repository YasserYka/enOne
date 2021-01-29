const muuriGrid = new Muuri(".grid", {
  dragEnabled: true,
  layout: {
    fillGaps: true,
  },
  dragStartPredicate: {
    distance: 100,
    delay: 100,
  },
});

const muuriSerialize = (grid) => {
  const serializedGrid = JSON.stringify(
    grid.getItems().map((item) => {
      return item.getElement().getAttribute("data-id");
    })
  );

  window.localStorage.setItem("layout", serializedGrid);
};

// to wrap plugin to make them draggable
const muuriWrap = element => {
  const item = document.createElement('div');

  item.className = "item";
  item.innerHTML = `<div class="item-content">${element}</div>`;

  return item;
};

const muuriAdd = element => {

  grid.add(muuriWrap(element));
  grid.refreshItems().layout();
}