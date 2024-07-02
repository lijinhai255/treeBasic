function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
function enterFullscreen(renderer) {
  if (renderer.domElement.requestFullscreen) {
    renderer.domElement.requestFullscreen();
  } else if (renderer.domElement.mozRequestFullScreen) {
    renderer.domElement.mozRequestFullScreen();
  } else if (renderer.domElement.webkitRequestFullscreen) {
    renderer.domElement.webkitRequestFullscreen();
  } else if (renderer.domElement.msRequestFullscreen) {
    renderer.domElement.msRequestFullscreen();
  }
  renderer.domElement.requestFullscreen();
}

function isFullscreen() {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );
}

export function toggleFullscreen(renderer) {
  if (isFullscreen()) {
    exitFullscreen();
  } else {
    enterFullscreen(renderer);
  }
}
