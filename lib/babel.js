
// transform JSX to intermediate function call
const transform = (filepath, outputpath, callback) => {

    exec(`npx babel ${filepath} ${outputpath}`, (err, stdout, stderr) => {
     
        if (err)
            console.log(`stdout ${stdout}\nstderr ${stderr}\nerror ${err}`);

        callback();
    });
    
}

module.exports = {
    transform: transform,
};