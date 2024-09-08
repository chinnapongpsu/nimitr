import {CompilerBase} from './compiler-base.js'
import CompilerWorker   from 'worker-loader!./compiler.worker.js';

export class Compiler extends CompilerBase {
  createProcessCanvas(img) {
    const processCanvas = document.createElement('canvas');
    processCanvas.width = img.width;
    processCanvas.height = img.height;
    return processCanvas;
  }

  compileTrack({progressCallback, targetImages, basePercent}) {
    return new Promise((resolve, reject) => {
      const worker = new CompilerWorker();
      worker.onmessage = (e) => {
        if (e.data.type === 'progress') {
          progressCallback(basePercent + e.data.percent * basePercent/100);
        } else if (e.data.type === 'compileDone') {
          resolve(e.data.list);
        }
      };
      worker.postMessage({ type: 'compile', targetImages });
    });
  }
}
