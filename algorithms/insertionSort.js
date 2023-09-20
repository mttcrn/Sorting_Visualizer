import { sortingInProgress, heightFactor, sleep, resetBarColors } from '../index.js';

async function insertionSort(array) {
  sortingInProgress = true;
  let bars = document.getElementsByClassName('bar');
  const n = array.length;
  for (let i = 1; i < n; i++) {
    if(!sortingInProgress) return;
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      for (let k = 0; k < bars.length; k++) {
        if (k !== j + 1) {
          bars[k].style.backgroundColor = "aqua";
        }
      }
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      bars[j + 1].style.backgroundColor = "lightgreen";
      j = j - 1;
      await sleep(500);
    }
    array[j + 1] = key;
    bars[j + 1].style.height = key * heightFactor + "px";
    bars[j + 1].style.backgroundColor = "lightgreen";
      await sleep(500);
  }
  sortingInProgress = false;
  resetBarColors();
  return array;
}

export { insertionSort, sortingInProgress  };
