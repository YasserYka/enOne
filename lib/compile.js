const { exec } = require('child_process');

// transform JSX to intermediate function
const transform = (filepath, outputpath, callback) => {

    exec(`npx babel ${filepath} -d ${outputpath}`, (err, stdout, stderr) => {
     
        if (err)
            console.log(`stdout ${stdout}\nstderr ${stderr}\nerror ${err}`);

        callback();
    });
    
}

module.exports = {
    transform: transform,
};