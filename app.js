const loader = require('../plugin/loader');

const initiate = () => {

    const plugins = loader.load();

    Promise.all(plugins.map( async plugin => {

        plugin.initialize().then(() => {

            plugin.render().then(renderedPlugin => {

                let wrappedElement = muuriAdd(renderedPlugin);
                
                observeElement(wrappedElement);

                plugin.script().then(() =>
    
                    console.log("Finished executing " + plugin.constructor.name)
                );
            });
        });
    
    }));
}

initiate();