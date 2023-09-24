async function countingSort(array) {
  sortingInProgress = true;
  const max = Math.max(...array);
  const min = Math.min(...array);
  const range = max - min + 1;
  const countArray = new Array(range).fill(0);

  for (let i = 0; i < array.length; i++) {
    const index = array[i] - min;
    countArray[index]++;
    setBarColor(i, "yellow");
    await sleep(250);
  }

  let outputIndex = 0;

  for (let i = 0; i < countArray.length; i++) {
    while (countArray[i] > 0) {

      array[outputIndex] = i + min;

      setBarHeight(outputIndex, array[outputIndex]);
      setBarColor(outputIndex, "lightgreen");

      outputIndex++;
      countArray[i]--;

      await sleep(250);
    }
  }
  sortingInProgress = false;
}
