import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js";

class BasicWorldDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);
    //TODO make this canvas a child of model so we can manipulate it inside of the div
    document.body.appendChild(this._threejs.domElement);

    window.addEventListener(
      "resize",
      () => {
        this._OnWindowResize();
      },
      false
    );

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(75, 20, 0);

    this._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(20, 100, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    this._scene.add(light);

    light = new THREE.AmbientLight(0x101010);
    this._scene.add(light);

    const controls = new OrbitControls(this._camera, this._threejs.domElement);
    controls.target.set(0, 20, 0);
    controls.update();

    const bgLoader = new THREE.CubeTextureLoader();
    const bgTexture = bgLoader.load([
      "../assets/skyBox/skyBackground.png",
      "../assets/skyBox/skyBackground.png",
      "../assets/skyBox/skyBackground.png",
      "../assets/skyBox/skyBackground.png",
      "../assets/skyBox/skyBackground.png",
      "../assets/skyBox/skyBackground.png",
    ]);
    this._scene.background = bgTexture;

    const textureLoader = new THREE.TextureLoader();
    const normalTexture = textureLoader.load(
      "../assets/sphere/normalTexture.jpeg"
    );

    const geometry = new THREE.SphereGeometry(9, 12, 12);

    const material = new THREE.MeshStandardMaterial();
    material.metalness = 0.6;
    material.roughness = 0.3;
    material.normalMap = normalTexture;

    // combine geometry and material to create object
    const sphere = new THREE.Mesh(geometry, material);

    sphere.castShadow = false;
    sphere.receiveShadow = true;
    sphere.rotation.x = -Math.PI / 2;
    // add sphere to the scene
    this._scene.add(sphere);

    // const loader = new FBXLoader;

    // loader.load( '../assets/Galaxy3DTest/source/*', function ( fbx ) {

    // scene.add( fbx.scene );

    // }, undefined, function ( error ) {

    // console.error( error );

    // } );

    // const box = new THREE.Mesh(
    //   new THREE.SphereGeometry(2, 32, 32),
    //   new THREE.MeshStandardMaterial({
    //       color: 0xFFFFFF,
    //       wireframe: true,
    //       wireframeLinewidth: 4,
    //   }));
    // box.position.set(0, 0, 0);
    // box.castShadow = true;
    // box.receiveShadow = true;
    // this._scene.add(box);

    this._RAF();
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      this._RAF();
    });
  }
}

let _APP = null;

window.addEventListener("DOMContentLoaded", () => {
  _APP = new BasicWorldDemo();
});

// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

// // import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
// // import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
// // const THREE = require('three');

// class Website3DDemo {
//   constructor() {
//     this._Initialize();
//   }

//   _Initialize() {
//     this._threejs = new THREE.WebGLRenderer({
//       antialias: true,
//       alpha: true,
//     });
//     this._threejs.shadowMap.enabled = true;
//     this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
//     this._threejs.physicallyCorrectLights = true;
//     this._threejs.toneMapping = THREE.ACESFilmicToneMapping;
//     this._threejs.outputEncoding = THREE.sRGBEncoding;

//     const modelDiv = document.getElementById('model');
//     modelDiv.appendChild(this._threejs.domElement);

//     this._threejs.setSize(modelDiv.offsetWidth, modelDiv.offsetHeight);

//     window.addEventListener('resize', () => {
//       this._OnWindowResize();
//     }, false);

//     const fov = 60;
//     const aspect = modelDiv.offsetWidth / modelDiv.offsetHeight;
//     const near = 1.0;
//     const far = 1000.0;
//     this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//     this._camera.position.set(15, 15, 20);

//     this._scene = new THREE.Scene();

