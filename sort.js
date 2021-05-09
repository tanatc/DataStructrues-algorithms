import { swap } from "./utils.js"

function createNonSortedArray (size) {
    const array = []
    for (let i = 0; i < size; i++) {
        array.push(Math.floor( Math.random() * 100 ) )
    }
    return array
}

function bubbleSort (array) {
    const {length} = array
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (array[j] > array[j + 1] ) {
                [ array[j], array[j + 1] ] =[ array[j + 1], array[j] ]
            }
        }
    }
    return array
}

// console.log("冒泡排序：")
// const a = createNonSortedArray(5)
// console.log(a)
// bubbleSort(a)
// console.log(a)


function selectionSort (array) {
    const { length} = array
    let indexMin
    for (let i = 0; i < length; i++) {
        indexMin = i
        for (let j = i; j < length; j++) {
            if (array[indexMin] < array[j]) {
                indexMin = j
            }
        }
        if (i !== indexMin) {
            [ array[i], array[indexMin] ] =  [ array[indexMin], array[i] ]
        }
    }
    return array
}

// console.log("选择排序：")
// const a = createNonSortedArray(5)
// console.log(a)
// selectionSort(a)
// console.log(a)

// let path = '/./'
// const paths = path.split('/')
// console.log(paths)
// let x = [1,2]
// console.log(x.join('/'))


function insertionSort (array) {
    const { length } = array
    let temp 
    for (let i = 1; i < length; i++) {
        let j = i;
        temp = array [i]
        while (j > 0 && array[j - 1] > temp) {
            array[j] = array[j - 1]
            j--
        }
        array[j] = temp
    }
    return array
}

// console.log("插入排序：")
// const a = createNonSortedArray(5)
// console.log(a)
// insertionSort(a)
// console.log(a)
function merge (left, right) {
    let i = 0;
    let j = 0;
    const res = []
    while (i < left.length && j < right.length) {
        res.push(left[i] < right[j] ? left[i++] : right[j++])
    }
    return res.concat(i < left.length ? left.slice(i) : right.slice(j))
}

function mergeSort (array) {
    if (array.length > 1) {
        const {length} = array
        const middle = Math.floor(length / 2)
        const left = mergeSort(array.slice(0, middle))
        const right = mergeSort(array.slice(middle, length))
        array = merge(left, right)
    }
    return array
}




// console.log("归并排序：")
// const a = createNonSortedArray(5)
// console.log(a)
// mergeSort(a)
// console.log(a)

function quickSort (array) {
    return quick(array, 0, array.length - 1)
}
function quick (array, left, right) {
    let index
    if (array.length > 1) {
        index = partition(array, left, right)
        if (left < index - 1) {
            quick(array, left, index - 1)
        }
        if (right > index) {
            quick(array, index, right)
        }
    }
    return array
}

function partition (array, left, right) {
    const pivot = array[ Math.floor( (right + left) / 2 ) ]
    let i = left
    let j = right
    while (i <= j) {
        while (array[i] < pivot) {
            i++
        }
        while (array[j] > pivot) {
            j--
        }
        if (i <= j) {
            swap(array, i, j)
            i++
            j--
        }
    }
    return i
}

// console.log("快速排序：")
// const a = createNonSortedArray(5)
// console.log(a)
// quickSort(a)
// console.log(a)

function countingSort (array) {
    if (array.length < 2) {
        return array
    }
    const maxValue = findMaxValue(array)
    const counts = new Array(maxValue + 1)
    array.forEach(element => {
        if (!counts[element]) {
            counts[element] = 0
        }
        counts[element]++
    });
    console.log(counts)
    let sortedIndex = 0
    counts.forEach( (count, i) => {
        while (count > 0) {
            array[sortedIndex++] = i
            count--
        }
    })
    return array
}
function findMaxValue (array) {
    let max = array[0]
    for (let i = 1; i < array.length; i++) {
        max = array[i] > max ? array[i] : max
    }
    return max
}

// console.log("计数排序：")
// const a = createNonSortedArray(5)
// console.log(a)
// countingSort(a)
// console.log(a)

function bucketSort (array, bucketSize = 5) {
    if (array.length < 2) {
        return array
    }
    const buckets = createBuckets(array, bucketSize)
    return sortBuckets(buckets)
}

function createBuckets(array, bucketSize) {
    let minValue = array[0]
    let maxValue = array[0]
    for (let i = 1; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i]
        } else if (array[i] > maxValue) {
            maxValue = array[i]
        }
    }

    const bucketCount = Math.floor( (maxValue + minValue) / bucketSize ) + 1
    const buckets = []
    for (let i = 0; i < bucketCount; i++) {
        buckets[i] = []
    }
    for (let i = 0; i < array.length; i++) {
        const bucketIndex = Math.floor( (array[i] - minValue) / bucketSize )
        buckets[bucketIndex].push(array[i])
    }
    return buckets
}

function sortBuckets (buckets) {
    const sortedArray = []
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] != null) {
            insertionSort(buckets[i])
            sortedArray.push(...buckets[i])
        }
    }
    return sortedArray
 }

//  console.log("桶排序：")
// const a = createNonSortedArray(10)
// console.log(a)
// bucketSort(a, 5)
// console.log(a)

