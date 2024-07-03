import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const canvas = document.querySelector<HTMLCanvasElement>("#three")!;

// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 导入纹理
const texture = new THREE.TextureLoader().load(
  "./textures/door/ambientOcclusion.jpg"
);
console.log(texture);
// 设置纹理偏移
// texture.offset.x = 0.5;
// texture.offset.y = 0.5;
// texture.offset.set(0.5, 0.5);
// 纹理旋转
// 设置旋转的原点
// texture.center.set(0.5, 0.5);
// // 旋转45deg
// texture.rotation = Math.PI / 4;
// 设置纹理的重复
// texture.repeat.set(2, 3);
// // 设置纹理重复的模式
texture.wrapS = THREE.MirroredRepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;

// 立即使用纹理进行材质创建
const material = new THREE.MeshBasicMaterial({
  map: texture,
  color: "#ffff00",
});
// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

const cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// // 使用渲染器，通过相机将场景渲染进来
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// 设置时钟

function render() {
  controls.update();
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  //   console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
