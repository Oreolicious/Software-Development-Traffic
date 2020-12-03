const trafficLightByName = (name, trafficLights) => {
    let lightByName;
    trafficLights.forEach(light => {
        if (light.name == name) {
            lightByName = light;
        }
    })
    return lightByName;
}

export const getCarPaths = (scene, trafficLights) => {
    let carPaths = [];
    carPaths.push(new path([
        [21.32, 35],
        [21.32, 13],
        [19.8, 10.9],
        [17.32, 10],
        [-60, 10]
    ], scene, [trafficLightByName("A1-1", trafficLights), trafficLightByName("A6-1", trafficLights)])); //A1-1 - A6-1
    carPaths.push(new path([
        [21.32, 35],
        [21.32, 13],
        [20.5, 10.9],
        [19.5, 9.225],
        [17.32, 7.5],
        [-60, 7.5]
    ], scene, [trafficLightByName("A1-1", trafficLights), trafficLightByName("A6-2", trafficLights)])); //A1-1 - A6-2
    carPaths.push(new path([
        [23.82, 35],
        [23.82, 13],
        [23.5, 10.9],
        [23, 9.225],
        [22, 7.55],
        [19, 5.05],
        [-31.5, 5.05],
        [-34, 3.55],
        [-36, 0.55],
        [-36, -35.05]
    ], scene, [trafficLightByName("A1-2", trafficLights), trafficLightByName("A6-3", trafficLights)])); //A1-2 - A6-3
    carPaths.push(new path([
        [23.82, 35],
        [23.82, 13],
        [23.5, 10.9],
        [23, 6.225],
        [22, 4.55],
        [19, 2.55],
        [-31, 2.55],
        [-32.4, 1.8],
        [-33.5, 0],
        [-33.5, -35.05]
    ], scene, [trafficLightByName("A1-2", trafficLights), trafficLightByName("A6-4", trafficLights)])); //A1-2 - A6-4
    carPaths.push(new path([
        [26.32, 35],
        [26.32, -3],
        [26.7, -5],
        [27.5, -7],
        [28.95, -9],
        [32, -10],
        [60, -10]
    ], scene, [trafficLightByName("A1-3", trafficLights)])); //A1-3
    carPaths.push(new path([
        [60, 15],
        [39, 15],
        [37, 16],
        [36.35, 18],
        [36.35, 35]
    ], scene, [trafficLightByName("A2-1", trafficLights)])); //A2-1
    carPaths.push(new path([
        [60, 12.5],
        [39, 12.5],
        [36, 13.5],
        [33.85, 16],
        [33.85, 35]
    ], scene, [trafficLightByName("A2-2", trafficLights)])); //A2-2
    carPaths.push(new path([
        [60, 10],
        [-60, 10]
    ], scene, [trafficLightByName("A2-3", trafficLights), trafficLightByName("A6-1", trafficLights)])); //A2-3 - A6-1
    carPaths.push(new path([
        [60, 10],
        [29, 10],
        [25, 9],
        [22, 8],
        [20, 7.5],
        [-60, 7.5]
    ], scene, [trafficLightByName("A2-3", trafficLights), trafficLightByName("A6-2", trafficLights)])); //A2-3 - A6-2
    carPaths.push(new path([
        [60, 7.5],
        [29, 7.5],
        [25, 6.5],
        [22, 5.5],
        [20, 5.05],
        [-31.5, 5.05],
        [-34, 3.55],
        [-36, 0.55],
        [-36, -35.05]
    ], scene, [trafficLightByName("A2-4", trafficLights), trafficLightByName("A6-3", trafficLights)])); //A2-4 - A6-3
    carPaths.push(new path([
        [60, 7.5],
        [29, 7.5],
        [25, 5],
        [22, 3.5],
        [19, 2.55],
        [-31, 2.55],
        [-32.4, 1.8],
        [-33.5, 0],
        [-33.5, -35.05]
    ], scene, [trafficLightByName("A2-4", trafficLights), trafficLightByName("A6-4", trafficLights)])); //A2-4 - A6-4
    carPaths.push(new path([
        [-28.5, -35.05],
        [-28.5, 5],
        [-30, 7],
        [-32, 7.5],
        [-60, 7.5]
    ], scene, [trafficLightByName("A4-1", trafficLights)])); //A4-1
    carPaths.push(new path([
        [-26, -35.05],
        [-26, 5],
        [-27, 7],
        [-28.5, 8.5],
        [-32, 10.],
        [-60, 10.]
    ], scene, [trafficLightByName("A4-2", trafficLights)])); //A4-2
    carPaths.push(new path([
        [-23.5, -35.05],
        [-23.5, -7],
        [-22.5, -5],
        [-21, -3.5],
        [-19, -2.55],
        [29, -2.55],
        [31, -2],
        [32.5, -1.3],
        [33.85, 1],
        [33.85, 35]
    ], scene, [trafficLightByName("A4-3", trafficLights), trafficLightByName("A3-1", trafficLights)])); //A4-3 - A3-1
    carPaths.push(new path([
        [-23.5, -35.05],
        [-23.5, -12],
        [-23, -10],
        [-22, -8.5],
        [-20.5, -7],
        [-19.3, -5.8],
        [-18, -5.05],
        [29, -5.05],
        [32, -4.4],
        [34.5, -3],
        [36, -1],
        [36.35, 0.5],
        [36.35, 35]
    ], scene, [trafficLightByName("A4-3", trafficLights), trafficLightByName("A3-2", trafficLights)])); //A4-3 - A3-2
    carPaths.push(new path([
        [-21, -35.05],
        [-21, -12],
        [-20.5, -10.5],
        [-19, -9],
        [-17.5, -8],
        [-16, -7.5],
        [60, -7.5]
    ], scene, [trafficLightByName("A4-4", trafficLights), trafficLightByName("A3-3", trafficLights)])); //A4-4 - A3-3
    carPaths.push(new path([
        [-21, -35.05],
        [-21, -12],
        [-20, -11],
        [-19, -10.5],
        [-17.5, -10],
        [-16, -10],
        [60, -10]
    ], scene, [trafficLightByName("A4-4", trafficLights), trafficLightByName("A3-4", trafficLights)])); //A4-4 - A3-4
    carPaths.push(new path([
        [-65, -7.5],
        [-32.5, -7.5],
        [-30, -6.7],
        [-27.5, -6.2],
        [-25, -5.4],
        [-20, -3],
        [-17, -2.55],
        [29, -2.55],
        [31, -2],
        [32.5, -1.3],
        [33.85, 1],
        [33.85, 35]
    ], scene, [trafficLightByName("A5-1", trafficLights), trafficLightByName("A3-1", trafficLights)])); //A5-1 - A3-1
    carPaths.push(new path([
        [-65, -7.5],
        [-32.5, -7.5],
        [-30, -7.5],
        [-27.5, -7],
        [-25, -6.5],
        [-20, -5.05],
        [29, -5.05],
        [32, -4.4],
        [34.5, -3],
        [36, -1],
        [36.35, 0.5],
        [36.35, 35]
    ], scene, [trafficLightByName("A5-1", trafficLights), trafficLightByName("A3-2", trafficLights)])); //A5-1 - A3-2
    carPaths.push(new path([
        [-65, -10],
        [-30, -10],
        [-28, -9.4],
        [-26, -8.9],
        [-24, -8.4],
        [-22, -7.9],
        [-20, -7.5],
        [60, -7.5]
    ], scene, [trafficLightByName("A5-2", trafficLights), trafficLightByName("A3-3", trafficLights)])); //A5-2 - A3-3
    carPaths.push(new path([
        [-65, -10],
        [60, -10]
    ], scene, [trafficLightByName("A5-2", trafficLights), trafficLightByName("A3-4", trafficLights)])); //A5-2 - A3-4
    carPaths.push(new path([
        [-65, -12.5],
        [-40, -12.5],
        [-38, -13],
        [-36, -14],
        [-34, -16],
        [-33.5, -18],
        [-33.5, -35.05]
    ], scene, [trafficLightByName("A5-3", trafficLights)])); //A5-3
    carPaths.push(new path([
        [-65, -15],
        [-40, -15],
        [-37.7, -16],
        [-36, -17],
        [-36, -35.05]
    ], scene, [trafficLightByName("A5-4", trafficLights)])); //A5-4
    return carPaths;
}

