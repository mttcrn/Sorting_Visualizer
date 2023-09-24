async function insertionSort(array) {
  sortingInProgress = true;
  const n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;

    setBarColor(i, "yellow");
    await sleep(200);

    while (j >= 0 && array[j] > key) {
      setBarColor(j, "yellow");
      await sleep(200);

      array[j + 1] = array[j];
      setBarHeight(j + 1, array[j + 1]);
      setBarColor(j + 1, "lightgreen");
      j = j - 1;
      await sleep(200);
    }

    if(j === 0){
      setBarColor(j, "lightgreen");
    }
    array[j + 1] = key;
    setBarHeight(j + 1, key);
    setBarColor(j + 1, "lightgreen");
    await sleep(400);

    setBarColor(i, "lightgreen");
  }
  sortingInProgress = false;
}
