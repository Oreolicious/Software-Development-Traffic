const socket = new WebSocket("ws://127.0.0.1:9999", 9999);
let lightstatus = false;
let statusChanged = false;
socket.onopen = () => {
  socket.send(JSON.stringify({
    type: "connect",
    host: "127.0.0.1",
    port: 54000
  }));  
  setTimeout(function(){
    socket.send(JSON.stringify({
      type: "data",
      payload: '451:{"A1-1":1,"A1-2":0,"A1-3":0,"A2-1":0,"A2-2":0,"A2-3":0,"A2-4":0,"A3-1":0,"A3-2":0,"A3-3":0,"A3-4":0,"A4-1":0,"A4-2":0,"A4-3":0,"A4-4":0,"A5-1":0,"A5-2":0,"A5-3":0,"A5-4":0,"A6-1":0,"A6-2":0,"A6-3":0,"A6-4":0,"B1-1":0,"B1-2":0,"B4-1":0,"F1-1":0,"F1-2":0,"F2-1":0,"F2-2":0,"F4-1":0,"F4-2":0,"F5-1":0,"F5-2":0,"V1-1":0,"V1-2":0,"V1-3":0,"V1-4":0,"V2-1":0,"V2-2":0,"V2-3":0,"V2-4":0,"V4-1":0,"V4-2":0,"V4-3":0,"V4-4":0,"V5-1":0,"V5-2":0,"V5-3":0,"V5-4":0}'
    }));  
  }, 10000);
  socket.onmessage = (evt) => {
    console.log("message received")
    data = JSON.parse(evt.data)["payload"]
    data = data.substring(0, data.length-1)
    while(data[0] != "{" && data.length > 0){
      data = data.substring(1)
    }
    let dataJson = JSON.parse(data)
    if(dataJson["A1-1"] == 0){
      console.log("set status to false")
      lightstatus = false;
    } else {
      console.log("set status to true")
      lightstatus = true;
    }
    statusChanged = true;
  }
}
createCar = (scene) => {
  const geometry = new THREE.BoxGeometry(2.2, 1.2, 0.5);
  const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
  const car = new THREE.Mesh( geometry, material );
  car.position.x = -10;
  scene.add(car);
  return car;
}
window.addEventListener("load", function () {
  cars = [];
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const trafficLightGeometry = new THREE.BoxGeometry(0.2, 2, 0.1);
  const trafficLightMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  const trafficLight = new THREE.Mesh( trafficLightGeometry, trafficLightMaterial );
  scene.add(trafficLight)
  
  cars.push(createCar(scene))
  
  camera.position.z = 5;
  
  const animate = function () {
      requestAnimationFrame( animate );
      if(statusChanged){
        if(lightstatus){
          trafficLight.material.color.setHex( 0x00ff00 )
        } else {
          trafficLight.material.color.setHex( 0xff0000 )
        }
      }
      cars.forEach(car => {
        if(car.position.x + 2 > 0 && car.position.x + 2 < 0.1 && !lightstatus){

        } else {
          if(car.position.x > 10){
            cars.push(createCar(scene))
            scene.remove(car)
            cars.splice(cars.indexOf(car), 1)
          }
          car.position.x += 0.05
        }
      });
  
      renderer.render( scene, camera );
  };
  
  animate();
});