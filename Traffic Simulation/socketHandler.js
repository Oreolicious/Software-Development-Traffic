class socketHandler {
  constructor(host, port, trafficLights) {
    let socket = new WebSocket("ws://127.0.0.1:9999", 9999);
    trafficLights = trafficLights;
    socket.onopen = () => {
      socket.send(JSON.stringify({
        type: "connect",
        host: host,
        port: port
      }));

      function sendInfo() {
        let trafficSituation = {}
        trafficLights.forEach((light) => {
          trafficSituation[light.name] = light.hasObject ? 1 : 0;
        });
        let sendString = JSON.stringify(trafficSituation)
        socket.send(JSON.stringify({
          type: "data",
          payload: String(sendString.length) + ":" + JSON.stringify(trafficSituation)
        }))
        setTimeout(sendInfo, 1000)
      }
      sendInfo();
      socket.onmessage = (evt) => {
        let data = JSON.parse(evt.data)["payload"]
        data = data.substring(0, data.length)
        while (data[0] != "{" && data.length > 0) {
          data = data.substring(1)
        }
        console.log(data)
        let dataJson = JSON.parse(data)
        trafficLights.forEach((light) => {
          if (dataJson[light.name] || !dataJson[light.name]) {
            light.update(dataJson[light.name], light.name)
          }
        })
      }
    }
  }
}