// lib/algoritma.js — pencarian dan pengurutan. Semua fungsi murni:
// array masukan tidak diubah, hasil berupa objek { hasil, langkah }.

/**
 * Linear search: periksa satu per satu dari depan. O(n)
 * @param {Array<number|string>} arr Array (tidak harus terurut)
 * @param {number|string} target Nilai yang dicari
 * @returns {{indeks:number, langkah:number}} indeks -1 jika tidak ketemu
 */
export function linearSearch(arr, target) {
  let langkah = 0;
  for (let i = 0; i < arr.length; i++) {
    langkah++;
    if (arr[i] === target) return { indeks: i, langkah };
  }
  return { indeks: -1, langkah };
}

/**
 * Binary search: array WAJIB terurut naik. Bagi dua setiap langkah. O(log n)
 * @param {Array<number|string>} arr Array terurut naik
 * @param {number|string} target Nilai yang dicari
 * @returns {{indeks:number, langkah:number}} indeks -1 jika tidak ketemu
 */
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

/**
 * Bubble sort: tukar pasangan bersebelahan yang terbalik. O(n²), berhenti lebih awal bila sudah terurut.
 * @param {number[]} arr Array masukan (tidak diubah)
 * @returns {{hasil:number[], perbandingan:number}} Array terurut naik dan jumlah perbandingan
 */
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
    if (!adaTukar) break; // sudah terurut, berhenti lebih awal
  }
  return { hasil: a, perbandingan };
}

/**
 * Selection sort: cari yang terkecil, taruh di depan. O(n²)
 * @param {number[]} arr Array masukan (tidak diubah)
 * @returns {{hasil:number[], perbandingan:number}} Array terurut naik dan jumlah perbandingan
 */
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

/**
 * Insertion sort: sisipkan setiap elemen ke posisi yang tepat di bagian kiri. O(n²), cepat untuk data hampir terurut.
 * @param {number[]} arr Array masukan (tidak diubah)
 * @returns {{hasil:number[], perbandingan:number}} Array terurut naik dan jumlah perbandingan
 */
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

/**
 * Urutkan array objek berdasarkan satu kolom angka dengan insertion sort (stabil).
 * @param {object[]} daftar Array objek (tidak diubah)
 * @param {string} kolom Nama kolom angka, misalnya "harga"
 * @returns {object[]} Array baru terurut naik
 */
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
