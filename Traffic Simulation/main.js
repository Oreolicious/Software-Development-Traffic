import {
  trafficLight
} from "./trafficLight.js";
import {
  smallTrafficLight
} from "./smallTrafficLight.js";
import {
  Car
} from "./car.js";
import {
  Fietser
} from "./fietser.js";
import {
  Bus
} from "./bus.js";
import {
  Voetganger
} from "./voetganger.js"
import {
  busTrafficLight
} from "./trafficLightBus.js"
import * as layouts from "./layouts.js"


const createCar = (scene) => {
  let car = new Car(0, 0, 0, scene);
  return car;
}

const createFietser = (scene) => {
  let fietser = new Fietser(0, 0, 0, scene);
  return fietser;
}

const createVoetganger = (scene) => {
  let voetganger = new Voetganger(0, 0, 0, scene);
  return voetganger;
}

const createBus = (scene) => {
  let bus = new Bus(0, 0, 0, scene);
  return bus;
}
window.addEventListener("load", function () {
  let cars = [];
  let fietsers = [];
  let busses = [];
  let voetgangers = [];
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var trafficLightDic = {
    "A1-": 3,
    "A2-": 4,
    "A3-": 4,
    "A4-": 4,
    "A5-": 4,
    "A6-": 4
  };

  //A1 through A6 ascending
  let trafficLightX = [21.32, 23.82, 26.32, 44.72, 44.72, 44.72, 44.72, 22.72, 22.72, 22.72, 22.72, -28.68, -26.18, -23.68, -21.18, -44.61, -44.61, -44.61, -44.61, -22.5, -22.5, -22.5, -22.6];
  let trafficLightY = [22.75, 22.75, 22.75, 14.93, 12.43, 9.93, 7.43, -2.55, -5.05, -7.55, -10.05, -22.77, -22.77, -22.77, -22.77, -7.5, -10, -12.5, -15, 10, 7.5, 5, 2.5];
  let trafficLightRot = [0, 0, 0, 270, 270, 270, 270, 90, 90, 90, 90, 180, 180, 180, 180, 90, 90, 90, 90, 270, 270, 270, 270];

  let trafficLights = [];

  let trafficLightNr = 0;
  for (var key in trafficLightDic) {
    let value = trafficLightDic[key];
    for (let i = 0; i < value; i++) {
      trafficLights.push(new trafficLight(String(key + (i + 1)), trafficLightX[trafficLightNr], trafficLightY[trafficLightNr], trafficLightRot[trafficLightNr], scene))
      trafficLightNr++;
    }
  }

  var trafficLightNotCarDic = {
    "V1-": 4,
    "V2-": 4,
    "V4-": 4,
    "V5-": 4,
    "F1-": 2,
    "F2-": 2,
    "F4-": 2,
    "F5-": 2
  };

  let trafficLightNotCarX = [19.2, 30.5, 32.05, 38.4, 42.3, 42.3, 42.3, 42.3, -38.25, -31.95, -30.35, -16.55, -42.2, -42.2, -42.2, -42.2, 19.2, 38.4, 41.3, 41.3, -38.25, -16.55, -41.2, -41.2];
  let trafficLightNotCarY = [20.4, 20.4, 20.4, 20.375, 17.125, 5.45, -5.4, -12.1, -20.45, -20.45, -20.45, -20.45, 12.05, 5.3, -5.5, -17, 19.4, 19.4, 17.125, -12.1, -19.45, -19.45, 12.05, -17];
  let trafficLightNotCarRot = [90, 270, 90, 270, 0, 180, 0, 180, 90, 270, 90, 270, 0, 180, 0, 180, 90, 270, 0, 180, 90, 270, 0, 180];

  let trafficLightNotCarNr = 0;
  for (var key in trafficLightNotCarDic) {
    let value = trafficLightNotCarDic[key];
    for (let i = 0; i < value; i++) {
      trafficLights.push(new smallTrafficLight(String(key + (i + 1)), trafficLightNotCarX[trafficLightNotCarNr], trafficLightNotCarY[trafficLightNotCarNr], trafficLightNotCarRot[trafficLightNotCarNr], scene))
      trafficLightNotCarNr++;
    }
  }

  let trafficLightBusX = [28.25, 29.25, -18.7];
  let trafficLightBusY = [23.3, 23.3, -23.4];
  let trafficLightBusRot = [0, 0, 180];

  var trafficLightBusDic = {
    "B1-": 2,
    "B4-": 1
  }
  let trafficLightBusNr = 0;

  for (var key in trafficLightBusDic) {
    let value = trafficLightBusDic[key];
    for (let i = 0; i < value; i++) {
      trafficLights.push(new busTrafficLight(String(key + (i + 1)), trafficLightBusX[trafficLightBusNr], trafficLightBusY[trafficLightBusNr], trafficLightBusRot[trafficLightBusNr], scene))
      trafficLightBusNr++;
    }
  }

  const geometry = new THREE.PlaneBufferGeometry(1920 / 16, 1080 / 16, 0);
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(
    './textures/EML.png',
  );
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 20, 0);
    scene.add(light);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    const d = 50;
    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 50;
    light.shadow.bias = 0.001;
  }

  {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 2, 4);
    scene.add(light);
  }

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.update();

  camera.position.z = 41;

  const handler = new socketHandler("127.0.0.1", 54000, trafficLights)

  var clock = new THREE.Clock();

  let runUpdate = true;

  let carPaths = layouts.getCarPaths(scene, trafficLights)
  let voetgangerPaths = layouts.getVoetgangerPaths(scene, trafficLights)
  let busPaths = layouts.getBusPaths(scene, trafficLights)
  let fietserPaths = layouts.getFietserPaths(scene, trafficLights)

  function carFunction() {
    runUpdate = false;
    let randomPath = Math.floor(Math.random() * carPaths.length);
    if (carPaths[randomPath].traffic.length < 2) {
      cars.push(createCar(scene))
      carPaths[randomPath].addObject(cars[cars.length - 1]);
    }
    runUpdate = true;
    setTimeout(carFunction, 750);
  }

  function fietserFunction() {
    runUpdate = false;
    let randomPath = Math.floor(Math.random() * fietserPaths.length);
    if (fietserPaths[randomPath].traffic.length < 1) {
      fietsers.push(createFietser(scene))
      fietserPaths[randomPath].addObject(fietsers[fietsers.length - 1]);
    }
    runUpdate = true;
    setTimeout(fietserFunction, 6000);
  }

  function busFunction() {
    runUpdate = false;
    let randomPath = Math.floor(Math.random() * busPaths.length);
    if (busPaths[randomPath].traffic.length < 1) {
      busses.push(createBus(scene))
      busPaths[randomPath].addObject(busses[busses.length - 1]);
    }
    runUpdate = true;
    setTimeout(busFunction, 10000)
  }

  function voetgangerFunction() {
    runUpdate = false;
    let randomPath = Math.floor(Math.random() * voetgangerPaths.length);
    if (voetgangerPaths[randomPath].traffic < 3) {
      voetgangers.push(createVoetganger(scene))
      voetgangerPaths[randomPath].addObject(voetgangers[voetgangers.length - 1])
    }
    runUpdate = true;
    setTimeout(voetgangerFunction, 1000)
  }

  carFunction()
  fietserFunction()
  busFunction()
  voetgangerFunction()

  function handleCarCollisions(lhObject, rhObject, checkLight = true) {
    let check = !checkLight
    lhObject.lights.forEach(light => {
      if (rhObject.lights.includes(light)) {
        check = true;
      }
    })
    if (check === true && !(lhObject.object.uuid === rhObject.object.uuid)) {
      if (rhObject.brakeZone.checkColliding(lhObject.object.userData.obb) === true && lhObject.state === "driving") {
        return true;
      } else {
        return false;
      }
    }
  }

  const animate = function () {
    controls.update();

    if (runUpdate === true) {
      trafficLights.forEach(light => {
        light.hasObject = false;
      })
      const delta = clock.getDelta();
      carPaths.forEach(carPath => {
        carPath.update(cars, delta);
      })
      fietserPaths.forEach(fietserPath => {
        fietserPath.update(fietsers, delta);
      })
      busPaths.forEach(busPath => {
        busPath.update(busses, delta)
      })
      voetgangerPaths.forEach(voetgangerPath => {
        voetgangerPath.update(voetgangers, delta)
      })
      cars.forEach(car => {
        let isColliding = false;
        cars.forEach(oCar => {
          if (handleCarCollisions(car, oCar) === true) {
            isColliding = true;
          }
        })
        busses.forEach(bus => {
          if (handleCarCollisions(car, bus) === true) {
            isColliding = true;
          }
        })
        if (isColliding === true) {
          car.state = "braking"
        } else if (car.state === "idle") {
          car.state = "driving"
        }
      });
      busses.forEach(bus => {
        let isColliding = false;
        cars.forEach(car => {
          if (handleCarCollisions(bus, car) === true) {
            isColliding = true;
          }
        })
        busses.forEach(oBus => {
          if (handleCarCollisions(bus, oBus, false) === true) {
            isColliding = true;
          }
        })
        if (isColliding === true) {
          bus.state = "braking"
        } else if (bus.state === "idle") {
          bus.state = "driving"
        }
      });
    }
    fietsers.forEach(fietser => {
      let isColliding = false;
      fietsers.forEach(ofietser => {
        if (handleCarCollisions(fietser, ofietser, false) === true) {
          isColliding = true;
        }
      })
      if (isColliding === true) {
        fietser.state = "braking"
      } else if (fietser.state === "idle") {
        fietser.state = "driving"
      }
    });
    voetgangers.forEach(voetganger => {
      let isColliding = false;
      voetgangers.forEach(oVoetganger => {
        if (handleCarCollisions(voetganger, oVoetganger) === true) {
          isColliding = true;
        }
      })
      fietsers.forEach(fietser => {
        if (handleCarCollisions(voetganger, fietser, false) === true) {
          isColliding = true;
        }
      });
      if (isColliding === true) {
        voetganger.state = "braking"
      } else if (voetganger.state === "idle") {
        voetganger.state = "driving"
      }
    })


    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  };

  animate();
});