// the challenge

const literalA = {
  entries: {
    x: "123",
    sa: 67,
  },
  write: function (key, value) {
    // ... code ...
  },
  read: function (key) {
    if (this.entries.hasOwnProperty(key)) {
      // ... code ...
    } else {
      // ... code ...
    }
  },
  remove: function (key) {
    if (this.entries.hasOwnProperty(key)) {
      // ... code ...
    } else {
      // ... code ...
    }
  },
};

const literalB = {
  entries: {
    chico: "marx",
    gummo: "marx",
    harpo: "marx",
    groucho: "marx",
    zeppo: "marx",
  },
  write: function (key, value) {},
  read: function (key) {},
  remove: function (key) {},
};

// the solution

class EntriesManager {
  constructor(obj) {
    if (obj !== undefined) {
      this.entries = obj;
    } else {
      this.entries = {};
    }
  }
  write(key, value) {
    this.entries[key] = value;
  }
  read(key) {
    if (this.entries.hasOwnProperty(key)) {
      return this.entries[key];
    } else {
      throw new Error(`no key: ${key}`);
    }
  }
  remove(key) {
    if (this.entries.hasOwnProperty(key)) {
      delete this.entries[key];
      return true;
    } else {
      return false;
    }  
    
  }
}

// these two lines are correct!  don't change them
const instanceA = new EntriesManager({ a: 1, b: 2 });
const instanceB = new EntriesManager();

// the tests

const test1a = instanceA instanceof EntriesManager;
const test1b = instanceB instanceof EntriesManager;
console.assert(test1a, "Test 1.A - instanceof");
console.assert(test1b, "Test 1.B ");

const test2a = instanceA.hasOwnProperty("entries");
const test2b = instanceB.hasOwnProperty("entries");
console.assert(test2a, "Test 2.A - own properties");
console.assert(test2b, "Test 2.B");

const test3a =
  !instanceA.hasOwnProperty("write") &&
  !instanceA.hasOwnProperty("read") &&
  !instanceA.hasOwnProperty("remove");
const test3b =
  !instanceB.hasOwnProperty("write") &&
  !instanceB.hasOwnProperty("read") &&
  !instanceB.hasOwnProperty("remove");
console.assert(test3a, "Test 3.A - not-own properties");
console.assert(test3b, "Test 3.B");

const test4a = JSON.stringify(instanceA.entries) === '{"a":1,"b":2}';
const test4b = JSON.stringify(instanceB.entries) === "{}";
console.assert(test4a, "Test 4.A - initial values");
console.assert(test4b, "Test 4.B");

instanceA.write("a", 3);
instanceB.write("a", 3);
const test5a = JSON.stringify(instanceA.entries) === '{"a":3,"b":2}';
const test5b = JSON.stringify(instanceB.entries) === '{"a":3}';
console.assert(test5a, "Test 5.A - write");
console.assert(test5b, "Test 5.B");

const test6a = instanceA.read("b") === 2;
let test6b;
try {
  instanceB.read("b");
  test6b = false;
} catch (err) {
  test6b = err.message === "no key: b";
}
console.assert(test6a, "Test 6.A - read");
console.assert(test6b, "Test 6.B");

const test7a = instanceA.remove("b") === true;
const test7b = instanceB.remove("b") === false;
console.assert(test7a, "Test 7.A - remove");
console.assert(test7b, "Test 7.B");

const test8a = JSON.stringify(instanceA.entries) === '{"a":3}';
const test8b = JSON.stringify(instanceB.entries) === '{"a":3}';
console.assert(test8a, "Test 8.A - final values");
console.assert(test8b, "Test 8.B");
