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
const serializeGrid = (grid) => {
  const serializedGrid = JSON.stringify(
    muuriGrid.getItems().map((item) => {
      return item.getElement().getAttribute("data-id");
    })
  );

  window.localStorage.setItem("layout", serializedGrid);
};

// to wrap plugin to make them draggable
const wrapGridItem = (element, id) => {
  const item = document.createElement("div");

  item.className = "item";
  item.id = "widget_#" + id;

  const itemcontent = document.createElement("div");
  itemcontent.className = "item-content";
  itemcontent.appendChild(element);

  item.appendChild(itemcontent);

  return item;
};

const addGridItem = (element, id) => {
  let wrappedElement = wrapGridItem(element, id);

  muuriGrid.add(wrappedElement);

  return wrappedElement;
};

const removeGridItem = id => {
  
  muuriGrid.remove(muuriGrid.getItems().filter(item => item.getElement().id == id), { removeElements: true });
};

const refreshGrid = () => {

  muuriGrid.refreshItems().layout();
};
