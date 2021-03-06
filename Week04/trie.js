const $ = Symbol("$"); // symbol: unique value

// use map to store values
// const Node = function () {
//   this.keys = new Map();
//   this.end = false;
//   this.isEnd = function isEnd() {
//     return this.end;
//   };
// };

class Trie {
  constructor() {
    this.root = Object.create(null);
  }

  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i += 1) {
      // create child if child not exsit
      if (!node[word[i]]) node[word[i]] = Object.create(null);
      // move to next level
      node = node[word[i]];
    }
    // $: terminator
    if (!($ in node)) node[$] = 0;
    node[$] += 1;
  }

  // traverse tree
  most() {
    let max = 0;
    let maxWord = null;
    const visit = (node, word) => {
      // check terminator
      if (node[$] && node[$] > max) {
        max = node[$];
        maxWord = word;
      }
      Object.keys(node).forEach((c) => {
        visit(node[c], word + c);
      });
    };
    visit(this.root, "");
    return { maxWord, max };
  }

  // check specified word if exsit
  search(word) {
    let node = this.root;

    while (word.length > 1) {
      if (!node[word[0]]) {
        return false;
      }
      node = node[word[0]];
      // eslint-disable-next-line no-param-reassign
      word = word.substr(1);
    }
    return !!Object.getOwnPropertySymbols(node[word]).length;
  }
}

// generate random word
// function randomWord(length) {
//   let s = "";
//   for (let i = 0; i < length; i += 1) {
//     s += String.fromCharCode(Math.random() * 26 + "a".charCodeAt(0));
//   }
//   return s;
// }

const trie = new Trie();

// for (let i = 0; i < 10000; i += 1) {
//   trie.insert(randomWord(4));
// }

// const { maxWord, max } = trie.most();
// eslint-disable-next-line no-console
// console.log(maxWord, max);

hljs.initHighlightingOnLoad();

// insert
const i = () => {
  const k = document.getElementById("input").value;
  trie.insert(k);
  document.querySelector("#preview").innerText = JSON.stringify(trie, null, 2);
  hljs.highlightBlock(document.querySelector("#preview"));
};

// most
const m = () => {
  const o = trie.most();
  Object.keys(o).forEach((key) => {
    document.getElementById("b").innerHTML += `<p>${key} : ${o[key]}</p>`;
  });
};

// search
const s = () => {
  const k = document.getElementById("input").value;
  if (k)
    document.getElementById("b").innerHTML += `<p>${k} : ${trie.search(k)}</p>`;
};

const toggle = () => {
  const s = document.querySelector(".sidebar");
  if (!s.classList.contains("hide")) {
    s.classList.add("hide");
    document.querySelector(".controller").innerText = "👉";
  } else {
    s.classList.remove("hide");
    document.querySelector(".controller").innerText = "👈";
  }
};
