async function heapSort(array) {
  sortingInProgress = true;
  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(array, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    const temp = array[0];
    array[0] = array[i];
    array[i] = temp;

    setBarHeight(0, array[0]);
    setBarColor(0, "orange");
    setBarHeight(i, array[i]);
    setBarColor(i, "orange");
    await sleep(400);
    setBarColor(i, "lightgreen");

    await heapify(array, i, 0);
  }
}

async function heapify(array, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) {
    largest = left;
  }

  if (right < n && array[right] > array[largest]) {
    largest = right;
  }


  if (largest !== i) {
    const temp = array[i];
    array[i] = array[largest];
    array[largest] = temp;

    setBarHeight(i, array[i]);
    setBarColor(i, "yellow");
    setBarHeight(largest, array[largest]);
    setBarColor(largest, "yellow");
    await sleep(250);

    await heapify(array, n, largest);
  }
}
