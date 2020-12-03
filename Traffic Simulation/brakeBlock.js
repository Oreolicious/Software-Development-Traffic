import {
    OBB
} from "./OBB.js";

function rotateAroundPoint(center, point, angle) {
    angle = angle * (Math.PI / 180);
    return new Vector2D(Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y - center.y) + center.x,
        Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y)
}

class brakeBlock {
    constructor(parent, xOffset, yOffset, sizeX, sizeY, scene) {
        this.parent = parent
        this.scene = scene;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        const geometry = new THREE.BoxBufferGeometry(sizeX, sizeY, 0.25);
        geometry.userData.obb = new OBB();
        geometry.userData.obb.halfSize.copy(new THREE.Vector3(sizeX, sizeY, 0.25)).multiplyScalar(0.5);
        const material = new THREE.MeshBasicMaterial({
            color: 0xff0000
        });
        this.block = new THREE.Mesh(geometry, material);
        this.block.matrixAutoUpdate = false;
        const position = rotateAroundPoint(parent.position, new Vector2D(parent.position.x + xOffset, parent.position.y + yOffset), parent.rotation.z / (Math.PI / 180))
        this.block.position.x = position.x;
        this.block.position.y = position.y;
        this.block.userData.obb = new OBB();
        //scene.add(this.block);
    }
    update() {
        const position = rotateAroundPoint(this.parent.position, new Vector2D(this.parent.position.x + this.xOffset, this.parent.position.y + this.yOffset), this.parent.rotation.z / (Math.PI / 180))
        this.block.position.x = position.x;
        this.block.position.y = position.y;
        this.block.rotation.z = this.parent.rotation.z;
        this.block.updateMatrix();
        this.block.updateMatrixWorld();
        this.block.userData.obb.copy(this.block.geometry.userData.obb);
        this.block.userData.obb.applyMatrix4(this.block.matrixWorld);
    }
    checkColliding(obbToTest) {
        return this.block.userData.obb.intersectsOBB(obbToTest)
    }
    destroy() {
        this.block.name = 'id' + (new Date()).getTime();
        let selectedObject = this.scene.getObjectByName(this.block.name);
        this.scene.remove(selectedObject);
    }
}

export {
    brakeBlock
}