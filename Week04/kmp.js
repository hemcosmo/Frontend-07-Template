function kmp(src, pattern) {
  const table = new Array(pattern.length).fill(0);
  {
    let i = 1; // index
    let j = 0; // count

    while (i < pattern.length) {
      if (pattern[i] === pattern[j]) {
        j += 1;
        // if (i === pattern.length - 1) {
        //   table[i] = j;
        //   break;
        // }
        i += 1;
        table[i] = j;
      } else if (j > 0) j = table[j];
      else {
        i += 1;
      }
    }
  }

  {
    let i = 0; // source
    let j = 0; // pattern

    while (i < src.length) {
      if (pattern[j] === src[i]) {
        i += 1;
        j += 1;
      } else if (j) j = table[j - 1];
      else {
        i += 1;
      }
      // base case
      if (j === pattern.length) {
        return true;
      }
    }
    return false;
  }
}

console.log(kmp("mississippi", "issip"));
// assignment record position
// leetcode 28 208
