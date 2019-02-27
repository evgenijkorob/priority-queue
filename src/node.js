class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = this.left = this.right = null;
	}

	appendChild(node) {
		if (this.left == null) {
			this.left = node;
			node.parent = this;
		}
		else if (this.right == null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		switch(node.side) {
			case('left'):
				this.left = null;
				break;
			case('right'):
				this.right = null;
				break;
			default:
				throw new Error('Passed node is not a child of this node');
		}
		node.parent = null;
	}

	remove() {
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	setChildsParent(parent) {
		if (this.left != null) {
			this.left.parent = parent;
		}
		if (this.right != null) {
			this.right.parent = parent;
		}
	}

	swapWithParent() {
		if (this.parent == null) {
			return;
		}

		let oldParent = this.parent, newParent = oldParent.parent, thisOldSide = this.side, oldParentChild;
		if (this.side == 'left') {
			oldParentChild = oldParent.right;
		}
		else {
			oldParentChild = oldParent.left;
		}

		oldParent.left = this.left;
		oldParent.right = this.right;

		this.setChildsParent(oldParent);

		this[thisOldSide] = oldParent;
		if (thisOldSide == 'left') {
			this.right = oldParentChild;
		}
		else {
			this.left = oldParentChild;
		}

		if (newParent != null) {
			newParent[oldParent.side] = this;
		}

		this.parent = newParent;

		this.setChildsParent(this);
	}

	get side() {
		if (this.parent == null) {
			return undefined;
		}
		if (this.parent.left == this) {
			return 'left';
		}
		else {
			return 'right';
		}
	}
}

module.exports = Node;
