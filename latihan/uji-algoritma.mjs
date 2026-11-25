import * as A from "../lib/algoritma.js";

const data = [29, 10, 14, 37, 13];
console.log(A.bubbleSort(data));
console.log(A.selectionSort(data));
console.log(A.insertionSort(data));
console.log("asli tetap:", data);

const urut = [3, 8, 12, 19, 25, 31, 42, 56, 67, 78, 85, 91, 99];
console.log(A.linearSearch(urut, 85), A.binarySearch(urut, 85));
console.log(A.linearSearch(urut, 50), A.binarySearch(urut, 50));

const besar = Array.from({ length: 1000 }, (_, i) => i * 2);
console.log(A.linearSearch(besar, 1998).langkah, A.binarySearch(besar, 1998).langkah);

console.log(
  A.bubbleSort([1, 2, 3, 4, 5]).perbandingan,
  A.insertionSort([1, 2, 3, 4, 5]).perbandingan,
  A.selectionSort([1, 2, 3, 4, 5]).perbandingan
);

console.log(
  A.urutkanBerdasarkan(
    [{ n: "A", h: 5000 }, { n: "B", h: 2000 }, { n: "C", h: 3500 }],
    "h"
  ).map((x) => x.n)
);