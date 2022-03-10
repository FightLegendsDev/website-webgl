import {
  WebGLRenderer,
  sRGBEncoding,
  ACESFilmicToneMapping
} from 'three';

export const createRenderer = () => {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });

  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = sRGBEncoding;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;

  return renderer;
}