export const getVoetgangerPaths = (scene, trafficLights) => {
    let voetgangerPaths = [];
    //Voetganger
    voetgangerPaths.push(new path([
        [-60, 15.85],
        [-42.3, 15.85],
        [-42.3, -20.55],
        [-38.55, -20.55],
        [-16, -20.55],
        [-15, -20.45],
        [-14.5, -20.35],
        [-14, -20.15],
        [-13.6, -19.8],
        [-12.9, -19],
        [-12.55, -18],
        [-12.35, -17],
        [-12, -16.5],
        [-11.55, -16.25],
        [-11.3, -16.2],
        [65, -16.2]
    ], scene, [trafficLightByName("V4-1", trafficLights), trafficLightByName("V4-3", trafficLights), trafficLightByName("V5-1", trafficLights), trafficLightByName("V5-3", trafficLights)])); //Left top - Right Bottom
    voetgangerPaths.push(new path([
        [-16.2, -35.05],
        [-16.2, -20.55],
        [-15, -20.45],
        [-14.5, -20.35],
        [-14, -20.15],
        [-13.6, -19.8],
        [-12.9, -19],
        [-12.55, -18],
        [-12.35, -17],
        [-12, -16.5],
        [-11.55, -16.25],
        [-11.3, -16.2],
        [42.4, -16.2],
        [42.4, 35]
    ], scene, [trafficLightByName("V2-2", trafficLights), trafficLightByName("V2-4", trafficLights)])); //Bottom Right - Top
    voetgangerPaths.push(new path([
        [42.2, 35],
        [42.2, 21.5],
        [40, 20.7],
        [39.5, 20.55],
        [39, 20.5],
        [18, 20.5],
        [17.5, 20.4],
        [16.8, 20.1],
        [16.2, 19.7],
        [15.65, 19],
        [15.4, 18.5],
        [15.2, 17],
        [15.1, 16.8],
        [14.75, 16.4],
        [14.3, 16.2],
        [14, 16.1],
        [-60, 16.1]
    ], scene, [trafficLightByName("V1-2", trafficLights), trafficLightByName("V1-4", trafficLights)])); //Top - Left Top
    voetgangerPaths.push(new path([
        [60, 20.5],
        [18, 20.5],
        [17.5, 20.4],
        [16.8, 20.1],
        [16.2, 19.7],
        [15.65, 19],
        [15.4, 18.5],
        [15.2, 17],
        [15.1, 16.8],
        [14.75, 16.4],
        [14.3, 16.2],
        [14, 16.1],
        [-60, 16.1]
    ], scene, [trafficLightByName("V1-2", trafficLights), trafficLightByName("V1-4", trafficLights)])); //Right Top - Left Top
    voetgangerPaths.push(new path([
        [60, 20.5],
        [43, 20.5],
        [42.2, 17.8],
        [42.2, -15.9],
        [-11.1, -15.9],
        [-11.7, -16.05],
        [-12.3, -16.4],
        [-12.6, -17],
        [-12.8, -17.9],
        [-12.9, -18.4],
        [-13.2, -19],
        [-13.4, -19.3],
        [-13.9, -19.7],
        [-14.5, -20.1],
        [-15, -20.25],
        [-60, -20.25]
    ], scene, [trafficLightByName("V2-1", trafficLights), trafficLightByName("V2-3", trafficLights), trafficLightByName("V4-2", trafficLights), trafficLightByName("V4-4", trafficLights)])); //Right Top - Left Bottom
    voetgangerPaths.push(new path([
        [-38.35, -35],
        [-38.35, -20.55],
        [-16.2, -20.55],
        [-15, -20.45],
        [-14.5, -20.35],
        [-14, -20.15],
        [-13.6, -19.8],
        [-12.9, -19],
        [-12.55, -18],
        [-12.35, -17],
        [-12, -16.5],
        [-11.55, -16.25],
        [-11.3, -16.2],
        [42.4, -16.2],
        [42.4, 17.8],
        [43.5, 20.3],
        [60, 20.3]
    ], scene, [trafficLightByName("V2-2", trafficLights), trafficLightByName("V2-4", trafficLights), trafficLightByName("V4-1", trafficLights), trafficLightByName("V4-3", trafficLights)])); //Bottom left - Right top
    voetgangerPaths.push(new path([
        [-60, -20.55],
        [-42.1, -20.55],
        [-42.1, 15.85],
        [13.8, 15.85],
        [14.5, 16.05],
        [15, 16.3],
        [15.4, 17],
        [15.6, 18],
        [15.8, 18.6],
        [16, 19],
        [16.35, 19.5],
        [17.1, 20],
        [17.7, 20.2],
        [18, 20.3],
        [60, 20.3]
    ], scene, [trafficLightByName("V5-2", trafficLights), trafficLightByName("V5-4", trafficLights), trafficLightByName("V1-1", trafficLights), trafficLightByName("V1-3", trafficLights)])); //Left Bottom - Right Top
    return voetgangerPaths;
}
export const getFietserPaths = (scene, trafficLights) => {
    let fietserPaths = [];
    //Fietser
    fietserPaths.push(new path([
        [-60, 14.7],
        [14, 14.7],
        [15, 15],
        [15.8, 15.5],
        [16.3, 16],
        [16.7, 17],
        [16.75, 17.8],
        [17, 18.4],
        [17.5, 18.9],
        [18, 19.1],
        [60, 19.1]
    ], scene, [trafficLightByName("F1-1", trafficLights)])); //Left Top - Right Top
    fietserPaths.push(new path([
        [60, 19.7],
        [18, 19.7],
        [17.5, 19.6],
        [17, 19.4],
        [16.7, 19.2],
        [16.3, 18.7],
        [16, 17.5],
        [15.9, 17],
        [15.7, 16.5],
        [15.4, 16],
        [14.9, 15.6],
        [14.2, 15.3],
        [-60, 15.3]
    ], scene, [trafficLightByName("F1-2", trafficLights)])); //Right Top - Left Top
    fietserPaths.push(new path([
        [60, 19.7],
        [18, 19.7],
        [17.5, 19.6],
        [17, 19.4],
        [16.7, 19.2],
        [16.3, 18.7],
        [16, 17.5],
        [15.9, 17],
        [15.7, 16.5],
        [15.4, 16],
        [14.9, 15.6],
        [14.2, 15.3],
        [-40, 15.3],
        [-40.5, 15.1],
        [-41, 14.8],
        [-41.5, 14.2],
        [-41.5, -18],
        [-42, -18.7],
        [-42.5, -19],
        [-43, -19.2],
        [-60, -19.2]
    ], scene, [trafficLightByName("F1-2", trafficLights), trafficLightByName("F5-1", trafficLights)])); //Right Top - Left Bottom
    fietserPaths.push(new path([
        [-60, 14.7],
        [14, 14.7],
        [15, 15],
        [15.8, 15.5],
        [16.3, 16],
        [16.7, 17],
        [16.75, 17.8],
        [17, 18.4],
        [17.5, 18.9],
        [18, 19.1],
        [40, 19.1],
        [40.7, 19.6],
        [41.3, 20.1],
        [41.6, 21],
        [41.6, 35]
    ], scene, [trafficLightByName("F1-1", trafficLights)])); //Left Top - Top
    fietserPaths.push(new path([
        [-60, 14.7],
        [14, 14.7],
        [15, 15],
        [15.8, 15.5],
        [16.3, 16],
        [16.7, 17],
        [16.75, 17.8],
        [17, 18.4],
        [17.5, 18.9],
        [18, 19.1],
        [40, 19.1],
        [40.7, 18.5],
        [40.9, 17.9],
        [41, 17.5],
        [41, -13],
        [41.2, -14],
        [42, -15],
        [43, -15.3],
        [65, -15.3]
    ], scene, [trafficLightByName("F1-1", trafficLights), trafficLightByName("F2-1", trafficLights)])); //Left Top - Right Bottom
    fietserPaths.push(new path([
        [-60, -19.8],
        [-15, -19.8],
        [-14.3, -19.6],
        [-13.7, -19],
        [-13.4, -18.5],
        [-13.2, -17.6],
        [-13.1, -17],
        [-12.6, -16],
        [-12.2, -15.7],
        [-11.5, -15.3],
        [65, -15.3]
    ], scene, [trafficLightByName("F4-1", trafficLights)])); //Left Bottom - Right Bottom
    fietserPaths.push(new path([
        [-60, -19.8],
        [-15, -19.8],
        [-14.3, -19.6],
        [-13.7, -19],
        [-13.4, -18.5],
        [-13.2, -17.6],
        [-13.1, -17],
        [-12.6, -16],
        [-12.2, -15.7],
        [-11.5, -15.3],
        [40, -15.3],
        [40.5, -15],
        [41, -14.5],
        [41.3, -14],
        [41.6, -13],
        [41.6, 35]
    ], scene, [trafficLightByName("F4-1", trafficLights), trafficLightByName("F2-2", trafficLights)])); //Left Bottom - Top
    fietserPaths.push(new path([
        [-60, -19.8],
        [-15, -19.8],
        [-14.3, -19.6],
        [-13.7, -19],
        [-13.4, -18.5],
        [-13.2, -17.6],
        [-13.1, -17],
        [-12.6, -16],
        [-12.2, -15.7],
        [-11.5, -15.3],
        [40, -15.3],
        [40.5, -15],
        [41, -14.5],
        [41.3, -14],
        [41.6, -13],
        [41.6, 17.5],
        [42, 18.5],
        [42.6, 19.1],
        [60, 19.1]
    ], scene, [trafficLightByName("F4-1", trafficLights), trafficLightByName("F2-2", trafficLights)])); //Left Bottom - Right Top
    fietserPaths.push(new path([
        [65, -14.8],
        [-11.5, -14.8],
        [-12.3, -15],
        [-13, -15.5],
        [-13.5, -16],
        [-13.9, -17],
        [-14, -17.8],
        [-14.1, -18.3],
        [-14.5, -18.7],
        [-15.3, -19.2],
        [-60, -19.2]
    ], scene, [trafficLightByName("F4-2", trafficLights)])); //Right Bottom - Left Bottom
    fietserPaths.push(new path([
        [65, -14.8],
        [-11.5, -14.8],
        [-12.3, -15],
        [-13, -15.5],
        [-13.5, -16],
        [-13.9, -17],
        [-14, -17.8],
        [-14.1, -18.3],
        [-14.5, -18.7],
        [-15.3, -19.2],
        [-39.5, -19.2],
        [-40, -19],
        [-40.7, -18.5],
        [-41, -18],
        [-41, 14.3],
        [-41.4, 14.7],
        [-42, 15],
        [-43, 15.3],
        [-60, 15.3]
    ], scene, [trafficLightByName("F4-2", trafficLights), trafficLightByName("F5-2", trafficLights)])); //Right Bottom - Left Top
    fietserPaths.push(new path([
        [65, -14.8],
        [43, -14.8],
        [42.3, -14.5],
        [41.6, -13],
        [41.6, 35]
    ], scene, [trafficLightByName("F2-2", trafficLights)])); //Right Bottom - Top
    fietserPaths.push(new path([
        [41, 35],
        [41, 17.5],
        [41, -13],
        [41.2, -14],
        [42, -15],
        [43, -15.3],
        [65, -15.3]
    ], scene, [trafficLightByName("F2-1", trafficLights)])); //Top - Right Bottom
    fietserPaths.push(new path([
        [41, 35],
        [41, -13],
        [40.8, -13.9],
        [40.5, -14.5],
        [40, -14.7],
        [39, -14.8],
        [-11.5, -14.8],
        [-12.3, -15],
        [-13, -15.5],
        [-13.5, -16],
        [-13.9, -17],
        [-14, -17.8],
        [-14.1, -18.3],
        [-14.5, -18.7],
        [-15.3, -19.2],
        [-60, -19.2]
    ], scene, [trafficLightByName("F2-1", trafficLights), trafficLightByName("F4-2", trafficLights)])); //Top - Left Bottom
    return fietserPaths;
}

