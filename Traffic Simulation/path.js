class path {
    constructor(pointList, scene, trafficLights) {
        let linePoints = [];
        this.traffic = [];
        this.points = [];
        this.trafficLights = trafficLights;
        pointList.forEach((point) => {
            this.points.push(new pathingNode(point[0], point[1], scene));
            linePoints.push(new THREE.Vector3(point[0], point[1], 0));
        })
        const material = new THREE.LineBasicMaterial({
            color: 0x00ffff
        });
        material.linewidth = 10;
        const geometry = new THREE.BufferGeometry().setFromPoints(linePoints);
        const line = new THREE.Line(geometry, material);
        line.position.z = 0.25;
        //scene.add( line );
    }
    addObject(object) {
        object.object.position.x = this.points[0].toPoint().x
        object.object.position.y = this.points[0].toPoint().y
        object.updatePoint(this.points[0].toPoint())
        object.updateDirection(new Vector2D(this.points[1].x - this.points[0].x, this.points[1].y - this.points[0].y))
        object.currentSpeed = object.maxSpeed;
        this.traffic.push(object);
        this.trafficLights.forEach(light => {
            object.lights.push(light.name)
        })
    }
    update(allobjects, delta) {
        let index = 0;
        this.traffic.forEach(object => {
            if (object.destroyed === true) {
                this.traffic.splice(index, 1)
            }
            index++;
        })
        this.traffic.forEach(object => {
            let colliding = false;
            this.trafficLights.forEach(light => {
                if (light.brakeZone.checkColliding(object.object.userData.obb) === true) {
                    if (!light.isOn) {
                        colliding = true;
                    }
                    light.hasObject = true;
                }
            })
            if (colliding === true && object.state === "driving") {
                object.state = "braking"
                object.brakingForLight = true;
            }
            if (colliding === false && object.state === "idle") {
                object.state = "driving"
                object.brakingForLight = false;
            }
            let objectPoint = object.object.position;
            let followPoint = object.point;
            if (Math.sqrt(Math.pow(objectPoint.x - followPoint.x, 2) + Math.pow(objectPoint.y - followPoint.y, 2)) <= 0.5) {
                for (let index = 0; index < this.points.length; index++) {
                    let point = this.points[index].toPoint()
                    if (point.x == followPoint.x && point.y == followPoint.y) {
                        let newPointIndex = index + 1;
                        if (newPointIndex < this.points.length) {
                            object.updatePoint(this.points[newPointIndex])
                        } else {
                            let allIndex = 0;
                            allobjects.forEach(allobject => {
                                if (allobject.object.uuid === object.object.uuid) {
                                    allobjects = allobjects.splice(allIndex, 1);
                                    allobject.destroy()
                                }
                                allIndex++;
                            })
                        }
                    }
                }
            }
            object.update(delta)
        })
    }
}