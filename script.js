const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,2,8);

const renderer = new THREE.WebGLRenderer({canvas:document.getElementById("bg"), antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// neon lights
const light1 = new THREE.PointLight(0x00ffff,2,50);
light1.position.set(5,5,5);
scene.add(light1);

const light2 = new THREE.PointLight(0xff00ff,2,50);
light2.position.set(-5,5,5);
scene.add(light2);

// road
const roadGeo = new THREE.PlaneGeometry(50,10);
const roadMat = new THREE.MeshStandardMaterial({color:0x111111, metalness:0.9, roughness:0.2});
const road = new THREE.Mesh(roadGeo,roadMat);
road.rotation.x = -Math.PI/2;
scene.add(road);

// robot (placeholder cube)
const robotGeo = new THREE.BoxGeometry(1,2,1);
const robotMat = new THREE.MeshStandardMaterial({color:0x00ffff, emissive:0x00ffff});
const robot = new THREE.Mesh(robotGeo, robotMat);
robot.position.y = 1;
scene.add(robot);

// buildings
for(let i=-20;i<20;i+=3){
    let geo = new THREE.BoxGeometry(2,Math.random()*8+2,2);
    let mat = new THREE.MeshStandardMaterial({color:0x111111});
    let b1 = new THREE.Mesh(geo,mat);
    b1.position.set(i,geo.parameters.height/2,-5);
    scene.add(b1);

    let b2 = new THREE.Mesh(geo,mat);
    b2.position.set(i,geo.parameters.height/2,5);
    scene.add(b2);
}

// rain
const rainGeo = new THREE.BufferGeometry();
const rainCount = 2000;
const pos = [];

for(let i=0;i<rainCount;i++){
    pos.push((Math.random()-0.5)*50);
    pos.push(Math.random()*20);
    pos.push((Math.random()-0.5)*20);
}

rainGeo.setAttribute("position", new THREE.Float32BufferAttribute(pos,3));
const rainMat = new THREE.PointsMaterial({color:0x00ffff,size:0.05});
const rain = new THREE.Points(rainGeo,rainMat);
scene.add(rain);

// start animation
let running=false;
function start(){
    running=true;
}

function animate(){
    requestAnimationFrame(animate);

    if(running){
        robot.position.x += 0.05;
        camera.position.x += 0.05;
    }

    rain.rotation.y += 0.002;
    renderer.render(scene,camera);
}
animate();
