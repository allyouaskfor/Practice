// Declaration
let scene;
let camera;
let renderer;
let mesh;

const AMOUNT = 6;

const bannerTjs = document.querySelector('#three-canv');

function init() {

    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(
        20,
        window.innerWidth / window.innerHeight,
//        bannerTjs.clientWidth / bannerTjs.clientHeight, 
        0.1,
        100
    );
    camera.position.set( 0, 0, 10 );

    // Renderer
    renderer = new THREE.WebGLRenderer( {
        alpha: true,
        antialias: true
    } );
    
    renderer.setSize( window.innerWidth, window.innerHeight );
//    renderer.setSize( bannerTjs.clientWidth, bannerTjs.clientHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    
    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;
    
    document.body.appendChild( renderer.domElement );
    
    renderer.setAnimationLoop( () => {

        update();
        render();

    } );

    // Object
    geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load( 'textures/uv_map_basic.png' );
    texture.encoding = THREE.sRGBEncoding;
    texture.anisotropy = 16;
    material = new THREE.MeshStandardMaterial( {
        color: 0xa64696,
        map: texture,
    } );
    
    mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add( mesh );

    // Lights
    const ambLight = new THREE.AmbientLight( {
        color: 0xf2ec91,
        intensity: 1
    } );
    
    ambLight.position.set( 0, 1, 0 );
    
    scene.add( ambLight );

    const dirLight = new THREE.DirectionalLight();
    dirLight.position.set( 0.5, 0.5, 1 );
    dirLight.castShadow = true;
    dirLight.shadow.camera.zoom = 4;

    scene.add( dirLight );

}

function update() {

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;
    mesh.rotation.z += 0.01;

}

function render() {

    renderer.render( scene, camera );

}

function onWindowResize() {
    
    // console.log( 'Window resized.' );
    
    camera.aspect = container.clientWidth / container.clientHeight;
    
    camera.updateProjectionMatrix();
    
    renderer.setSize( container.clientWidth, container.clientHeight );
    
}

window.addEventListener( 'resize', onWindowResize );

init();