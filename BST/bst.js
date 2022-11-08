
function isValidBinaryTree(inputTree) {
    // a key => value array containing the relation between child node and parent node respectively
    const edges = new Map(inputTree.map(edge => edge.match(/\d+/g)));

    // the tree is invalid if there is at least one node with 2 parents
    if (edges.size < inputTree.length)
        return false;

    // the tree is invalid if there is at least one node with 3 childredn
    const degree = {};
    for (const [child, parent] of edges) {
        if ((++degree[parent] || (degree[parent] = 1)) > 2)
            return false;
    }

    // the tree is invalid if there are more than one root or a cycle occurs
    const nodes = {};
    let current = 0;
    let countRoots = 0;
    for (let node of edges.keys()) {
        current++;
        while (node && !nodes[node]) {
            nodes[node] = current;
            node = edges.get(node);
        }
        if (!node && countRoots++)
            // the tree is disconnected
            return false;
        if (node && nodes[node] === current)
            // the tree has cycle
            return false;
    }

    return true;
}

console.log(isValidBinaryTree(['(1,2)', '(2,4)', '(7,2)']));