class Set {
    constructor () {
        this.items = {}
    }

    has (element) {
        return element in this.items
    }

    add (element) {
        if (this.has(element)) {
            return false
        } else {
            this.items[element] = element
            return true
        }
    }

    delete (element) {
        if (this.has(element) ) {
            delete this.items[element]
            return true
        }

        return false
    }

    size () {
        return Object.values(this.items).length
    }

    values () {
        return  Object.values(this.items)
    }

    union (otherSet) {
        const unionSet = new Set()
        this.values().forEach(element => {
            unionSet.add(element)
        });
        otherSet.values().forEach(element => {
            unionSet.add(element)
        })
        return unionSet
    }

    intersection(otherSet) {
        const intersectionSet = new Set()
        this.values().forEach(element => {
            if (otherSet.has(element)) {
                intersectionSet.add(element)
            }
        })

        return intersectionSet
    }
    
    difference (otherSet) {
        const differenceSet = new Set()
        this.values().forEach(element => {
            if(!otherSet.has(element)) {
                differenceSet.add(element)
            }
        })

        return differenceSet
    }
}
let testSet = new Set()
testSet.add(1)
testSet.add('x')

console.log(testSet)
console.log(testSet.size())
let testSet2 = new Set()
testSet2.add(1)
testSet2.add('y')
console.log(testSet2)
testSet2.union(testSet)
console.log(testSet2.union(testSet))
console.log(testSet2.intersection(testSet))
console.log(testSet2.difference(testSet))

for (var i = 0,j = 9; i < 5; i++) {

}
console.log(i)
console.log(j)




