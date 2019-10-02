/*
# Author: allyouaskfor, canibeanartist
# Github: https://github.com/allyouaskfor/Practice/3js_learn
# 
*/

let camera;
let scene;
let controls;
let orbit;
let ambLight;
let dirLight;
let renderer;
let mesh;
let material;
let geometry;
let plane;
let planeGeometry;
let planeMaterial;

const banner = document.querySelector('#three-canv');

function init() {

    scene = new THREE.Scene();

    createCamera();
    trackballControl();
//    orbitControls();
    createLights();
//    createPlane();
    createMeshes( 0 );
    createMeshes( -2 );
    createMeshes( 2 );
    createRenderer();
    
    renderer.setAnimationLoop( () => {

        update();
        render();

    } );

}
    
function createCamera() {

    camera = new THREE.PerspectiveCamera(
        20,
//        window.innerWidth / window.innerHeight,
        banner.clientWidth / banner.clientHeight, 
        0.1,
        1000

    );

//    camera.position.set( 0, 0, 10 );
    camera.position.set( -4, 4, 10 );

}

function trackballControl() {
    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 1.0;
    controls.dynamicDampingFactor = 0.01;
}

function orbitControls() {
    const orbit = new THREE.OrbitControls( camera );
}

function createLights() {

    ambLight = new THREE.HemisphereLight(
        0x9dceff,
        0x404050,
        5,
    );
    scene.add( ambLight );

    dirLight = new THREE.DirectionalLight();
    dirLight.intensity = 1;
    dirLight.position.set( -1, 2, 4 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.zoom = 1;
    
    scene.add( dirLight );
    
    }

function createPlane() {

    let planeGeometry = new THREE.PlaneGeometry( 10, 6, 20, 20 );
    let planeMaterial = new THREE.MeshPhongMaterial( { color: 0xbbaafe } );
    let plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = -2;
    plane.position.z = 0;

    scene.add( plane );

}

function createMeshes( x ) {

    geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );

    material = new THREE.MeshPhongMaterial( {
        color: 0xa64696,
    } );
    
    mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add( mesh );
    
    mesh.position.x = x;
    
    return mesh;

}

function createRenderer() {

    renderer = new THREE.WebGLRenderer( {
        alpha: true,
        antialias: true
    } );
    
//    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setSize( banner.clientWidth, banner.clientHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    
    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;
    
    renderer.physicallyCorrectLights = true;
    
    document.body.appendChild( renderer.domElement );

}

function update() {

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;
    mesh.rotation.z += 0.01;

}

function render() {

    controls.update();
    renderer.render( scene, camera );

}

function onWindowResize() {
    
    // console.log( 'Window resized.' );
    
    camera.aspect = banner.clientWidth / banner.clientHeight;
    
    camera.updateProjectionMatrix();
    
    renderer.setSize( banner.clientWidth, banner.clientHeight );
    
}

window.addEventListener( 'resize', onWindowResize );

init();