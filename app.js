const loader = require('../plugin/loader');

const initiate = () => {

    const plugins = loader.load();

    Promise.all(plugins.map( async plugin => {

        plugin.initialize().then(() => {

            plugin.render().then(renderedPlugin => {

                muuriAdd(renderedPlugin);
                
                plugin.script().then(() =>
    
                    console.log("Finished executing " + plugin.constructor.name)
                );
            });
        });
    
    }));
}

initiate();