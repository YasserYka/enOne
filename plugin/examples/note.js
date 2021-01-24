const h = require('vhtml');

console.log(h("div", {
  class: "foo"
}, h("h1", null, "Hi!"), h("ul", null)));