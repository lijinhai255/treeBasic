import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// 添加横纵坐标

const canvas = document.querySelector<HTMLCanvasElement>("#three")!;
// 创建场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: "high-performance",
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// 控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
// 添加坐标轴
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// 创建一个立方体
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

//-------------3D物体动画------------------------------------//
// 物体移动
// cube.position.set(5, 0, 0);
// 物体缩放
// cube.scale.set(2, 1, 3);
//物体旋转
// cube.rotation.set(1, 2, 3);
//
//-------------------end-------------------------//

//--------------设置时钟---------------------------------//
const clock = new THREE.Clock();

// 创建 dat.GUI
const gui = new dat.GUI();

// 添加控件
const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2);
cubeFolder.add(cube.scale, "x", 0, 3).name("scaleX");
cubeFolder.add(cube.scale, "y", 0, 3).name("scaleY");
cubeFolder.add(cube.scale, "z", 0, 3).name("scaleZ");
cubeFolder.open();

console.log(cube, "物体");

// 渲染循环
function animate() {
  // 获取时钟运行的总时长
  //   const time = clock.getElapsedTime();
  //   console.log(time, "获取时钟运行的总时长");
  // 间隔时间
  //   const getDeltaTime = clock.getDelta();
  //   console.log(getDeltaTime, "间隔时间");

  cube.position.x += 0.01;
  cube.rotation.x += 0.01;
  if (cube.position.x > 5) {
    cube.position.x = 0;
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
