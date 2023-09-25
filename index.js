const primaryColor = "#0094FE";
const secondaryColor = "#FFC94B";
const swapColor = "#F37B84";
const finalColor = "#31CD8C";
const bonusColor = "#FA3443";

const bars_container = document.getElementById('bars_container');
let minRange = 1;
let maxRange = 100;
let numOfBars = 20;
let heightFactor = 6;
let unsorted_array = new Array(numOfBars);
let first = true;

let selectedAlgorithm = 'bubble';
let sortingInProgress = false;
const algorithmDescriptionText = document.getElementById("algorithm_description_text");
const algorithmDescriptions = {
  bubble: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. \nThe pass through the list is repeated until no swaps are needed. \nIt is not the most efficient sorting algorithm and is mainly used for educational purposes due to its simplicity.",
  selection: "Selection Sort is a simple sorting algorithm that sorts an array by repeatedly finding the minimum element from the unsorted part and putting it at the beginning. \nThe algorithm divides the input list into two parts: the sorted and the unsorted subarray. Initially, the sorted part is empty, and the algorithm repeatedly selects the minimum element from the unsorted part and moves it to the beginning of the sorted part until the entire list is sorted.",
  insertion: "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. \n It iterates through the input array, comparing each element to its adjacent elements and inserting it into the correct position within the sorted portion of the array. \nIt is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, it provides several advantages: it is simple, efficient for small datasets or nearly sorted datasets, and it is an adaptive sorting algorithm, meaning it performs well when elements are already partially ordered.",
  quick: "QuickSort is a highly efficient and widely used comparison-based sorting algorithm that follows a divide-and-conquer strategy. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then recursively sorted. QuickSort is known for its average-case time complexity, which is often faster than many other sorting algorithms, and it is commonly used in practice for its speed and versatility. However, its worst-case time complexity can be less favorable, which has led to variations and optimizations of the algorithm.",
  merge: "Merge Sort is an efficient, comparison-based sorting algorithm that follows the divide-and-conquer strategy. It divides the unsorted list into smaller sublists, recursively sorts these sublists, and then merges them to produce a sorted list. Merge Sort is known for its stability, predictable performance, and consistent time complexity, making it a popular choice for sorting large datasets.",
  heap: "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure to achieve sorting. It first builds a max-heap (or min-heap) from the input array and then repeatedly extracts the maximum (or minimum) element from the heap and places it at the end of the sorted array. Heap Sort combines the advantages of both merge sort and insertion sort, making it efficient for large datasets and offering a guaranteed worst-case time complexity.",
  counting: "Counting Sort is a non-comparison-based sorting algorithm that works by determining the count or frequency of each distinct element in the input array. It creates a counting array to keep track of these counts and then constructs a sorted output array by mapping each element to its appropriate position based on the counts. Counting Sort is particularly efficient when sorting integers within a known range and has a linear time complexity, making it one of the fastest sorting algorithms for such scenarios. However, it is less suitable for sorting data with a wide range of values or non-integer data."
};

const speedValue = document.getElementById('sort_speed');
let velocity = 1;

speedValue.addEventListener('input', () => {
  const speed = parseInt(speedValue.value);
  speedValue.textContent = speed;
  velocity = speed;
});

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


function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function resetBarColors() {
  const bars = document.getElementsByClassName('bar');
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = finalColor;
  }
}

function randomizeAndRestart() {
  createRandomArray();
  bars_container.innerHTML = '';
  renderBars(unsorted_array);
}

async function startSorting() {
  await sleep(400);
  if (selectedAlgorithm === "bubble") {
    await bubbleSort(unsorted_array.slice());
  } else if (selectedAlgorithm === "selection") {
    await selectionSort(unsorted_array.slice());
  } else if (selectedAlgorithm === "insertion") {
    await insertionSort(unsorted_array.slice());
  } else if (selectedAlgorithm === "quick"){
    await quickSort(unsorted_array.slice(), 0, unsorted_array.length - 1);
  } else if (selectedAlgorithm === "merge"){
    await mergeSort(unsorted_array.slice(), 0, unsorted_array.length - 1);
  } else if (selectedAlgorithm === "heap"){
    await heapSort(unsorted_array.slice());
  } else if (selectedAlgorithm === "counting"){
    await countingSort(unsorted_array);
  }
  sortingInProgress = false;
  resetBarColors();
}

function setBarColor(index, color){
  let bars = document.getElementsByClassName('bar');
  bars[index].style.backgroundColor = color;
}

function setBarHeight(index, h){
  let bars = document.getElementsByClassName('bar');
  bars[index].style.height = h * heightFactor + "px";
}

function setAlgorithmDescription(algorithm) {
  const description = algorithmDescriptions[selectedAlgorithm].replace(/\n/g, '<br>');
  algorithmDescriptionText.innerHTML = description;
}

const algorithmButtons = document.querySelectorAll(".buttons_container button");
algorithmButtons.forEach((button) => {
  button.addEventListener("click", function () {
    if (sortingInProgress) {
      return;
    }
    selectedAlgorithm = button.getAttribute("data-algorithm");
    setAlgorithmDescription(selectedAlgorithm);
    if(!first){
       randomizeAndRestart();
    } else {
      first = false;
    }
    startSorting();
  });
});
