import Nodemodel from './node.model.js';

class Treemodel{
    constructor(){
        this.root = null;
    }

    insert(key, value){
        if(!Number.isInteger(key)) return;
        const newNode = new Nodemodel(key, value);
        if(this.root===null) this.root = newNode;
        else this.insertNode(this.root, newNode);
    }

    insertNode(node, newNode){
        if(newNode.key < node.key){
            if(node.left === null) node.left = newNode;
            else this.insertNode(node.left, newNode);
        }else if(node.key === newNode.key) node.value = newNode.value;
        else {
            if(node.right === null) node.right = newNode;
            else this.insertNode(node.right, newNode);
        }
    }

    remove(key){
        if(!Number.isInteger(key)) return;
        this.root = this.removeNode(this.root, key);
    }

    removeNode(node, key){
        if(node===null)return null;
        else if(node.key < key){
            node.right = this.removeNode(node.right, key);
            return node;
        }else if(node.key > key){
            node.left = this.removeNode(node.left, key);
            return node;
        }else{
            if(node.left === null && node.right === null){ //leaf Node
                node = null;
                return node;
            }
            if(node.left === null){ // Have right child
                node = node.right;
                return node;
            }else if(node.right === null){ // Have left child
                node = node.left;
                return node;
            }
            const aux = this.minimumNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key);
            return node;
        }
    }

    inorder(node, fn){
        if(node !== null){
            this.inorder(node.left, fn);
            fn(node);
            this.inorder(node.right, fn);
        }
    }

    preorder(node, fn){
        if(node !== null){
            fn(node);
            this.preorder(node.left, fn);
            this.preorder(node.right, fn);
        }
    }

    postorder(node, fn){
        if(node !== null){
            this.postorder(node.left, fn);
            this.postorder(node.right, fn);
            fn(node);
        }
    }

    breadthFirst(node, fn){
        const queue = [node];
        while(queue.length > 0){
            if(queue[0].left !== null) queue.push(queue[0].left);
            if(queue[0].right !== null) queue.push(queue[0].right);
            fn(queue.shift());
        }
    }

    ZigZag(node, fn){
        const stack1 = [node];
        const stack2 = [];
        while(stack1.length >0 || stack2.length>0){
            if(stack1.length>0){
                while(stack1.length>0){
                    if(stack1[stack1.length-1].left !== null)stack2.push(stack1[stack1.length-1].left);
                    if(stack1[stack1.length-1].right !== null)stack2.push(stack1[stack1.length-1].right);
                    fn(stack1.pop());
                }
            }else{
                while(stack2.length>0){
                    if(stack2[stack2.length-1].right !== null)stack1.push(stack2[stack2.length-1].right);
                    if(stack2[stack2.length-1].left !== null)stack1.push(stack2[stack2.length-1].left);
                    fn(stack2.pop());
                } 
            }
        }
    }

    minimumNode(node){
        if(node.left === null) return node;
        else return this.minimumNode(node.left);
    }

    findingKey(node, fn, key) {
        let flag  = false;
        while(node!==null){
            if(node.key < key){
                fn(node);
                node = node.right;
            }else if (node.key > key){
                fn(node);
                node = node.left;
            }else{
                fn(node);
                flag = true;
                break;
            }
        }
        return flag;

    }

}

export default Treemodel;