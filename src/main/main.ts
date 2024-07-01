import * as THREE from "three";
const canvas = document.querySelector<HTMLCanvasElement>("#three")!;
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: "high-performance",
});
