class Node {
    constructor (key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor () {
        this.root = null
    }

    insert (key) {
        if (this.root == null) {
            this.root = new Node(key)
        } else {
            this.insertNode(this.root, key)
        }
    }

    insertNode (node,key) {
        if (node.key < key) {
            if (node.right == null) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
        if (node.key > key) {
            if (node.left == null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        }
    }

    inOrderTraverse (callback) {
        this.inOrderTraverseNode(this.root, callback)
    }

    inOrderTraverseNode (node, callback) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback)
            callback(node.key)
            this.inOrderTraverseNode(node.right, callback)

        }
    }

    preOrderTraverse (callback) {
        this.preOrderTraverseNode (this.root, callback)
    }

    preOrderTraverseNode (node,callback) {
        if (node != null) {
            callback(node.key)
            this.preOrderTraverseNode(node.left, callback)
            this.preOrderTraverseNode(node.right, callback)

        }
    }

    postOrderTraverse (callback) {
        this.preOrderTraverseNode (this.root, callback)
    }

    postOrderTraverseNode (node,callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback)
            this.postOrderTraverseNode(node.right, callback)
            callback(node.key)


        }
    }

    min () {
        return this.minNode(this.root)
    }

    minNode (node) {
        let current = node
        if (current.left == null) {
            return current
        } else {
            return this.minNode(current.left)
        }
        // let current = node
        // while ( current.left != null) {
        //     current = current.left
        // }
        // return current
    }

    max () {
        return this.maxNode(this.root)
    }

    maxNode (node) {
        let current = node
        while ( current.right != null) {
            current = current.right
        }
        return current
    }

    search (key) {
       return this.searchNode(this.root, key)
    }

    searchNode (node, key) {
        // let node = current
        if (node != null) {
            if (node.key == key) {
                console.log(node.key)
                return true
            } else if (node.key > key){
                return this.searchNode(node.left, key)
            } else if (node.key < key) {
                return this.searchNode(node.right, key)
            }
        }
        return false
    }

    remove (key) {
        this.root = this.removeNode(this.root, key)
    }

    removeNode (node, key) {
        if (node == null) {
            return null
        }
        if (node.key > key) {
            node.left = this.removeNode(node.left, key)
            return node
        } else if (node.key < key) {
            node.right = this.removeNode(node.right, key)
        } else {
            if (node.left == null && node.right == null) {
                node = null
                return node
            }
            if (node.left == null) {
                node = node.right
                return node
            }
            if (node.right == null) {
                node = node.left
                return node
            }
            const minNode = this.minNode(node)
            node.key = minNode.key
            // minNode = null
            node.right = this.removeNode(node.right, minNode.key)
            return node
        }
    }
}

// let testBst = new BinarySearchTree()
// testBst.insert(4)
// testBst.insert(3)
// testBst.insert(6)
// testBst.insert(1)
// console.log(testBst)
// const printNode = (value) => {console.log(value)}
// testBst.postOrderTraverse(printNode)

// console.log(testBst.min(6))
// const x = function (callback) {
//     callback(1)
// }
// const y = (val) => {console.log(val)}
// x(function (val) {console.log(val)} )

const BalanceFactor = {
    UNBALANCE_RIGHT:1,
    SLIGHTY_UNBALANCED_RIGHT:2,
    BALANCED:3,
    SLIGHTLY_UNBALANCED_LEFT:4,
    UNBALANCED_LEFT:5
}

class AVLTree extends BinarySearchTree {
    constructor () {
        super()
        // this.root = null

    }

    getNodeHeight (node) {
        if (node == null) {
            return -1
        }

        return Math.max(
            this.getNodeHeight(node.left), this.getNodeHeight(node.right)
        ) + 1
    }

    getBalanceFactor (node) {
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCE_RIGHT
            case -1:
                return BalanceFactor.SLIGHTY_UNBALANCED_RIGHT
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            case 2:
                return BalanceFactor.UNBALANCED_LEFT
            default:
                return BalanceFactor.BALANCED
        }
    }

    rotationLL (node) {
        const tmp = node.left
        node.left = tmp.right
        tmp.right = node
        return tmp
    }

    rotationRR (node) {
        const temp = node.right
        node.right = temp.left
        temp.left = node
        return temp
    }

    rotationLR (node) {
        node.left = this.rotationLL(node.left)
        return this.rotationRR(node)
    }

    rotationRL (node) {
        node.rigth = this.rotationRR(node.right)
        return this.rotationLL(node)
    }

    insert (key) {
        this.root = this.insertNode(this.root, key)
    }

    insertNode (node, key) {
        if (node == null) {
            return new Node(key)
        } else if (key > node.key) {
            node.right = this.insertNode(node.right, key)
        } else if (key < node.key) {
            node.left = this.insertNode(node.left, key)
        } else {
            return node
        }
        // 如果需要，将树进行平衡操作
        const BalanceFactor = this.getBalanceFactor(node)
        if (BalanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            if (key < node.left.key) {
                return this.rotationLL(node)
            } else {
                return this.rotationLR(node)
            }
        }
        if (BalanceFactor === BalanceFactor.UNBALANCE_RIGHT) {
            if (key < node.right.key) {
                return this.rotationRL(node)
            }else {
                return this.rotationRR(node)
            }
        }
        return node
    }

    removeNode(node, key) {
        node = super.removeNode(node, key); // {1}
        if (node == null) {
          return node;
        }
        // verify if tree is balanced
        const balanceFactor = this.getBalanceFactor(node);
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
          // Left left case
          if (
            this.getBalanceFactor(node.left) === BalanceFactor.BALANCED ||
            this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
          ) {
            return this.rotationLL(node);
          }
          // Left right case
          if (this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
            return this.rotationLR(node.left);
          }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
          // Right right case
          if (
            this.getBalanceFactor(node.right) === BalanceFactor.BALANCED ||
            this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
          ) {
            return this.rotationRR(node);
          }
          // Right left case
          if (this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
            return this.rotationRL(node.right);
          }
        }
        return node;
      }

}

const testAVLT = new AVLTree()
testAVLT.insert(2)
testAVLT.insert(1)
testAVLT.insert(0)

console.log(testAVLT.getNodeHeight(this.root.left))