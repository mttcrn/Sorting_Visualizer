async function quickSort(array, left = 0, right = array.length - 1) {
  if (left < right) {
    sortingInProgress = true;
    const pivotIndex = await partition(array, left, right);
    await quickSort(array, left, pivotIndex - 1);
    await quickSort(array, pivotIndex + 1, right);
  }

  if (left === 0 && right === array.length - 1) {
    for (let i = left; i <= right; i++) {
      setBarColor(i, "lightgreen");
    }
    await sleep(250);
  }
}

async function partition(array, left, right) {
  const pivot = array[right];
  setBarColor(right, "red");
  await sleep(200);

  let i = left - 1;
  for (let j = left; j < right; j++) {
    setBarColor(j, "yellow");
    await sleep(250);

    if (array[j] < pivot) {
      i++;

      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      if(i != j){
        setBarColor(i, "orange");
        setBarColor(j, "orange");
        setBarHeight(i, array[i]);
        setBarHeight(j, array[j]);
        await sleep(400);
      }
      setBarColor(i, "aqua");
      setBarColor(j, "aqua");
    }
    setBarColor(j, "aqua");
    await sleep(250);
  }

  const pivotIndex = i + 1;
  const temp = array[pivotIndex];
  array[pivotIndex] = array[right];
  array[right] = temp;

  setBarColor(pivotIndex, "orange");
  setBarColor(right, "orange");
  setBarHeight(pivotIndex, array[pivotIndex]);
  setBarHeight(right, array[right]);
  await sleep(400);

  setBarColor(pivotIndex, "lightgreen");
  setBarColor(right, "lightgreen");

  return pivotIndex;
}
