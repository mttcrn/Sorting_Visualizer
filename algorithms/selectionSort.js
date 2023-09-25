async function selectionSort(array) {
  sortingInProgress = true;
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    setBarColor(i, secondaryColor);
    await sleep(200/velocity);

    for (let j = i + 1; j < n; j++) {
      setBarColor(j, secondaryColor);
      await sleep(200/velocity);

      if (array[j] < array[minIndex]) {
        setBarColor(minIndex, primaryColor);
        minIndex = j;
        setBarColor(minIndex, secondaryColor);
      } else {
        setBarColor(j, primaryColor);
      }
    }

    if (minIndex !== i) {
      setBarColor(i, swapColor);
      setBarColor(minIndex, swapColor);
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
      setBarHeight(i, array[i]);
      setBarHeight(minIndex, array[minIndex]);
      await sleep(400/velocity);
    }

    setBarColor(i, finalColor);
    if(minIndex != i){
      setBarColor(minIndex, primaryColor);
    }
  }
  sortingInProgress = false;
}