//     let light = new THREE.DirectionalLight(0xFFFFFF);
//     light.position.set(20, 100, 10);
//     light.target.position.set(0, 0, 0);
//     light.castShadow = true;
//     light.shadow.bias = -0.001;
//     light.shadow.mapSize.width = 2048;
//     light.shadow.mapSize.height = 2048;
//     light.shadow.camera.near = 0.1;
//     light.shadow.camera.far = 500.0;
//     light.shadow.camera.near = 0.5;
//     light.shadow.camera.far = 500.0;
//     light.shadow.camera.left = 100;
//     light.shadow.camera.right = -100;
//     light.shadow.camera.top = 100;
//     light.shadow.camera.bottom = -100;
//     this._scene.add(light);

//     light = new THREE.AmbientLight(0xFFFFFF);
//     this._scene.add(light);

//     this._controls = new OrbitControls(
//         this._camera, this._threejs.domElement);
//     this._controls.target.set(0, 10, 0);
//     this._controls.update();
//     const loader = new THREE.CubeTextureLoader();
//     const texture = loader.load(['../assets/skyBox/skyBackground.jpg',
//     '../assets/skyBox/skyBackground.jpg','../assets/skyBox/skyBackground.jpg',
//     '../assets/skyBox/skyBackground.jpg','../assets/skyBox/skyBackground.jpg','../assets/skyBox/skyBackground.jpg']);
//     this._scene.background = texture;
//     // this._LoadAnimatedModelAndPlay(
//     //     './resources/zombie/', 'mremireh_o_desbiens.fbx',
//     //     'Silly Dancing.fbx', new THREE.Vector3(0, 0, 0));

//     // this._LoadAnimatedModelAndPlay(
//     //     './resources/zombie/', 'mremireh_o_desbiens.fbx',
//     //     'Silly Dancing.fbx', new THREE.Vector3(-20, 0, -20));

//     // this._LoadAnimatedModelAndPlay(
//     //     './resources/zombie/', 'mremireh_o_desbiens.fbx',
//     //     'Silly Dancing.fbx', new THREE.Vector3(20, 0, -20));

//     this._mixers = [];
//     this._previousRAF = null;

//     this._scrollAmount = 0.0;
//     this._RAF();
//   }

// //   _LoadAnimatedModelAndPlay(path, modelFile, animFile, offset) {
// //     const loader = new FBXLoader();
// //     loader.setPath(path);
// //     loader.load(modelFile, (fbx) => {
// //       fbx.scale.setScalar(0.1);
// //       fbx.traverse(c => {
// //         c.castShadow = true;
// //       });
// //       fbx.position.copy(offset);

// //       const anim = new FBXLoader();
// //       anim.setPath(path);
// //       anim.load(animFile, (anim) => {
// //         const m = new THREE.AnimationMixer(fbx);
// //         this._mixers.push(m);
// //         const idle = m.clipAction(anim.animations[0]);
// //         idle.play();
// //       });
// //       this._scene.add(fbx);
// //     });
// //   }

// //   OnScroll(pos) {
// //     const a = 15;
// //     const b = -15;
// //     const amount = Math.min(pos / 500.0, 1.0);
// //     this._camera.position.set(a + amount * (b - a), 15, 20);
// //     this._controls.update();
// //   }

//   _OnWindowResize() {
//     this._camera.aspect = window.innerWidth / window.innerHeight;
//     this._camera.updateProjectionMatrix();
//     this._threejs.setSize(window.innerWidth, window.innerHeight);
//   }

//   _Step(timeElapsed) {
//     const timeElapsedS = timeElapsed * 0.001;
//     if (this._mixers) {
//       this._mixers.map(m => m.update(timeElapsedS));
//     }
//   }

//   _RAF() {
//     requestAnimationFrame((t) => {
//       if (this._previousRAF === null) {
//         this._previousRAF = t;
//       }

//       this._RAF();

//       this._threejs.render(this._scene, this._camera);
//       this._Step(t - this._previousRAF);
//       this._previousRAF = t;
//     });
//   }
// }

// let _APP = null;

// window.addEventListener('DOMContentLoaded', () => {
//   _APP = new Website3DDemo();
// });

// window.addEventListener('scroll', (e) => {
//   _APP.OnScroll(window.scrollY);
// });
