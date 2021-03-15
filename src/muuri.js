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

// TODO: broken please fix me );
const muuriSerialize = (grid) => {
  const serializedGrid = JSON.stringify(
    muuriGrid.getItems().map((item) => {
      return item.getElement().getAttribute("data-id");
    })
  );

  window.localStorage.setItem("layout", serializedGrid);
};

// to wrap plugin to make them draggable
const muuriWrap = (element, id) => {
  const item = document.createElement("div");

  item.className = "item";
  item.id = id;

  const itemcontent = document.createElement("div");
  itemcontent.className = "item-content";
  itemcontent.appendChild(element);

  item.appendChild(itemcontent);

  return item;
};

const muuriAdd = (element, id) => {
  let wrappedElement = muuriWrap(element, id);

  muuriGrid.add(wrappedElement);

  return wrappedElement;
};

const muuriRemove = id => {
  
  muuriGrid.remove(muuriGrid.getItems().filter(item => item.getElement().id == id), { removeElements: true });
};

const muuriRefresh = () => {

  muuriGrid.refreshItems().layout();
};
