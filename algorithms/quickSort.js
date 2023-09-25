async function quickSort(array, left = 0, right = array.length - 1) {
  if (left < right) {
    sortingInProgress = true;
    const pivotIndex = await partition(array, left, right);
    await quickSort(array, left, pivotIndex - 1);
    await quickSort(array, pivotIndex + 1, right);
  }

  if (left === 0 && right === array.length - 1) {
    for (let i = left; i <= right; i++) {
      setBarColor(i, finalColor);
    }
    await sleep(250/velocity);
  }
}

async function partition(array, left, right) {
  const pivot = array[right];
  setBarColor(right, bonusColor);
  await sleep(200/velocity);

  let i = left - 1;
  for (let j = left; j < right; j++) {
    setBarColor(j, secondaryColor);
    await sleep(250/velocity);

    if (array[j] < pivot) {
      i++;

      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      if(i != j){
        setBarColor(i, swapColor);
        setBarColor(j, swapColor);
        setBarHeight(i, array[i]);
        setBarHeight(j, array[j]);
        await sleep(400/velocity);
      }
      setBarColor(i, primaryColor);
      setBarColor(j, primaryColor);
    }
    setBarColor(j, primaryColor);
    await sleep(250/velocity);
  }

  const pivotIndex = i + 1;
  const temp = array[pivotIndex];
  array[pivotIndex] = array[right];
  array[right] = temp;

  setBarColor(pivotIndex, swapColor);
  setBarColor(right, swapColor);
  setBarHeight(pivotIndex, array[pivotIndex]);
  setBarHeight(right, array[right]);
  await sleep(400/velocity);

  setBarColor(pivotIndex, finalColor);
  setBarColor(right, finalColor);

  return pivotIndex;
}
