class pathingNode {
    constructor(x, y, scene) {
        this.x = x;
        this.y = y;
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ffff
        });
        let node = new THREE.Mesh(geometry, material);
        node.position.x = x;
        node.position.y = y;
        node.position.z = 0.25;
        //scene.add(node);
    }
    toPoint() {
        return new Vector2D(this.x, this.y);
    }
}