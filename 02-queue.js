export  class Queue {
    constructor (){
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }

    enqueue (element) {
        this.items[this.count] = element
        this.count++
    }

    isEmpty () {
        return this.count - this.lowestCount === 0
    }

    dequeue () {
        if (this.isEmpty()) {
            return undefined
        }
        let result = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return result
    }
    
    peek () {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items[this.lowestCount]
    }

    size () {
        return this.count - this.lowestCount
    }

    clear () {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }

    toString () {
        if (this.isEmpty()) {
            return ''
        }
        let objString = `${this.items[this.lowestCount]}`
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`
        }
        return objString
    }
}

let testQueue = new Queue()
testQueue.enqueue("q1")
testQueue.enqueue("q2")
testQueue.enqueue("q3")
testQueue.enqueue("q3")
console.log(testQueue)
testQueue.dequeue()
console.log(testQueue)
console.log(testQueue.toString())


class Deque {
    constructor () {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }

    isEmpty () {
        return this.count - this.lowestCount === 0
    }

    addBack (element) {
        this.items[this.count] = element
        this.count++
    }

    addFront (element) {
        // if (this.isEmpty()) {
        //     this.addBack(element)
        // } else if (this.lowestCount > 0) {
        //     this.lowestCount--
        //     this.items[this.lowestCount] = element
        // } else {
        //     for (let i = this.count; i > 0; i--) {
        //         this.items [i] = this.items[i-1]
        //     }
        //     this.count++
        //     this.lowestCount = 0
        //     this.items[0] = element
        // }

        this.lowestCount--
        this.items[this.lowestCount] = element
    }

    removeFront () {
        if (this.isEmpty()) {
            return undefined
        }
        let result = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount++
        return result
    }

    removeBack () {
        if (this.isEmpty()) {
            return undefined
        }
        let result = this.items[this.count - 1]
        delete this.items[this.count - 1]
        this.count--
        return result
    }

    peekFront () {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items[this.lowestCount]
    }

    peekBack () {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items[this.count - 1]
    }

    size () {
        return this.count - this.lowestCount
    }
}

let testDeque = new Deque()
testDeque.addFront("d1")
testDeque.addFront("d2")
testDeque.addFront("d3")
console.log(testDeque)
testDeque.addBack("d4")
console.log(testDeque)


console.log(testDeque.size())
console.log(testDeque.peekFront())


class QueueELement {
    constructor (element, priority) {
        this.element = element
        this.priority = priority
    }
}
class PriorityQueue {
    constructor () {
        this.items = []
    }
    
    enqueue (element, priority) {
        let quequeElement = new QueueELement(element, priority)
        let added = false

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[ i ].priority > priority) {
                this.items.splice(i, 0, quequeElement)
                added = true
                break
            }
        }

        if (!added) {
            this.items.push(quequeElement)
        }

    }

    isEmpty () {
        return this.items.length === 0
    }

    toString () {
        let result = ''
        if (this.isEmpty() ) {
            return result
        }
        for (let i = 0; i < this.items.length; i++) {
            result += `${this.items[ i ].element}-${this.items[ i ].priority}   `
        }
        console.log(result)
    }

}

let testPriorityQueue = new PriorityQueue()
testPriorityQueue.enqueue('PQ1',8)
testPriorityQueue.enqueue('PQ2',7)
testPriorityQueue.enqueue('PQ3',1)
testPriorityQueue.enqueue('PQ4',1)
testPriorityQueue.enqueue('PQ5',8)
console.log("\n",testPriorityQueue)
testPriorityQueue.toString()


function hotPotato (nameList, num) {
    let queue = new Queue()
    
    for (let i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[ i ])
    }

    let eliminated = ''

    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue())
            console.log("第",i,'次：',queue)
        }
        eliminated = queue.dequeue()
        console.log(eliminated, "在击鼓传花游戏中被淘汰。")
    }

    return queue.dequeue()
}

let names = [1,2,3,4,'heru' , 'chen', 'zhang']
let winner = hotPotato(names, 7)
console.log("赢家：", winner)