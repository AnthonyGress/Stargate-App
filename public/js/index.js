import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js";

import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js";

const modelDiv = document.querySelector("#canvas");

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
    //TODO make this canvas a child of model so we can manipulate it inside of the div #model
    modelDiv.appendChild(this._threejs.domElement);

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
    const far = 800.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(0, 20, 15);
    this._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(200, 100, 400);
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
    controls.target.set(0, 0, 0);
    this.orbitControls = controls;
    this.orbitControls.minDistance = 15;
    this.orbitControls.maxDistance = 50;
    this.orbitControls.enablePan = false;
    this.orbitControls.enableDamping = true;
    this.orbitControls.autoRotate = true;
    this.orbitControls.autoRotateSpeed = 0.8;

    this.orbitControls.update();

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

    // const skybox_group = new THREE.Object3D();
    // scene.add(skybox_group);
    // const SkyboxMesh = CreateSphere(
    //   "./textures/eso_dark.jpg",
    //   1e8,
    //   50,
    //   "Skybox",
    //   true
    // );
    // SkyboxMesh.material.side = THREE.BackSide;
    // SkyboxMesh.rotation.x = (Math.PI / 180) * 63;
    // skybox_group.add(SkyboxMesh);

    const earthSource = "../assets/sphere/earth_atmos_4096.jpeg";
    const marsSource = "../assets/sphere/mars.jpeg";
    const moonSource = "../assets/sphere/moon_map.jpeg";

    let textureSource = marsSource;

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(textureSource);

    const geometry = new THREE.SphereGeometry(9, 20, 20);

    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    // material.metalness = 0.6;
    material.roughness = 0.5;
    // material.normalMap = normalTexture;
    // material.color = new THREE.Color(0xe07b39);
    // material.transparent = true;
    // material.opacity = 0.4;
    material.flatShading = false;

    // combine geometry and material to create object
    const sphere = new THREE.Mesh(geometry, material);
    this._scene.sphere = sphere;
    sphere.castShadow = false;
    sphere.receiveShadow = true;
    sphere.rotation.y = -Math.PI / 2;
    // add sphere to the scene

    this._scene.add(sphere);

    this._RAF();

    this._LoadModel("../assets/Galaxy3DTest/model/scene.gltf", -22, -42, -10);
    // this._LoadModel("../assets/Galaxy3DTest/earthModel/scene.gltf", -2, 3, 0);
    //this._LoadModel("../assets/stargate/stargate.glb", 0.5, 0.5, 0.5);
    // this._tick();
  }
  _LoadModel(path, x, y, z) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      gltf.scene.traverse((c) => {
        //c.castShadow = true;
        c.position.set(x, y, z);
      });
      this._scene.add(gltf.scene);
    });
  }
  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame(() => {
      this._threejs.render(this._scene, this._camera);
      this.orbitControls.update();
      this._RAF();
    });
  }

  // _tick(){
  //   const elapsedTime = clock.getElapsedTime();
  //   this._LoadModel.rotation.y = .5*elapsedTime;
  //   render.render(this._scene,this._camera);
  //   window.requestAnimationFrame(this._tick);
  // }
}

let _APP = null;

window.addEventListener("DOMContentLoaded", () => {
  _APP = new BasicWorldDemo();
});
