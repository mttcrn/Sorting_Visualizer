async function bubbleSort(array){
  sortingInProgress = true;
  const n = array.length;
  for(let i = 0; i < n; i++){
    for(let j = 0; j < n - i - 1; j++){
      if(array[j] > array[j + 1]){
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        setBarHeight(j, array[j]);
        setBarColor(j, swapColor);
        setBarHeight(j+1, array[j+1]);
        setBarColor(j+1, swapColor);
        await sleep(400/velocity);
        setBarColor(j, primaryColor);
        setBarColor(j+1, primaryColor);
      }
    }
    await sleep(400/velocity);
  }
  for(let i = 0; i < n; i++){
    setBarColor(i, finalColor);
    await sleep(200/velocity);
  }
  sortingInProgress = false;
}
