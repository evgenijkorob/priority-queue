const Node = require('./node');

function swap(x, y, arr) {
	let tmp = arr[x];
	arr[x] = arr[y];
	arr[y] = tmp;
}

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
		if (this.isEmpty()) {
			return;
		}

		let detachedRoot = this.detachRoot();
		if (!this.isEmpty()) {
			this.restoreRootFromLastInsertedNode(detachedRoot);
			this.shiftNodeDown(this.root);
		}

		return detachedRoot.data;
	}

	detachRoot() {
		let rootNode = this.root;
		this.root = null;
		if (rootNode.right == null) {
			this.parentNodes.shift();
		}
		return rootNode;
	}

	restoreRootFromLastInsertedNode(detached) {
		this.root = this.parentNodes.pop();
		if (this.root.parent
			&& this.root.parent !== detached
			&& this.root.parent.right) {
			this.parentNodes.unshift(this.root.parent);
		}

		this.root.remove();
		if (detached instanceof Node) {
			detached.setChildsParent(this.root);
			if (detached.left) {
				this.root.left = detached.left;
			}
			if (detached.right) {
				this.root.right = detached.right;
			}
		}
		if (this.root.right == null) {
			this.parentNodes.unshift(this.root);
		}
	}

	size() {
		return this.parentNodes.length;
	}

	isEmpty() {
		return !this.size();
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
		}
		else {
			let firstParent = this.parentNodes[0];
			firstParent.appendChild(node);
			if (firstParent.right != null) {
				this.parentNodes.shift();
			}
		}
		this.parentNodes.push(node);
	}

	shiftNodeUp(node) {
		if (node.parent && (node.parent.priority < node.priority)) {
			let parentIndx = -1, nodeIndx = -1;
			if (node.parent.right == null) {
				parentIndx = this.parentNodes.indexOf(node.parent);
			}
			if (node.right == null) {
				nodeIndx = this.parentNodes.indexOf(node);
			}

			if (parentIndx != -1) {
			  swap(parentIndx, nodeIndx, this.parentNodes);
			}
			else if (nodeIndx != -1) {
				this.parentNodes.splice(nodeIndx, 1, node.parent);
			}
			node.swapWithParent();
			if (node.parent == null) {
				this.root = node;
			}

			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		let maxPriorityNode = node;
		if (node.left && (maxPriorityNode.priority < node.left.priority)) {
			maxPriorityNode = node.left;
		}
		if (node.right && (maxPriorityNode.priority < node.right.priority)) {
			maxPriorityNode = node.right;
		}
		if (maxPriorityNode === node) {
			return;
		}

		let indxOfMaxPrior = -1, indxOfNode = -1;
		if (maxPriorityNode.right == null) {
			indxOfMaxPrior = this.parentNodes.indexOf(maxPriorityNode);
		}
		if (node.right == null) {
			indxOfNode = this.parentNodes.indexOf(node);
		}

		if (indxOfNode != -1 && indxOfMaxPrior != -1) {
			swap(indxOfMaxPrior, indxOfNode, this.parentNodes);
		}
		else if (indxOfMaxPrior != -1) {
			this.parentNodes.splice(indxOfMaxPrior, 1, node);
		}
		maxPriorityNode.swapWithParent();
		if (this.root === node) {
			this.root = maxPriorityNode;
		}

		this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;
