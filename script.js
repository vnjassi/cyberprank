setTimeout(() => {

  // intro hide
  document.querySelector(".intro").style.display="none";

  // scene show
  let scene = document.getElementById("scene");
  scene.style.opacity=1;

  // robot animation
  let robot = document.querySelector(".robot");
  robot.style.transform="rotateY(0deg) scale(1)";

}, 3000);
