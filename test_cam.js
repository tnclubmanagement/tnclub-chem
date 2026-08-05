const THREE = require('three');
const camera = new THREE.PerspectiveCamera(45, 16/9, 0.1, 1000);
camera.position.set(0, -0.2, 5.5);
camera.lookAt(0, -1.2, 0);
camera.updateMatrixWorld();

const beakerCenter = new THREE.Vector3(0, -1.5, 0);
beakerCenter.project(camera);

console.log("Beaker Center Projection (X, Y):", beakerCenter.x, beakerCenter.y);
