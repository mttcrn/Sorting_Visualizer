import { sortingInProgress, heightFactor, sleep, resetBarColors } from '../index.js';

async function selectionSort(array) {
  sortingInProgress = true;
  let bars = document.getElementsByClassName('bar');
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    if(!sortingInProgress) return;
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      for (let k = 0; k < bars.length; k++) {
        if (k !== i && k !== minIndex) {
          bars[k].style.backgroundColor = "aqua";
        }
      }
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
      bars[i].style.height = array[i] * heightFactor + "px";
      bars[i].style.backgroundColor = "lightgreen";
      bars[minIndex].style.height = array[minIndex] * heightFactor + "px";
      bars[minIndex].style.backgroundColor = "lightgreen";
      await sleep(500);
    }
  }
  sortingInProgress = false;
  resetBarColors();
  return array;
}

export { selectionSort, sortingInProgress  };
