import { Engine } from './core/Engine';
import { SceneManager } from './core/SceneManager';
import { Timeline } from './animation/Timeline';

const container = document.getElementById('viewport-container')!;
const engine = new Engine(container);
const sceneManager = new SceneManager(container.clientWidth / container.clientHeight);
const timeline = new Timeline();

// UI elements
const btnPlay = document.getElementById('btn-play')!;
const timeDisplay = document.getElementById('time-display')!;

btnPlay.addEventListener('click', () => {
  timeline.togglePlay();
});

// Window resize update
window.addEventListener('resize', () => {
  sceneManager.updateAspect(container.clientWidth / container.clientHeight);
});

// Main Loop logic
engine.setUpdateCallback((delta) => {
  timeline.update(delta);
  timeDisplay.textContent = `Time: ${timeline.currentTime.toFixed(2)}s`;

  // Example animation reaction: rotate cube over time
  const cube = sceneManager.scene.getObjectByName('TestCube');
  if (cube) {
    cube.rotation.y = timeline.currentTime * Math.PI;
  }

  engine.renderer.render(sceneManager.scene, sceneManager.camera);
});

engine.start();
