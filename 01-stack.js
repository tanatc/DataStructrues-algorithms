class Stack {
    #count
    #items
    constructor () {
        this.#count = 0
        this.#items = {}
    }
    push (element) {
        this.#items[this.#count] = element
        this.#count++
    }
    size () {
        return this.#count
    }
    isEmpty () {
        return this.#count === 0
    }
    pop () {
        if (this.isEmpty()) {
            return undefined
        }
        this.#count--
        const result = this.#items[this.#count]
        delete this.#items[this.#count]
        return result
    }
    peek () {
        if (this.isEmpty()) {
            return undefined
        }
        return this.#items[this.#count - 1]
    }
    clear () {
        this.#items = {}
        this.#count = 0
    }
    toString () {
        if (this.isEmpty()) {
            return ''
        }
        let objString = `${this.#items[0]}`;
        for (let i = 1; i < this.#count; i++) {
            objString = `${objString},${this.#items[i]}`;
        }
        return objString
    }
}
// class Stack {
//     constructor() {
//       this.count = 0;
//       this.items = {};
//     }
//     push(element) {
//       this.items[this.count] = element;
//       this.count++;
//     }
//     pop() {
//       if (this.isEmpty()) {
//         return undefined;
//       }
//       this.count--;
//       const result = this.items[this.count];
//       delete this.items[this.count];
//       return result;
//     }
//     peek() {
//       if (this.isEmpty()) {
//         return undefined;
//       }
//       return this.items[this.count - 1];
//     }
//     isEmpty() {
//       return this.count === 0;
//     }
//     size() {
//       return this.count;
//     }
//     clear() {
//       /* while (!this.isEmpty()) {
//           this.pop();
//         } */
//       this.items = {};
//       this.count = 0;
//     }
//     toString() {
//       if (this.isEmpty()) {
//         return '';
//       }
//       let objString = `${this.items[0]}`;
//       for (let i = 1; i < this.count; i++) {
//         objString = `${objString},${this.items[i]}`;
//       }
//       return objString;
//     }
//   }
let testStack = new Stack()
console.log(testStack)

testStack.push(3)
testStack.push(2)
testStack.push(1)
console.log(testStack)
console.log(testStack.pop())
console.log(testStack.toString())

function decimalToBinary(decNumber) {
    const remStack = new Stack()
    let number  = decNumber
    let rem
    let binaryString = ''

    while (number > 0) {
        rem = Math.floor(number % 2)
        remStack.push(rem)
        number = Math.floor(number / 2)
    }
    
    while (!remStack.isEmpty()) {
        binaryString += remStack.pop().toString()
    }
    
    return binaryString
}

console.log(decimalToBinary(333))

function baseConverter(decNumber, base) {
    let remStack = new Stack()
    let number = decNumber
    let result = ""
    const digist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    while (number > 0) {
        let rem = Math.floor(number % base)
        remStack.push(rem)
        number = Math.floor(number / base)
    }

    while (!remStack.isEmpty()) {
        result += digist[remStack.pop()]
    }

    return result

}
console.log(baseConverter(999,16))

