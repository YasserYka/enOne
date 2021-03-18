const { loadWidget } = require("../../src/loader");
const { resolve } = require("path");

jest.mock('fs');

beforeAll(() => {

    jest.mock(resolve(__dirname + '/../../enOne-widgets/widgets/testWidget/config.json'), () => ({author:"AuthorName", verion:"1.0"}), { virtual: true });
    jest.mock(resolve(__dirname + '/../../enOne-widgets/widgets/testWidget/compiled.js'), () => {

        return class testWidget {
            async initialize() {}
            async render() {return 'return h("div", {class: "card mt-2 shadow text-center"});'}
            async script() {}   
        }
    }, { virtual: true });
    jest.mock(resolve(__dirname + '/../../enOne-widgets/widgets/testWidget/index.js'), () => {

        return class testWidget {
            async initialize() {}
            async render() {return '<div class="card mt-2 shadow text-center"></div>'}
            async script() {}   
        }
    }, { virtual: true });
})

beforeEach(() => {

    require('fs').__setMockedFiles({
        [resolve(__dirname + '/../../enOne-widgets/widgets/testWidget/config.json')]: true,
        [resolve(__dirname + '/../../enOne-widgets/widgets/testWidget/compiled.js')]: true,
        [resolve(__dirname + '/../../enOne-widgets/widgets/testWidget/index.js')]: true,
    });
});

describe("Load widget function", () => {

    test("Successfully load existing widget", () => {
       
        const widget = loadWidget(resolve(__dirname + '/../../enOne-widgets/widgets'), "testWidget");
               
        expect(widget.constructor.name).toBe("Widget");
        expect(widget.object.constructor.name).toBe("testWidget");
        expect(widget.name).toBe("testWidget");
        expect(widget.config).toMatchObject({author:"AuthorName", verion:"1.0"});

    });
    
});