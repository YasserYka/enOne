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
    muuriGrid.getItems().map((item) => {
      return item.getElement().getAttribute("data-id");
    })
  );

  window.localStorage.setItem("layout", serializedGrid);
};

// to wrap plugin to make them draggable
const muuriWrap = element => {
  const item = document.createElement('div');

  item.className = "item";

  const itemcontent = document.createElement('div');
  itemcontent.className = "item-content";
  itemcontent.innerHTML = element;

  item.appendChild(itemcontent);

  return item;
};

const muuriAdd = element => {

  let wrappedElement = muuriWrap(element);

  muuriGrid.add(wrappedElement);

  return wrappedElement;
}

const muuriRemove = element => {

  muuriGrid.remove(element);
}

const muuriRefresh = () => {

  muuriGrid.refreshItems().layout();
}