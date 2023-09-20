const bars_container = document.getElementById('bars_container');
let heightFactor = 6.5;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function bubbleSort(array){
  //sortingInProgress.value = true;
  let bars = document.getElementsByClassName('bar');
  for(let i = 0; i < array.length; i++){
    for(let j = 0; j < array.length - i - 1; j++){
      //if(!sortingInProgress.value) return;
      if(array[j] > array[j + 1]){
          for(let k = 0; k < bars.length; k++){
            if(k !== j && k !== j + 1){
              bars[k].style.backgroundColor = "aqua";
            }
          }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = array[j] * heightFactor + "px";
        bars[j].style.backgroundColor = "lightgreen";
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
        await sleep(500);
      }
    }
    await sleep(500);
  }
  //sortingInProgress.value = false;
  return array;
}

export { bubbleSort };
