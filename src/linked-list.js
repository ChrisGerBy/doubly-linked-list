const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        let node = new Node(data);
        if (!this._head) {
            this._head = node;
            this._tail = node;
            this.length ++;
        } else {
            node.prev = this._tail;          
			this._tail.next = node;         
			this._tail = node;
            this.length ++;
        }
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        let current = this._head;
        if (index === 0) {
            return this._head.data;
        } else {
            while (index > 0) {
                current = current.next;
                index --;
            }
            return current.data;
        }
    }

    insertAt(index, data) {
        let node = new Node(data);        
        if (index === 0) {
            let next;
            this._head = node;
            if (this.length) {
                next = this._head;
            } else {
                next = null;
                this._tail = node;
            }
            node.next = next;
            this.length ++;            
        } else {
            let current = this._head;
            while (index > 0) {
                current = current.next;
                index --;
            }
            current.prev.next = node;
            node.prev = current.prev;
            current.prev = node;
            node.next = current;
            this.length ++;
        }
        return this;
    }

    isEmpty() {
       let result = (this.length === 0) ?  true : false;
        return result;
    }

    clear() {
        if (this.length !== 0) {
            let current = this._head;	
            while (current.next) {
                current.next = null;
            }
            this._head.data = null;
            this._tail.data = null;
            this.length = 0;
        }
      return this;
    }

    deleteAt(index) {
        if (this.length === 1 && index === 0) {
            this._head = null;
            this._tail = null;
            this.length --;
        } else {
            let current = this._head;
            while (index > 0) {
                current = current.next;
                index --;
            }
            current.prev.next = current.next;
            current.next.prev = current.prev;
            this.length--;
        }
        return this;
    }

    reverse() {
        if (this.length === 0) {
            return this;
        } else {           
            let counter = this.length - 1;
            let tail = this._tail;
            let next = null;
            while (counter > 0) {
                let node = this._head;  // node - то что переносим
                this._head = node.next;
                tail.next = node;
                node.next = next;
                node.prev = this._tail;
                this._head.prev = null;
                next = node;
                counter --;
                if(node.next === null) {
                    this._tail = node;
                }
            }
            return this;
        }
        
    }

    indexOf(data) {
        let current = this._head;
        let count = 0;
        while (count <= (this.length - 1) && data !== current.data) {
            current = current.next;
            count ++;
        }
        if (current) {
            return count;
        } else {
            return -1;
        }
        

    }
}

module.exports = LinkedList;
