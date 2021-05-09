class Node {
    constructor (element) {
        this.element = element
        this.next = null
    }
}
class linkedList {
    constructor () {
        this.head = null
        this.length = 0
    }

    isEmpty () {
        return this.length === 0
    }

    append (element) {
        let newNode = new Node(element)

        if (this.isEmpty()) {
            this.head = newNode
            this.length++
        } else {
            let currentNode = this.head
            while (currentNode.next) {
                currentNode = currentNode.next
            }
            currentNode.next = newNode
            this.length++
        }

    }

    remove (position) {
        if (position > -1 && position < length) {
            let current = this.head, previous, index = 0
            if (position == 0) {
                this.head = current.next
            } else {
                while (index++ < position) {
                    previous = current
                    current = current.next
                }
                previous.next = current.next
            }
            this.length--
            return current.element
        } else {
            return null
        }
    }

    insert (position, element) {
        let currentNode = this.head
        let newNode = new Node(element)
        let previous, index = 0

        if (position < 0 || position > this.length) {
            console.log("位置错误")
            return false
        }else if (position == 0) {
            newNode.next = currentNode
            this.head = newNode
        } else {
           while (index++ < position) {
               previous  = currentNode
               currentNode = currentNode.next
           }
           newNode.next = currentNode
           previous.next = newNode
            
        }
        this.length++
        return true

    }

    toString () {
        let current = this.head,
        string = ''
        while(current) {
            string += `${current.element}` + (current.next ? `,` : ``)
            current = current.next
        }
        console.log(string)
        return string
    }

    indexOf (element) {
        if (this.isEmpty()) {
            return -1
        }

        let current = this.head, index = -1, currentIndex = -1
        
        while (current) {
            currentIndex++
            if (current.element == element) {
                index = currentIndex
                break
            }
            current = current.next

        }
        return index

    }

    size () {
        return this.length
    }

    getHead () {
        return this.head
    }


}

let testLinkedList = new linkedList()
console.log(testLinkedList)
testLinkedList.append(11)
testLinkedList.append(11)
testLinkedList.append(3)
testLinkedList.insert(3,'x')



console.log(testLinkedList)
testLinkedList.toString()
console.log(testLinkedList.indexOf('y'))
console.log(testLinkedList.getHead())


class DoublyNode extends Node {
    constructor (element, next, prev) {
        super(element, next)
        this.prev = prev
    }
}

class DoublyLinkedList {
    constructor () {
        this.count = 0
        this.head = undefined
        this.tail = undefined
    }

    insert (element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(element)
            let current = this.head
            if (index === 0) {
                if (this.head == null) {
                    this.head = node
                    this.tail = node
                } else {
                    node.next = this.head
                    current.prev = node
                    this.head = node
                }
            } else if (index === this.count) {
                current = this.tail
                current.next = node
                node.prev = current
                this.tail = node
            } else {
                const previous = this.getElementAt(index - 1)
                current = previous.next
                node.next = current
                current.prev = node
                node.prev = previous
                previous.next = node
            }

            this.count++
            return true
        }
        
        return false
    }

    removeAt (index) {
        if (index >= 0 && index < this.count) {
            let current = this.head
            if (index == 0) {
                this.head = current.next
                if (this.count == 1) {
                    this.tail = undefined
                } else {
                    current.next.prev = undefined
                }
                
            } else if (index == this.count - 1) {
                current = this.tail
                current.prev.next = undefined
                this.tail = current.prev
            } else {
                current = this.getElementAt(index)
                const previous = current.prev
                next = current.next
                next.prev = previous
                previous.next = next
            }
            this.count--

            return current.element 
        }
        
        return undefined
    }
}

