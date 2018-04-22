import Serializer from 'lance/serialize/Serializer';
//import DynamicObject from 'lance/serialize/DynamicObject';
import Renderer from '../client/MyRenderer';
import TwoVector from 'lance/serialize/TwoVector';
import PhysicalObject2D from './PhysicalObject2D';

//export default class Missile extends DynamicObject {
export default class Missile extends PhysicalObject2D {    

    constructor(gameEngine, options, props){
        super(gameEngine, options, props);
        
    }

    // this is what allows usage of shadow object with input-created objects (missiles)
    // see https://medium.com/javascript-multiplayer-gamedev/chronicles-of-the-development-of-a-multiplayer-game-part-2-loops-and-leaks-10b453e843e0
    // in the future this will probably be embodied in a component

    static get netScheme() {
        return Object.assign({
            inputId: { type: Serializer.TYPES.INT32 }
        }, super.netScheme);
    }

    onAddToWorld(gameEngine) {
        //console.log("gameEngine this.position",this.position);
        this.createBodyPhysics();

        let renderer = Renderer.getInstance();
        if (renderer) {
            let scene = renderer.getScene();//get current index scenes
            let sprite = scene.add.image(10, 10, 'shot');
            renderer.sprites[this.id] = sprite; //assign id for render sprites array
            sprite.x = this.position.x;
            sprite.y = this.position.y;
        }
    }

    createBodyPhysics(){
        let p2 = this.gameEngine.physicsEngine.p2;
        // Create an empty dynamic body
        this.physicsObj = new p2.Body({
            mass: 1,
            position: [this.position.x, this.position.y]
            //position: [0, 0]
        });
        //console.log(this.physicsObj);
        //console.log(this.physicsObj.position);
        this.physicsObj.gameObject = this;
        
        // Add a circle shape to the body
        // Create circle sensor
        let circleShape = new p2.Circle({ radius: 5 });
        circleShape.sensor = true;
        this.physicsObj.addShape(circleShape);
        //console.log(this.angle);
        
        let rad = this.angle;
        let dv = new TwoVector();
        dv.set(Math.cos(rad), Math.sin(rad)).multiplyScalar(400);
        
        //console.log(dv);

        // ...and add the body to the world.
        // If we don't add it to the world, it won't be simulated.
        //this.gameEngine.physicsEngine.world.addBody(this.physicsObj);
        this.gameEngine.physicsEngine.addBody(this.physicsObj);

        this.physicsObj.velocity[0] = dv.x;
        this.physicsObj.velocity[1] = dv.y;
    }

    onRemoveFromWorld(gameEngine) {
        let renderer = Renderer.getInstance();
        if (renderer && renderer.sprites[this.id]) {
            renderer.sprites[this.id].destroy();
            delete renderer.sprites[this.id];
        }

        if(this.physicsObj){
            this.gameEngine.physicsEngine.removeObject(this.physicsObj);
        }
    }

    syncTo(other) {
        super.syncTo(other);
        this.inputId = other.inputId;
        if (this.physicsObj)
            this.refreshToPhysics();
    }

    // update position, quaternion, and velocity from new physical state.
    //refreshFromPhysics() {
        //2D
        //this.position.set(this.physicsObj.position[0],this.physicsObj.position[1]);
        //this.position.set(this.physicsObj.position[0],this.physicsObj.position[1]);
        //this.angle = this.physicsObj.angle;
        //this.velocity.x = this.physicsObj.velocity.x;
        //this.velocity.y = this.physicsObj.velocity.y;
        //console.log(this.physicsObj.angle);
        //console.log("sync?");
    //}

    // update position, quaternion, and velocity from new physical state.
    //refreshToPhysics() {
        //2D setup needed
        //console.log("refreshToPhysics");
        //this.physicsObj.position[0] = this.position.x;
        //this.physicsObj.position[1] = this.position.y;
        //this.physicsObj.angle = this.angle;
        //this.physicsObj.velocity.x = this.velocity.x;
        //this.physicsObj.velocity.y = this.velocity.y;
    //}
}