function swap(array, a, b) {
    [ array[a], array[b] ] = [ array[b], array[a] ]
}
class MinHeap {
    constructor() {
        this.heap = []
    }

    getLeftIndex (index) {
        return 2 * index + 1
    }

    getRightIndex (index) {
        return 2 * index + 2
    }

    getParentIndex (index) {
        if (index == 0) {
            return undefined
        }
        return Math.floor( (index - 1) / 2 )
    }

    insert (value) {
        if (value != null) {
            this.heap.push(value)
            this.siftUp(this.heap.length - 1)
            return true
        }
        return false
    }

    siftUp (index) {
        let parent = this.getParentIndex(index)
        while(index > 0 && this.heap[parent] > this.heap[index]) {
            swap(this.heap, index, parent)
            index = parent
            parent = this.getParentIndex(index)
        }
    }

    size () {
        return this.heap.length
    }

    isEmpty () {
        return this.size() === 0
    }

    findMiniMun() {
        return this.isEmpty() ? undefined : this.heap[0]
    }

    extract () {
        if (this.isEmpty()) {
            return undefined
        } else if (this.size() == 1) {
            return this.heap.shift()
        } else {
            let minMun = this.heap.shift()
            this.siftDown(0)
            return minMun
        }
    }

    siftDown (index) {
        let element = index
        const left = this.getLeftIndex(index)
        const right = this.getRightIndex(index)
        const size = this.size()
        if (left < size && this.heap[element] > this.heap[left]) {
            element = left
        }
        if (right < size && this.heap[element] > this.heap[right]) {
            element = right
        }
        if (index != element) {
            swap(this.heap, index, element) 
            this.siftDown(element)
        }
    }
}

// let testMinHeap = new MinHeap()
// for (let i = 0; i < 10; i++) {
    // testMinHeap.insert(i)
// }
// testMinHeap.insert(-8)
// testMinHeap.insert(-8)


// console.log(testMinHeap)
// console.log("extract minmun:",testMinHeap.extract())
// console.log(testMinHeap)

function heapSort (array) {
    let heapSize = array.length
    buildMinHeap (array) 
    while (heapSize > 1) {
        swap(array, 0, --heapSize)
        heapify(array, 0, heapSize)
    }
    return array
}
function buildMinHeap (array) {
    for (let i = Math.floor(array.length / 2); i >= 0; i -= i) {
        heapify (array, i, array.length)
    }
    return array
}
function heapify (array, i, size) {
    let element = i
    const left = i + 1
    const right = i + 2
    if (left < size && array[element] > array[left]) {
        element = left
    }
    if (right < size && array[element] > array[right]) {
        element = right
    }
    if (i != element) {
        swap(array, i, element) 
        heapify(array, element, size - 1)
    }
}

const array = [8,9,2,3,5,1]
console.log(array)
heapSort(array)
console.log(array)
