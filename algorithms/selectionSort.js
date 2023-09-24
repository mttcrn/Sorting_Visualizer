async function selectionSort(array) {
  sortingInProgress = true;
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    setBarColor(i, "yellow");
    await sleep(200);

    for (let j = i + 1; j < n; j++) {
      setBarColor(j, "yellow");
      await sleep(200);

      if (array[j] < array[minIndex]) {
        setBarColor(minIndex, "aqua");
        minIndex = j;
        setBarColor(minIndex, "yellow");
      } else {
        setBarColor(j, "aqua");
      }
    }

    if (minIndex !== i) {
      setBarColor(i, "lightgreen");
      setBarColor(minIndex, "lightgreen");
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
      setBarHeight(i, array[i]);
      setBarHeight(minIndex, array[minIndex]);
      await sleep(400);
      setBarColor(i, "orange");
      setBarColor(minIndex, "orange");
    }

    setBarColor(i, "lightgreen");
    if(minIndex != i){
      setBarColor(minIndex, "aqua");
    }
  }
  sortingInProgress = false;
}
