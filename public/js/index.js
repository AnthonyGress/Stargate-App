// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
// import * as THREE from "/three.min.js";


// import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

// import { FBXLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js";

// import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js";

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

    modelDiv.appendChild(this._threejs.domElement);

    window.addEventListener(
      "resize",
      () => {
        this._OnWindowResize();
      },
      false
    );
    window.addEventListener(
      "orientationchange",
      () => {
        this._OnWindowResize();
        if (screen.width < 500) {
          this._camera.position.set(50, 20, 86);
        } else {
          this._camera.position.set(50, 40, 32);
        }
        this._camera.updateProjectionMatrix();
      },
      false
    );

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 2000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // default zoom
    // zoom out if mobile
    if (screen.width < 500) {
      this._camera.position.set(50, 20, 86);
    } else {
      this._camera.position.set(50, 20, 40);
    }
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xffffff, .8);
    light.position.set(200, 300, 400);
    light.target.position.set(0, 0, 0);
    // light.castShadow = true;
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

    // let light2 = new THREE.DirectionalLight(0xffffff, .9);
    // light2.position.set(-100, -200, -300);
    // light2.target.position.set(0, -50, 0);
    // light2.shadow.bias = -0.001;
    // light2.shadow.mapSize.width = 2048;
    // light2.shadow.mapSize.height = 2048;
    // light2.shadow.camera.near = 0.1;
    // light2.shadow.camera.far = 500.0;
    // light2.shadow.camera.near = 0.5;
    // light2.shadow.camera.far = 500.0;
    // light2.shadow.camera.left = 100;
    // light2.shadow.camera.right = -100;
    // light2.shadow.camera.top = 100;
    // light2.shadow.camera.bottom = -100;
    // this._scene.add(light2);

    light = new THREE.AmbientLight(0x404040);
    this._scene.add(light);

    const controls = new THREE.OrbitControls(this._camera, this._threejs.domElement);
    this.orbitControls = controls;
    this.orbitControls.target.set(0, 0, 0);
    this.orbitControls.minDistance = 50;
    this.orbitControls.maxDistance = 180;
    this.orbitControls.enablePan = false;
    this.orbitControls.enableDamping = true;
    this.orbitControls.autoRotate = false;
    this.orbitControls.autoRotateSpeed = 1;
    // this.orbitControls.dampingFactor = 0.05;
    this.orbitControls.rotateSpeed = 0.2;
    this.orbitControls.zoomSpeed = 0.45;

    this.orbitControls.update();
    //create cube skybox
    // const bgLoader = new THREE.CubeTextureLoader();
    // const bgTexture = bgLoader.load([
    //   "../assets/skybox-bg/space_bk.png",
    //   "../assets/skybox-bg/space_dn.png",
    //   "../assets/skybox-bg/space_ft.png",
    //   "../assets/skybox-bg/space_lf.png",
    //   "../assets/skybox-bg/space_rt.png",
    //   "../assets/skybox-bg/space_up.png",
    // ]);
    // this._scene.background = bgTexture;

    //create sphere skybox
    const bgTextureSource = "../assets/skyBox/eso_dark.min.jpeg";
    const bgLoader = new THREE.TextureLoader();
    const bgTexture = bgLoader.load(bgTextureSource);

    const bgGeometry = new THREE.SphereGeometry(300, 32, 20);

    const bgMaterial = new THREE.MeshBasicMaterial({
      map: bgTexture,
      // view inside the sphere
      side: THREE.BackSide,
    });
    const bgSphere = new THREE.Mesh(bgGeometry, bgMaterial);
    this._scene.bgSphere = bgSphere;
    this._scene.add(bgSphere);

    // manipulate url to determine which model texture to load
    let urlSelection = window.location.href.toString().split("/").pop();
    let selection = urlSelection.split("#").pop();
    let bodyTexture;

