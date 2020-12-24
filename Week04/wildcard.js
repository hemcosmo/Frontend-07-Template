function find(src, pattern) {
  let startCount = 0;
  // last *
  for (let i = 0; i < pattern.length; i += 1) {
    if (pattern[i] === "*") {
      startCount += 1;
    }
  }

  if (startCount === 0) {
    for (let i = 0; i < pattern.length; i += 1) {
      if (![src[i], "?"].includes(pattern[i])) {
        return false;
      }
    }
    return;
  }

  let p = 0; // pattern
  let lastIndex = 0;

  for (let i = 0; pattern[i] !== "*"; i += 1) {
    if (pattern[i] !== src[i] && pattern[i] !== "?") return false;
  }

  lastIndex = p;

  for (let i = 0; i < startCount - 1; i += 1) {
    p += 1;
    let subPattern = "";
    while (pattern[p] !== "*") {
      subPattern += pattern[p];
      p += 1;
    }

    const regexp = new RegExp(subPattern.replace(/\?/g, "[\\s\\S]"), "g");
    regexp.lastIndex = lastIndex;
  }

  // match tail
  for (
    let i = 0;
    i <= src.length - lastIndex && pattern[pattern.length - i] !== "*";
    i += 1
  ) {
    if (
      pattern[pattern.length - i] !== src[src.length - i] &&
      pattern[pattern.length - i] !== "?"
    ) {
      return false;
    }
  }

  return true;
}

// leetcode 44
console.log(find("abcdef", "abcd*cdef"));
