/*
# Author: allyouaskfor, canibeanartist
# Github: https://github.com/allyouaskfor/Practice/3js_learn
# 
*/

// Declaration
let scene;
let camera;
let controls;
let controlsO;
let renderer;
let mesh;

const AMOUNT = 6;

const banner = document.querySelector('#three-canv');

function init() {

    scene = new THREE.Scene();

    createCamera();
//    createControlsTrack();
    createControlsOrbit();
    createLights();
    createPlane();
    createMeshes();
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

function createControlsTrack() {
    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 1.0;
//    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.01;
}

function createControlsOrbit() {
    controlsO = new THREE.OrbitControls( camera );
}

function createLights() {

    const ambLight = new THREE.HemisphereLight(
        0x9dceff,   // Bright sky colour
        0x404050,   // Dim ground colour
        5,          // Intensity
    );
    scene.add( ambLight );

    const dirLight = new THREE.DirectionalLight();
    dirLight.intensity = 5;
    dirLight.position.set( 1, 1, 0 );
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

function createMeshes() {

    geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load( 'textures/uv_map_basic.png' );
    texture.encoding = THREE.sRGBEncoding;
    texture.anisotropy = 16;
    material = new THREE.MeshStandardMaterial( {
        color: 0xa64696,
//        map: texture,
    } );
    
    mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add( mesh );
    
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
/*
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;
    mesh.rotation.z += 0.01;
*/
}

function render() {

//    controls.update();
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