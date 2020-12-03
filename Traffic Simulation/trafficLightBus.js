import {
    brakeBlock
} from "./brakeBlock.js"

function rotateAroundPoint(center, point, angle) {
    angle = angle * (Math.PI / 180);
    return new Vector2D(Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y - center.y) + center.x,
        Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y)
}

class busTLight {
    constructor(offColor, onColor, x, y, zRotation, scene) {
        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.05);
        this.light = new THREE.Mesh(geometry, offColor);
        this.light.position.x = x;
        this.light.position.y = y;
        this.light.position.z = 0.25
        this.light.rotation.z = zRotation * (Math.PI / 180);
        scene.add(this.light)
        this.onColor = onColor;
        this.offColor = offColor;
    }
    turnOn() {
        this.light.material = this.onColor;
    }
    turnOff() {
        this.light.material = this.offColor;
    }
}

class busTrafficLight {
    constructor(name, x, y, zRotation, scene) {
        this.isOn = false;
        this.name = name;
        this.lightBlock = this.createBusTrafficLight(x, y, zRotation, scene)
        const redLightPoint1 = rotateAroundPoint(new Vector2D(x, y), new Vector2D(x + 0.3, y), zRotation);
        const redLightPoint2 = rotateAroundPoint(new Vector2D(x, y), new Vector2D(x - 0.3, y), zRotation);
        const topLeft = rotateAroundPoint(new Vector2D(x, y), new Vector2D(x - 0.3, y + 0.3), zRotation);
        const top = rotateAroundPoint(new Vector2D(x, y), new Vector2D(x, y + 0.3), zRotation);
        const topRight = rotateAroundPoint(new Vector2D(x, y), new Vector2D(x + 0.3, y + 0.3), zRotation);
        const bottom = rotateAroundPoint(new Vector2D(x, y), new Vector2D(x, y - 0.3), zRotation);
        const bottomRight = rotateAroundPoint(new Vector2D(x, y), new Vector2D(x + 0.3, y - 0.3), zRotation);
        const bottomLeft = rotateAroundPoint(new Vector2D(x, y), new Vector2D(x - 0.3, y - 0.3), zRotation);
        this.redLight1 = new busTLight(new THREE.MeshBasicMaterial({
            color: 0x280000
        }), new THREE.MeshBasicMaterial({
            color: 0xff0000
        }), redLightPoint1.x, redLightPoint1.y, zRotation, scene);
        this.yellowLight = new busTLight(new THREE.MeshBasicMaterial({
            color: 0x282800
        }), new THREE.MeshBasicMaterial({
            color: 0xffff00
        }), x, y, zRotation, scene);
        this.redLight2 = new busTLight(new THREE.MeshBasicMaterial({
            color: 0x280000
        }), new THREE.MeshBasicMaterial({
            color: 0xff0000
        }), redLightPoint2.x, redLightPoint2.y, zRotation, scene);
        this.topLeft = new busTLight(new THREE.MeshBasicMaterial({
            color: 0x000000
        }), new THREE.MeshBasicMaterial({
            color: 0xFFFFFF
        }), topLeft.x, topLeft.y, zRotation, scene);
        this.top = new busTLight(new THREE.MeshBasicMaterial({
            color: 0x000000
        }), new THREE.MeshBasicMaterial({
            color: 0xFFFFFF
        }), top.x, top.y, zRotation, scene);
        this.topRight = new busTLight(new THREE.MeshBasicMaterial({
            color: 0x000000
        }), new THREE.MeshBasicMaterial({
            color: 0xFFFFFF
        }), topRight.x, topRight.y, zRotation, scene);
        this.bottom = new busTLight(new THREE.MeshBasicMaterial({
            color: 0x000000
        }), new THREE.MeshBasicMaterial({
            color: 0xFFFFFF
        }), bottom.x, bottom.y, zRotation, scene);
        this.bottomRight = new busTLight(new THREE.MeshBasicMaterial({
            color: 0x000000
        }), new THREE.MeshBasicMaterial({
            color: 0xFFFFFF
        }), bottomRight.x, bottomRight.y, zRotation, scene);
        this.bottomLeft = new busTLight(new THREE.MeshBasicMaterial({
            color: 0x000000
        }), new THREE.MeshBasicMaterial({
            color: 0xFFFFFF
        }), bottomLeft.x, bottomLeft.y, zRotation, scene);

        this.redLight1.turnOn();
        this.redLight2.turnOn();
        this.brakeZone = new brakeBlock(this.lightBlock, 0, 2, 2.2, 2, scene);
        this.brakeZone.update()
    }
    createBusTrafficLight(x, y, zRotation, scene) {

        const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.125);
        const material = new THREE.MeshBasicMaterial({
            color: 0x292929
        });
        let light = new THREE.Mesh(geometry, material);
        scene.add(light);
        light.position.x = x;
        light.position.y = y;
        light.position.z = 0.125
        light.rotation.z = zRotation * (Math.PI / 180);
        return light;
    }
    createBusLights(x, y, zRotation, scene) {
        let lights = [];
        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.10);
        const material = new THREE.MeshBasicMaterial({
            color: 0x484800
        });
        let light = new THREE.Mesh(geometry, material);
        light.position.x = x;
        light.position.y = y;
        light.position.z = 0.25
        scene.add(light)
    }
    update(num, name) {
        const newState = Boolean(num);
        if (this.isOn === true && newState === false) {
            this.isOn = false;
            this.yellowLight.turnOn();
            this.bottom.turnOff();
            this.bottomLeft.turnOff();
            this.bottomRight.turnOff();
            this.top.turnOff();
            this.topLeft.turnOff();
            this.topRight.turnOff();
            setTimeout(() => {
                this.yellowLight.turnOff();
                this.redLight1.turnOn();
                this.redLight2.turnOn();
            }, 3000)
        } else if (this.isOn === false && newState === true && (name == "B1-1" || name == "B4-1")) {
            this.isOn = true;
            this.redLight1.turnOff();
            this.redLight2.turnOff();
            this.topRight.turnOn();
            this.bottomLeft.turnOn();
        } else if (this.isOn === false && newState === true && name == "B1-2") {
            this.isOn = true;
            this.redLight1.turnOff();
            this.redLight2.turnOff();
            this.top.turnOn();
            this.bottom.turnOn();
        }

    }
}

export {
    busTrafficLight
}