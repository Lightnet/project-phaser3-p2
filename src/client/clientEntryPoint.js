/*
 Information: Entry point where game engine and render are setup for game build and connection setup.
*/

//import '../../assets/sass/main.scss';
import querystring from 'query-string';
import MyClientEngine from '../client/MyClientEngine';
import MyGameEngine from '../common/MyGameEngine';

const qsOptions = querystring.parse(location.search);

// default options, overwritten by query-string options
// is sent to both game engine and client engine
const defaults = {
    traceLevel: 1,
    delayInputCount: 3,
    scheduler: 'render-schedule',
    syncOptions: {
        sync: qsOptions.sync || 'extrapolate',
        localObjBending: 0.0,
        remoteObjBending: 0.8,
        bendingIncrements: 6
    },
    //custom settings
    bphysicsdebug:true
    //bphysicsdebug:false
};
let options = Object.assign(defaults, qsOptions);

// create a client engine and a game engine
const gameEngine = new MyGameEngine(options);
const clientEngine = new MyClientEngine(gameEngine, options);
//var bphysicsdebug = true;
//listen document load event to start game renderer and connection.
document.addEventListener('DOMContentLoaded', function(e){
    clientEngine.start();
});

function JoinTest(){
    gameEngine.emit('join');
}
window.JoinTest = JoinTest;

