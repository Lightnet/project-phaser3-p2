import Serializer from 'lance/serialize/Serializer';
import DynamicObject from 'lance/serialize/DynamicObject';
import Renderer from '../client/MyRenderer';
import TwoVector from 'lance/serialize/TwoVector';

//not build yet...
export default class PhysicalObject2D extends GameObject {

    static get netScheme() {
        return Object.assign({
            playerId: { type: Serializer.TYPES.INT16 },
            position: { type: Serializer.TYPES.CLASSINSTANCE },
            angle: { type: Serializer.TYPES.FLOAT32 },
            velocity: { type: Serializer.TYPES.CLASSINSTANCE },
            angularVelocity: { type: Serializer.TYPES.CLASSINSTANCE }
        }, super.netScheme);
    }

    constructor(gameEngine, options, props) {
        super(gameEngine, options);

        /**
        * ID of player who created this object
        * @member {Number}
        */
        this.playerId = 0;

        this.position = new TwoVector(0, 0);
        this.velocity = new TwoVector(0, 0);

        /**
        * object orientation angle in degrees
        * @member {Number}
        */
        this.angle = 90;




    }

}