function radixSort (array, radixBase = 10) {
    if (array.length < 2) {
        return array
    }
    let minValue = array[0]
    let maxValue = array[0]
    for (let i = 1; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i]
        } else if (array[i] > maxValue) {
            maxValue = array[i]
        }
    }

    let significantDigit = 1
    while ( (maxValue - minValue) / significantDigit >= 1) {
        array = countingSortForRadix(array, radixBase, significantDigit, minValue)
        significantDigit *= radixBase
    } 
    return array
}

let n1 = 0
function k () {
    let n2 = 0
    return function() {
        let n3 = 0
        console.log('n1:',++n1)
        console.log('n2:',++n2)
        console.log('n3:',++n3)
    }
    // y()
}
// let x = k()
// console.log('------------------')
// x()
// console.log('------------------')
// x()
// console.log('------------------')
// x()
// console.log('------------------')
// x()

//  Definition for a binary tree node.
 function TreeNode(val, left, right) {
     this.val = (val===undefined ? 0 : val)
     this.left = (left===undefined ? null : left)
     this.right = (right===undefined ? null : right)
 }

// var buildTree = function(preorder, inorder) {
//     if (!preorder.length) {
//         console.log(1)
//         return null
//     } else if (preorder.length == 1 ) {
//         console.log(2)

//         return new TreeNode(preorder[0])
//     } else if (preorder[0] == inorder[0]) { 
//         console.log(3)
//         let root = new TreeNode(preorder[0])
//         root.right = buildTree(preorder.slice(1), inorder.slice(1))
//         return root
//     } else {
//         console.log(4)
//         let root = new TreeNode(preorder[0])
//         let pleftstart = 1,
//         pleftend = preorder.indexOf(inorder[0]) + 1,
//         prightstart = preorder.indexOf(inorder[0]) + 1,
//         prightend = preorder.length,
//         ileftstart = 0,
//         ileftend = inorder.indexOf(preorder[0]),
//         irightstart = inorder.indexOf(preorder[0]) + 1,
//         irightend = inorder.length
       
//         root.left = buildTree(preorder.slice(pleftstart, pleftend), inorder.slice(ileftstart, ileftend))
//         root.right = buildTree(preorder.slice(prightstart, prightend), inorder.slice(irightstart, irightend))
//         return root
//     }

// };
// let preorder = [1,2,3], inorder = [3,2,1]
// console.log(buildTree(preorder, inorder))


var buildTree = function(inorder, postorder) {
    if (!inorder.length) {
        return null
    } else if (inorder.length == 1) {
        return new TreeNode(postorder[0])
    }
    const hashMap = new Map()
    inorder.forEach((item, index) => {
        hashMap.set(item, index)
    })
    console.log(hashMap)
    const healper = (i_start, i_end, p_start, p_end) => {
        if ( i_start > i_end) {
            console.log(1)
            return null
        } else if (p_start == p_end) {
            console.log(2)

            return new TreeNode(postorder[p_end])
        }  else {
            console.log(3)

            let root = new TreeNode(postorder[p_end])
            let mid = hashMap.get(postorder[p_end])
            root.left = healper(i_start, mid -1, p_start, mid -1)
            root.right = healper(mid + 1, i_end, mid, p_end - 1)
            return root
        }
    }
    let root = healper(0, inorder.length - 1, 0, postorder.length - 1)
    return root
};


let preorder = [9,3,15,20,7], inorder = [9,15,7,20,3]
// console.log(buildTree(preorder, inorder))

const hashMap = new Map()
inorder.forEach((item, index) => {
    hashMap.set(item, index)
})
// console.log(hashMap)
// console.log(hashMap.get(3))

function test () {
    var i = 5
    {var i = 6
    console.log(i)}
    console.log(i)
}
// test()
// let p1 = new Promise((resolve, reject) => {
//     console.log("------")
//     setTimeout(resolve, 5000)
// })
// p1.then(()=> console.log('123'))
// console.log(p1 )

const quickSorts = (intervals, start, end) => {
    let left = start, right = end, temp = intervals[start], target = intervals[start][0]
    while (left < right) {
        while (left < right && target <= intervals[right][0]) {
            right--
        }
        intervals[start] = intervals[right]
        // [intervals[right], intervals[start]] = [intervals[start], intervals[right]]

        while (left < right && target >= intervals[left][0] ) {
            left++
        }
        intervals[right] = intervals[left]
        // [intervals[left], intervals[start]] = [intervals[start], intervals[left]]
        
    }
    // let temp = intervals[start]
    // intervals[start] = intervals[left]
    intervals[left] = temp
    quickSorts(intervals, start, left - 1)
    quickSorts(intervals, left + 1, end)
}
const intervals = [[2,3],[9,10],[1,6],[8,10],[15,18]]
// console.log(intervals)

// intervals.sort((a,b) => b[0] - a[0])
// console.log(intervals)
// quickSorts(intervals, 0, intervals.length - 1)
// console.log(intervals)
// for (let i = 0; i < 10; i++) {
//     setTimeout(function(){console.log(i)}, 0.1)
// }

function isAvailableEmail(sEmail) {
    let regexp = new RegExp(/^([\w+\.])+@\w+([.]\w+)+$/)
    return regexp.test(sEmail)
}
let s = 'a.@a.c'
console.log(isAvailableEmail(s))