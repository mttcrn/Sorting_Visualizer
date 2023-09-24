async function mergeSort(array, left, right) {
  if (left < right) {
    sortingInProgress = true;
    const mid = Math.floor((left + right) / 2);

    await mergeSort(array, left, mid);
    await mergeSort(array, mid + 1, right);

    await merge(array, left, mid, right);
  } 
}

async function merge(array, left, mid, right) {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  const leftArray = new Array(n1);
  const rightArray = new Array(n2);

  for (let i = 0; i < n1; i++) {
    leftArray[i] = array[left + i];
  }
  for (let j = 0; j < n2; j++) {
    rightArray[j] = array[mid + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = left;

  while (i < n1 && j < n2) {
    setBarColor(left + i, "yellow");
    setBarColor(mid + 1 + j, "yellow");
    await sleep(250);

    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      setBarHeight(k, leftArray[i]);
      setBarColor(k, "lightgreen");
      await sleep(250);
      i++;
    } else {
      array[k] = rightArray[j];
      setBarHeight(k, rightArray[j]);
      setBarColor(k, "lightgreen");
      await sleep(250);
      j++;
    }

    k++;
  }

  while (i < n1) {
    array[k] = leftArray[i];
    setBarHeight(k, leftArray[i]);
    setBarColor(k, "lightgreen");
    await sleep(250);
    i++;
    k++;
  }

  while (j < n2) {
    array[k] = rightArray[j];
    setBarHeight(k, rightArray[j]);
    setBarColor(k, "lightgreen");
    await sleep(250);
    j++;
    k++;
  }
}
