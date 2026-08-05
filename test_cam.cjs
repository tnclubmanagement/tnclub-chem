const THREE = require('three');
const camera = new THREE.PerspectiveCamera(45, 16/9, 0.1, 1000);
camera.position.set(0, 1.0, 6);
camera.lookAt(0, 0, 0);
camera.updateMatrixWorld();

const beakerCenter = new THREE.Vector3(0, -1.5 + 1.5, 0); // world Y = 0 because we moved group up by 1.5
beakerCenter.project(camera);

console.log("Beaker Center Projection (X, Y):", beakerCenter.x, beakerCenter.y);
