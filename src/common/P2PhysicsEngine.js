import PhysicsEngine from 'lance/physics/PhysicsEngine';
//import 'phaser/src/physics/impact/index';
//import PhaserArcade from './PhaserArcade';
//console.log(this);
//console.log(PhaserArcade);

import p2 from 'p2';

export default class P2PhysicsEngine extends PhysicsEngine {
    constructor(options) {
        super(options);
        
        this.options.dt = this.options.dt || (1 / 60);
        this.p2 = p2;

        let world = this.world = new p2.World({
            //gravity:[0, -9.82]
            gravity:[0, 0]
        });

        //console.log(world);
        //console.log("p2 Physics");
        this.fixedTimeStep = 1 / 60; // seconds
        this.maxSubSteps = 10; // Max sub steps to catch up with the wall clock
        this.lastTime;

        world.on('postStep', (event)=>{
            this.postStep(event);
        });

        world.on("beginContact",(event)=>{
            //removeBody = event.bodyA;
            this.beginContact(event);
        });
    }

    postStep(event){
        //
        //console.log("postStep");
    }

    beginContact(event){
        //removeBody = event.bodyA;
        //console.log(event.bodyA);
        //console.log(event.bodyB);
        //gameObject is from class ship and missile assign
        let o1 = event.bodyA.gameObject;
        let o2 = event.bodyB.gameObject;
        // make sure that objects actually exist. might have been destroyed
        if (!o1 || !o2) return;
        this.gameEngine.emit('collisionStart', { o1, o2 });
    }

    addCircle(){
        // Create an empty dynamic body
        let circleBody = new this.p2.Body({
            mass: 5,
            position: [0, 10]
        });

        // Add a circle shape to the body
        let circleShape = new this.p2.Circle({ radius: 1 });
        circleBody.addShape(circleShape);

        // ...and add the body to the world.
        // If we don't add it to the world, it won't be simulated.
        this.world.addBody(circleBody);

        return circleBody;
    }

    addPlane(){
        // Create an infinite ground plane body
        let groundBody = new this.p2.Body({
            mass: 0 // Setting mass to 0 makes it static
        });
        let groundShape = new this.p2.Plane();
        groundBody.addShape(groundShape);
        this.world.addBody(groundBody);

        return groundBody;
    }

    // entry point for a single step of the Simple Physics
    step(dt, objectFilter) {
        //this.world.step(dt || this.options.dt);
        // Compute elapsed time since last render frame
        //let deltaTime = this.lastTime ? (dt - this.lastTime) / 1000 : 0;
        //this.world.step(this.fixedTimeStep, deltaTime, this.maxSubSteps);
        //this.lastTime = dt;
        let deta = dt || this.options.dt;
        //console.log(deta);
        this.world.step(deta);
        //console.log("step!");
    }

    addBody(obj){
        this.world.addBody(obj);
    }

    removeObject(obj) {
        //this.world.removeBody(obj);
        //this.World.remove(obj);
        this.world.removeBody(obj);
    }
}