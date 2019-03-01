const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		return (this.root == null) ? 0 : this.parentNodes.length + 1;
	}

	isEmpty() {
		return !!this.size(); 
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.root == null) {
			this.root = node;
		}
		else {
			this.parentNodes.push(node);
		}
		return;
	}

	shiftNodeUp(node) {
		if (node.parent && (node.parent.priority < node.priority)) {
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		let maxPriorityNode = node.priority;
		if (node.left && (maxPriorityNode < node.left.priority)) {
			maxPriorityNode = node.left;
		}
		if (node.right && (maxPriorityNode < node.right.priority)) {
			maxPriorityNode = node.right;
		}
		if (maxPriorityNode != node) {
			maxPriorityNode.swapWithParent();
			shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
