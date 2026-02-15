import * as THREE from 'https://unpkg.com/three@0.152.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.152.0/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.getElementById('scene');
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 10, 100);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(-15,5,15);

const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Neon lights
const neon1 = new THREE.PointLight(0x00ffff, 5, 100);
neon1.position.set(20,10,20); scene.add(neon1);
const neon2 = new THREE.PointLight(0xff00ff, 5, 100);
neon2.position.set(-20,10,20); scene.add(neon2);

// Ground
const roadGeo = new THREE.PlaneGeometry(200,50);
const roadMat = new THREE.MeshStandardMaterial({color:0x111111,metalness:0.9,roughness:0.1});
const road = new THREE.Mesh(roadGeo,roadMat);
road.rotation.x=-Math.PI/2; scene.add(road);

// Cyberpunk buildings
for(let i=-50;i<50;i+=5){
  let h = Math.random()*20+5;
  let geo = new THREE.BoxGeometry(3,h,3);
  let mat = new THREE.MeshStandardMaterial({color:0x111111});
  let b1 = new THREE.Mesh(geo,mat);
  b1.position.set(i,h/2,-15); scene.add(b1);
  let b2 = new THREE.Mesh(geo,mat);
  b2.position.set(i,h/2,15); scene.add(b2);
}

// Rain
const rainGeo = new THREE.BufferGeometry();
const pos=[];
for(let i=0;i<5000;i++){
  pos.push((Math.random()-0.5)*200);
  pos.push(Math.random()*50);
  pos.push((Math.random()-0.5)*50);
}
rainGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos,3));
const rainMat = new THREE.PointsMaterial({color:0x00ffff,size:0.07});
const rain = new THREE.Points(rainGeo,rainMat); scene.add(rain);

// Load robot model
let robot;
const loader = new GLTFLoader();
loader.load('./models/robot.glb', (gltf)=>{
  robot = gltf.scene;
  robot.scale.set(1,1,1);
  robot.position.set(-50,0,0);
  scene.add(robot);
});

// Animation
let running=false;
document.getElementById('startBtn').onclick = ()=>running=true;

function animate(){
  requestAnimationFrame(animate);

  if(running && robot){
    robot.position.x += 0.3;
    camera.position.x += 0.3;
    camera.lookAt(robot.position);
  }

  // Rain fall
  const p=rain.geometry.attributes.position;
  for(let i=0;i<p.count;i++){
    p.array[i*3+1]-=0.7;
    if(p.array[i*3+1]<0) p.array[i*3+1]=50;
  }
  p.needsUpdate=true;

  renderer.render(scene,camera);
}
animate();

// Handle resize
window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});
