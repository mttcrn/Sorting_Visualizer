async function insertionSort(array) {
  sortingInProgress = true;
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    setBarColor(i, secondaryColor);
    await sleep(200/velocity);

    while (j >= 0 && array[j] > key) {
      setBarColor(j, secondaryColor);
      await sleep(200/velocity);

      array[j + 1] = array[j];
      setBarHeight(j + 1, array[j + 1]);
      setBarColor(j + 1, finalColor);
      j = j - 1;
      await sleep(200/velocity);
    }

    if(j === 0){
      setBarColor(j, finalColor);
    }
    array[j + 1] = key;
    setBarHeight(j + 1, key);
    setBarColor(j + 1, finalColor);
    await sleep(400/velocity);

    setBarColor(i, finalColor);
  }
  sortingInProgress = false;
}
