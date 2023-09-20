const bars_container = document.getElementById('bars_container');
let minRange = 1;
let maxRange = 100;
let numOfBars = 20;
let heightFactor = 6.5;
let unsorted_array = new Array(numOfBars);

const bubbleSortLink = document.getElementById("bubble_sort_link");
const selectionSortLink = document.getElementById("selection_sort_link");
const insertionSortLink = document.getElementById("insertion_sort_link");
let selectedAlgorithm = 'insertionSort';
let sortingInProgress = false;
const algorithmDescriptionText = document.getElementById("algorithm_description_text");
const algorithmDescriptions = {
  bubble: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted. It is not the most efficient sorting algorithm and is mainly used for educational purposes due to its simplicity.",
  selection: "Selection Sort is a simple sorting algorithm that sorts an array by repeatedly finding the minimum element from the unsorted part and putting it at the beginning. The algorithm divides the input list into two parts: the sorted and the unsorted subarray. Initially, the sorted part is empty, and the algorithm repeatedly selects the minimum element from the unsorted part and moves it to the beginning of the sorted part until the entire list is sorted.",
  insertion: "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, insertion sort provides several advantages: it is simple, efficient for small datasets or nearly sorted datasets, and it is an adaptive sorting algorithm, meaning it performs well when elements are already partially ordered.",
};

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  for(let i = 0; i < numOfBars; i++){
    unsorted_array[i] = randomNum(minRange, maxRange);
  }
}

function renderBars(array){
  for(let i = 0; i < array.length; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

document.addEventListener("DOMContentLoaded", function(){
  createRandomArray();
  renderBars(unsorted_array);
});

function resetBarColors() {
  const bars = document.getElementsByClassName('bar');
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = 'aqua';
  }
}

function randomizeAndRestart() {
  createRandomArray();
  bars_container.innerHTML = '';
  renderBars(unsorted_array);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

bubbleSortLink.addEventListener('click', function () {
  if (sortingInProgress) {
    sortingInProgress = false;
  }
  selectedAlgorithm = 'bubbleSort';
  randomizeAndRestart();
});

selectionSortLink.addEventListener('click', function () {
  if (sortingInProgress) {
    sortingInProgress = false;
  }
  selectedAlgorithm = 'selectionSort';
  randomizeAndRestart();
});

insertionSortLink.addEventListener('click', function () {
  if (sortingInProgress) {
    sortingInProgress = false;
  }
  selectedAlgorithm = 'insertionSort';
  randomizeAndRestart();
});

async function startSorting() {
  await sleep(400);
  let sortedArray = [];
  if (selectedAlgorithm === 'bubbleSort') {
    sortedArray = await bubbleSort(unsorted_array.slice());
  } else if (selectedAlgorithm === 'selectionSort') {
    sortedArray = await selectionSort(unsorted_array.slice());
  } else if (selectedAlgorithm === 'insertionSort') {
    sortedArray = await insertionSort(unsorted_array.slice());
  }
  console.log(sortedArray);
  resetBarColors();
}

async function bubbleSort(array){
  sortingInProgress = true;
  let bars = document.getElementsByClassName('bar');
  for(let i = 0; i < array.length; i++){
    for(let j = 0; j < array.length - i - 1; j++){
      if(!sortingInProgress) return;
      if(array[j] > array[j + 1]){
          for(let k = 0; k < bars.length; k++){
            if(k !== j && k !== j + 1){
              bars[k].style.backgroundColor = "aqua";
            }
          }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = array[j] * heightFactor + "px";
        bars[j].style.backgroundColor = "lightgreen";
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
        await sleep(500);
      }
    }
    await sleep(500);
  }
  sortingInProgress = false;
  resetBarColors();
  return array;
}

async function insertionSort(array) {
  sortingInProgress = true;
  let bars = document.getElementsByClassName('bar');
  const n = array.length;
  for (let i = 1; i < n; i++) {
    if(!sortingInProgress) return;
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      for (let k = 0; k < bars.length; k++) {
        if (k !== j + 1) {
          bars[k].style.backgroundColor = "aqua";
        }
      }
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      bars[j + 1].style.backgroundColor = "lightgreen";
      j = j - 1;
      await sleep(500);
    }
    array[j + 1] = key;
    bars[j + 1].style.height = key * heightFactor + "px";
    bars[j + 1].style.backgroundColor = "lightgreen";
      await sleep(500);
  }
  sortingInProgress = false;
  resetBarColors();
  return array;
}

async function selectionSort(array) {
  sortingInProgress = true;
  let bars = document.getElementsByClassName('bar');
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    if(!sortingInProgress) return;
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      for (let k = 0; k < bars.length; k++) {
        if (k !== i && k !== minIndex) {
          bars[k].style.backgroundColor = "aqua";
        }
      }
      let temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
      bars[i].style.height = array[i] * heightFactor + "px";
      bars[i].style.backgroundColor = "lightgreen";
      bars[minIndex].style.height = array[minIndex] * heightFactor + "px";
      bars[minIndex].style.backgroundColor = "lightgreen";
      await sleep(500);
    }
  }
  sortingInProgress = false;
  resetBarColors();
  return array;
}

function setAlgorithmDescription(algorithm) {
  const description = algorithmDescriptions[algorithm] || "No description available";
  algorithmDescriptionText.textContent = description;
}

const algorithmButtons = document.querySelectorAll(".buttons_container button");
algorithmButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const selectedAlgorithm = button.getAttribute("data-algorithm");
    setAlgorithmDescription(selectedAlgorithm);
    randomizeAndRestart();
    startSorting();
  });
});
