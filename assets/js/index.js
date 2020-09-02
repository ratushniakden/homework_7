"use strict";

class Stack {
  constructor(maxSize = 1000) {
    if (typeof maxSize !== "number") {
      throw new TypeError("size must be a number");
    }
    if (maxSize < 1) {
      throw new RangeError("must be a positive number");
    }

    this._maxSize = maxSize;
    this._size = 0;
  }

  get maxSize() {
    return this._maxSize;
  }

  get isEmpty() {
    return this.size === 0;
  }

  get size() {
    return this._size;
  }

  set size(value) {
    this._size = value;
  }

  push(value) {
    if (this.size >= this.maxSize) {
      throw new RangeError("Stack overflow");
    }
    this[this.size++] = value;
    return this.size;
  }

  pop() {
    if (this.isEmpty) {
      return;
    }
    const deletedElement = this[--this.size];
    delete this[this.size];
    return deletedElement;
  }

  peek() {
    if (this.isEmpty) {
      return;
    }
    return this[this.size - 1];
  }
}

function isBalanced(str) {
  if (str.isEmpty) {
    return true;
  }

  const stack = new Stack();

  for (const brace of str) {
    if (brace == "{" || brace == "(" || brace == "[" || brace === "<") {
      stack.push(brace);
    }

    if (brace == "}" || brace == ")" || brace == "]" || brace === ">") {
      if (stack.isEmpty) {
        return false;
      }
      if (
        (brace === "}" && stack.peek() === "{") ||
        (brace === ")" && stack.peek() === "(") ||
        (brace === "]" && stack.peek() === "[") ||
        (brace === ">" && stack.peek() === "<")
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.isEmpty;
}

class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  addNode(value) {
    const node = new ListNode(value);

    if (this.length === 0) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }

  getNodeByIndex(index) {
    if (this.length === 0 || index < 0 || index > this.length) {
      throw new RangeError("Not in list");
    }

    let current = this.head;
    let count = 0;

    while (count < index) {
      current = current.next;
      count++;
    }
    return current;
  }
  [Symbol.iterator]() {
    return new LinkedListIterator(this);
  }
}

class LinkedListIterator {
  /**
   *
   * @param {LinkedList} list
   */
  constructor(list) {
    this.iterable = list.head;
  }

  next() {
    if (this.iterable) {
      const value = this.iterable.value;
      this.iterable = this.iterable.next; // i++

      return {
        value,
        done: false,
      };
    }
    return { done: true };
  }
}

const input = prompt("Enter integer numbers:");
console.log(inputWithoutDuplicates(input));

function inputWithoutDuplicates(string) {
  if (string === null) {
    return;
  }
  const list = new LinkedList();
  list.addNode(string.charAt(0));
  for (let i = 0; i < string.length - 1; i++) {
    if (string.charAt(i) !== string.charAt(i + 1)) {
      list.addNode(string.charAt(i + 1));
    }
  }
  return list;
}
