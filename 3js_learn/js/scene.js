// Declaration
let scene;
let camera;
let renderer;
let mesh;

const AMOUNT = 6;

const container = document.querySelector('#three-canv');

function init() {

    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(
        20,
        window.innerWidth / window.innerHeight,
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
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );
    
    renderer.setAnimationLoop( () => {

        update();
        render();

    } );

    // Object
    geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    material = new THREE.MeshStandardMaterial( {
        color: 0xff4083
    } );
    
    mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add( mesh );

    // Lights
    const color = 0x66d9ed;
    const intensity = 1;
    const light = new THREE.AmbientLight( color, intensity );

    light.position.set( 0, 1, 0 );
    scene.add( light );

    const light2 = new THREE.DirectionalLight();
    light2.position.set( 0.5, 0.5, 1 );
    light2.castShadow = true;
    light2.shadow.camera.zoom = 4;

//    light2.position.set( 10, 10, 10 );
    scene.add( light2 );

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