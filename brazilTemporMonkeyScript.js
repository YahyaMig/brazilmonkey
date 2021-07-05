// this function is useless -- could be deleted.
function result(error, stdout, stderr) {
    if (stdout != "")
        console.log('stdout: ' + stdout);
    if (stderr != "")
        console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
        console.log('error status : ' + error.status);
    }
}

/*
This script is to create a workspace with for package.
required args :
    path : where the brazil-workspace needs to be created.
    packageName : the used package for this brazil-workspace.
    versionsetName : the used versionset for this brazil-workspace.

How does it work ?
    - run the required commands to create brazil-workspace.
    - use with this brazil-workspace specified package and versionset.

comments for next BS session :
    - create a for each error, incase this error can be handeled continue the job.
        for example if the brazil-workspace already exists there is no need for you to exit the job.
            you can clone the package on that brazil-workspace.
    - specifiy each error and try to handle it.
    - think of a way to alert the user on your progress.
    - how this be implemented with tempormonkey scripts ?
    - how to send the args to this script ?
    - how this script will exist on the user mac ?
    - how to trigger this script from tempormonkey script ?
    - how would this help the users ?
    - is it worth it ?
*/
function createWorkSpace(path, packageName, versionsetName) {
    let exec = require('child_process').execSync, child;
    try {
        child = exec('cd ' + path + ' && brazil ws create --root ' + packageName, (error, stdout, stderr) => result(error, stdout, stderr));
        child = exec('cd ' + packageName + ' && brazil ws use --package ' + packageName + ' --versionset ' + versionsetName, (error, stdout, stderr) => result(error, stdout, stderr));
    }
    catch (error) {
        console.log("status code : " + error.status);
        console.log("status code : " + error.stderr);
        process.exit(1);
    }
}