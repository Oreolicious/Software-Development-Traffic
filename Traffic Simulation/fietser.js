import {
    OBB
} from "./OBB.js"
import {
    brakeBlock
} from "./brakeBlock.js"

class Fietser {
    constructor(x, y, zRotation, scene) {
        this.object = this.createobject();
        this.object.matrixAutoUpdate = false;
        this.object.userData.obb = new OBB();
        this.scene = scene;
        scene.add(this.object);
        this.brakeZone = new brakeBlock(this.object, -0.4, 0, 1.5, 0.8, scene);
        this.state = "driving"
        this.maxSpeed = 5
        this.currentDirection = new Vector2D(0, 1);
        this.point = this.currentDirection;
        this.currentSpeed = 0.0;
        this.brakeZone.update();
        this.brakingForLight = false;
        this.lights = [];
        this.destroyed = false;
    }
    createobject() {
        const geometry = new THREE.BoxBufferGeometry(1.5, 0.2, 0.5);
        geometry.userData.obb = new OBB();
        geometry.userData.obb.halfSize.copy(new THREE.Vector3(1.5, 0.2, 0.5)).multiplyScalar(0.5);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffff00
        });
        return new THREE.Mesh(geometry, material);
    }
    updatePoint(point) {
        this.point = point;
    }
    updateDirection(direction) {
        direction.normalize();
        this.currentDirection = direction;
    }
    update(delta) {
        switch (this.state) {
            case "driving":
                if (this.currentSpeed < this.maxSpeed) {
                    this.currentSpeed += 3 * delta
                }
                break;
            case "braking":
                if (this.currentSpeed > 0) {
                    this.currentSpeed -= 60 * delta
                } else if (this.currentSpeed < 0) {
                    this.currentSpeed = 0;
                } else {
                    this.state = "idle"
                }
                break;
            case "idle":
                if (this.currentSpeed < 0) {
                    this.currentSpeed = 0;
                }
                return;
            default:
                return;
        }
        this.currentDirection.normalize()
        this.object.position.x += this.currentDirection.x * (this.currentSpeed * delta);
        this.object.position.y += this.currentDirection.y * (this.currentSpeed * delta);
        this.currentDirection.moveToward(this.point, this.object.position, 0.2)

        this.object.setRotationFromEuler(new THREE.Euler(0, 0, Math.atan2(this.currentDirection.y, this.currentDirection.x), 'XYZ'));

        this.brakeZone.update();
        this.object.updateMatrix();
        this.object.updateMatrixWorld();
        this.object.userData.obb.copy(this.object.geometry.userData.obb);
        this.object.userData.obb.applyMatrix4(this.object.matrixWorld);
    }
    destroy() {
        this.destroyed = true;
        this.object.name = 'id' + (new Date()).getTime();
        let selectedObject = this.scene.getObjectByName(this.object.name);
        this.scene.remove(selectedObject);
        this.brakeZone.destroy()
    }
}

export {
    Fietser
}