export const getBusPaths = (scene, trafficLights) => {
    let busPaths = [];
    //Bus
    busPaths.push(new path([
        [-18.5, -35.05],
        [-18.5, -19],
        [-19, -17],
        [-19.8, -16],
        [-20.6, -15.5],
        [-21, -14.5],
        [-21, -8],
        [-20.7, -7],
        [-20, -6],
        [-19, -5.3],
        [-18, -5.05],
        [29, -5.05],
        [32, -4.4],
        [34.5, -3],
        [36, -1],
        [36.35, 0.5],
        [36.35, 35]
    ], scene, [trafficLightByName("B4-1", trafficLights), trafficLightByName("A3-2", trafficLights)])); //B4-1
    busPaths.push(new path([
        [29, 35],
        [29, 7.5],
        [25, 6.5],
        [22, 5.5],
        [20, 5.05],
        [-31.5, 5.05],
        [-34, 3.55],
        [-36, 0.55],
        [-36, -35.05]
    ], scene, [trafficLightByName("B1-1", trafficLights), trafficLightByName("A6-3", trafficLights)])); //B1-1
    busPaths.push(new path([
        [29, 35],
        [29, -5],
        [29.5, -6],
        [30.3, -7],
        [31, -8],
        [31.9, -9],
        [34, -10],
        [60, -10]
    ], scene, [trafficLightByName("B1-2", trafficLights)])); //B1-2
    return busPaths
}