//     const fbxLoader = new FBXLoader()
// fbxLoader.load(
//     '../assets/sphere/saturn-planet/source/Saturn_LP.fbx',
//     (object) => {
//         // object.traverse(function (child) {
//         //     if ((child as THREE.Mesh).isMesh) {
//         //         // (child as THREE.Mesh).material = material
//         //         if ((child as THREE.Mesh).material) {
//         //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
//         //         }
//         //     }
//         // })
//         // object.scale.set(.01, .01, .01)
//         this._scene.add(object)
//     },
//     (xhr) => {
//         console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
//     },
//     (error) => {
//         console.log(error)
//     }
// )
// const glbLoader = (path, x, y, z) => {
//   const loader = new THREE.GLTFLoader();
//   loader.load(path, (gltf) => {
//     gltf.scene.traverse((c) => {
//       //c.castShadow = true;
//       if ( c.isMesh ) {
//         c.geometry.center(); // center here
//     }
//     c.position.set(x, y, z);
//   });
//   gltf.scene.scale.multiplyScalar(3.5 / 100); // adjust scalar factor to match your scene scale
//     // gltf.scene.scale.set(-10,-10,400) // scale here/
//     this._scene.model = gltf.scene;
//     this._RAF(gltf.scene)
//     this._scene.add(this._scene.model);
//     gltf.scene.position.y -= 10;
//   });
// }

    switch (selection) {
      case "mars":
        bodyTexture = "../assets/sphere/mars.min.jpeg";
        break;
      case "moon":
        bodyTexture = "../assets/sphere/moon.min.jpeg";

        break;
      case "mercury":
        bodyTexture = "../assets/sphere/mercury.min.jpeg";

        break;
      case "venus":
        bodyTexture = "../assets/sphere/venus.min.jpeg";

        break;
      case "jupiter":
        bodyTexture = "../assets/sphere/jupiter.min.jpeg";

        break;
      case "saturn":
        this._LoadModel("../assets/sphere/Saturn.glb", 0, 5, 0);
        if (screen.width < 500) {
          this._camera.position.set(50, 70, 90);
        } else {
          this._camera.position.set(50, 38, 30);
        }
        
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        // bodyTexture = "../assets/sphere/saturn.min.jpeg";
        break;
      case "uranus":
        bodyTexture = "../assets/sphere/uranus.min.jpeg";
        break;
      case "neptune":
        bodyTexture = "../assets/sphere/neptune.min.jpeg";
        break;
      case "pluto":
        bodyTexture = "../assets/sphere/pluto.min.jpeg";
        break;
      case "sun":
        bodyTexture = "../assets/sphere/sun.min.jpeg";
        // this._LoadModel("../assets/sphere/sun.glb", 0, 5, 0);
        // if (screen.width < 500) {
        //   this._camera.position.set(50, 70, 90);
        // } else {
        //   this._camera.position.set(50, 38, 30);
        // }
        
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        break;
      case "earth":
        bodyTexture = "../assets/sphere/earth_atmos_4096.min.jpeg";
        break;
      default:
        bodyTexture = "../assets/sphere/earth_atmos_4096.min.jpeg";
        break;
    }
    //TODO clean this mess up
    let textureSource = bodyTexture;
    let texture;
    const textureLoader = new THREE.TextureLoader();


    // if model is not saturn, create sphere and mesh and add it
    if (textureSource){
  
      texture = textureLoader.load(textureSource);
      const geometry = new THREE.SphereGeometry(24, 32, 32);
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
      // this._scene.add(sphere);
      if (selection !== "saturn") {
        sphere.position.y = -2;
        this._scene.add(sphere);
      }
    }

    this._RAF();
    // particles
    // this._LoadModel("../assets/Galaxy3DTest/model/scene.gltf", -22, -42);
    // this._LoadModel("../assets/Galaxy3DTest/earthModel/scene.gltf", -2, 3, 0);
    // this._LoadModel("../assets/sphere/Saturn.glb", 0, 8, 0);
    // this._tick();

  }
  _LoadModel(path, x, y, z) {
    const loader = new THREE.GLTFLoader();
    loader.load(path, (gltf) => {
      gltf.scene.traverse((c) => {
        //c.castShadow = true;
        if ( c.isMesh ) {
          c.geometry.center(); // center here
      }
      c.position.set(x, y, z);
    });
    if (path === "../assets/sphere/Saturn.glb"){

      gltf.scene.scale.multiplyScalar(3.5 / 100); // adjust scalar factor to match your scene scale
    }
      // gltf.scene.scale.set(-10,-10,400) // scale here/
      this._scene.model = gltf.scene;
      this._RAF(this._scene.model)
      this._scene.add(this._scene.model);

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
      // this._scene.sphere ? this._scene.sphere.rotation.y += .003 : console.log("saturn");
      if (this._scene.sphere){
        this._scene.sphere.rotation.y += .003
      } 
      this._RAF();
    });
  }
}

let _APP = null;

window.addEventListener("DOMContentLoaded", () => {
  _APP = new BasicWorldDemo();

  const refresh = (event) => {
    location.reload();
  };
  const dropdown = document.querySelector(".dropdown-menu");
  dropdown.addEventListener("click", () => setTimeout(refresh, 1));
  // TODO run check on url
  // dropdown.addEventListener("click", refresh);
});
