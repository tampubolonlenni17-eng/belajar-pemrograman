// lib/algoritma.js — pencarian dan pengurutan. Semua fungsi murni.

export function linearSearch(arr, target) {
  let langkah = 0;
  for (let i = 0; i < arr.length; i++) {
    langkah++;
    if (arr[i] === target) return { indeks: i, langkah };
  }
  return { indeks: -1, langkah };
}

export function binarySearch(arr, target) {
  let kiri = 0;
  let kanan = arr.length - 1;
  let langkah = 0;
  while (kiri <= kanan) {
    langkah++;
    const tengah = Math.floor((kiri + kanan) / 2);
    if (arr[tengah] === target) return { indeks: tengah, langkah };
    if (arr[tengah] < target) kiri = tengah + 1;
    else kanan = tengah - 1;
  }
  return { indeks: -1, langkah };
}

export function bubbleSort(arr) {
  const a = [...arr];
  let perbandingan = 0;
  for (let i = 0; i < a.length - 1; i++) {
    let adaTukar = false;
    for (let j = 0; j < a.length - 1 - i; j++) {
      perbandingan++;
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        adaTukar = true;
      }
    }
    if (!adaTukar) break;
  }
  return { hasil: a, perbandingan };
}

export function selectionSort(arr) {
  const a = [...arr];
  let perbandingan = 0;
  for (let i = 0; i < a.length - 1; i++) {
    let iMin = i;
    for (let j = i + 1; j < a.length; j++) {
      perbandingan++;
      if (a[j] < a[iMin]) iMin = j;
    }
    if (iMin !== i) [a[i], a[iMin]] = [a[iMin], a[i]];
  }
  return { hasil: a, perbandingan };
}

export function insertionSort(arr) {
  const a = [...arr];
  let perbandingan = 0;
  for (let i = 1; i < a.length; i++) {
    const kunci = a[i];
    let j = i - 1;
    while (j >= 0) {
      perbandingan++;
      if (a[j] <= kunci) break;
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = kunci;
  }
  return { hasil: a, perbandingan };
}

export function urutkanBerdasarkan(daftar, kolom) {
  const a = [...daftar];
  for (let i = 1; i < a.length; i++) {
    const kunci = a[i];
    let j = i - 1;
    while (j >= 0 && a[j][kolom] > kunci[kolom]) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = kunci;
  }
  return a;
}