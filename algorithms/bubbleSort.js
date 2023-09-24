async function bubbleSort(array){
  sortingInProgress = true;
  const n = array.length;
  for(let i = 0; i < n; i++){
    for(let j = 0; j < n - i - 1; j++){
      if(array[j] > array[j + 1]){
          for(let k = 0; k < numOfBars; k++){
            if(k !== j && k !== j + 1){
              setBarColor(k, "aqua");
            }
          }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        setBarHeight(j, array[j]);
        setBarColor(j, "lightgreen");
        setBarHeight(j+1, array[j+1]);
        setBarColor(j+1, "lightgreen");
        await sleep(400);
      }
    }
    await sleep(400);
  }
  sortingInProgress = false;
  resetBarColors();
}
