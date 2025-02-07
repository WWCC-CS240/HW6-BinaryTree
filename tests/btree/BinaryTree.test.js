const _ = require('lodash');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const Chai = require('chai');
const Assertion = Chai.Assertion;

const expect = Chai.expect;
Chai.use(sinonChai);

const BinaryTree = require('../../src/btree/BinaryTree');

function isEqual(n1, n2) {
    if (n1 === null && n1 === n2) {
        return true;
    }

    if (n1 !== null && n2 !== null) {
        return isEqual(n1.left, n2.left) && isEqual(n1.right, n2.right);
    }

    return false;
}

Assertion.addMethod('structuredAsTree', function(values) {
    this.assert(
        isEqual(this._obj.root, values.root),
        'Expected a different tree structured'
    );
});

Assertion.addMethod('matchEither', function(...values) {
    this.assert(
        values.some((option) => _.isEqual(this._obj, option)),
        'Expected a different print order'
    );
});

describe('BinaryTree', function() {
    let tree;

    beforeEach(function() {
        tree = new BinaryTree();
    });

    it('should start with a null root', function() {
        expect(tree.root).to.be.null;
    });

    describe('insert()', function() {
        it('should insert value at root when tree is empty', function() {
            tree.insert(50);

            expect(tree.root).to.not.be.null;
            expect(tree.root.value).to.equal(50);
        });

        it('should insert values properly', function() {
            expect(tree.insert(50)).to.be.true;
            expect(tree.insert(25)).to.be.true;
            expect(tree.insert(10)).to.be.true;
            expect(tree.insert(75)).to.be.true;
            expect(tree.insert(100)).to.be.true;
            expect(tree.insert(65)).to.be.true;
            expect(tree.insert(30)).to.be.true;
            expect(tree.insert(1)).to.be.true;

            let expectedTree = {
                root: {
                    value: 50,
                    left: {
                        value: 25,
                        left: {
                            value: 10,
                            left: {
                                value: 1,
                                left: null,
                                right: null
                            },
                            right: null
                        },
                        right: {
                            value: 30,
                            left: null,
                            right: null
                        }

                    },
                    right: {
                        value: 75,
                        left: {
                            value: 65,
                            left: null,
                            right: null
                        },
                        right: {
                            value: 100,
                            left: null,
                            right: null
                        }
                    }
                }
            };

            expect(tree).to.be.structuredAsTree(expectedTree);
        });

        it('should not allow inserting duplicate values', function() {
            expect(tree.insert(50)).to.be.true;
            expect(tree.insert(25)).to.be.true;
            expect(tree.insert(50)).to.be.false;
            expect(tree.insert(10)).to.be.true;
            expect(tree.insert(75)).to.be.true;
            expect(tree.insert(75)).to.be.false;
            expect(tree.insert(100)).to.be.true;
            expect(tree.insert(65)).to.be.true;
            expect(tree.insert(30)).to.be.true;
            expect(tree.insert(10)).to.be.false;
            expect(tree.insert(1)).to.be.true;

            let expectedTree = {
                root: {
                    value: 50,
                    left: {
                        value: 25,
                        left: {
                            value: 10,
                            left: {
                                value: 1,
                                left: null,
                                right: null
                            },
                            right: null
                        },
                        right: {
                            value: 30,
                            left: null,
                            right: null
                        }

                    },
                    right: {
                        value: 75,
                        left: {
                            value: 65,
                            left: null,
                            right: null
                        },
                        right: {
                            value: 100,
                            left: null,
                            right: null
                        }
                    }
                }
            };

            expect(tree).to.be.structuredAsTree(expectedTree);
        });
    });

    describe('contains()', function() {
        it('should return false when the tree is empty', function() {
            expect(tree.contains(10)).to.be.false;
        });

        it('should return true when a value exists in the tree', function() {
            tree.insert(50);
            tree.insert(25);
            tree.insert(10);
            tree.insert(75);

            expect(tree.contains(50)).to.be.true;
            expect(tree.contains(25)).to.be.true;
            expect(tree.contains(10)).to.be.true;
            expect(tree.contains(75)).to.be.true;
        });

        it('should return false when a value does not exist in the tree', function() {
            tree.insert(50);
            tree.insert(25);
            tree.insert(10);
            tree.insert(75);

            expect(tree.contains(51)).to.be.false;
            expect(tree.contains(49)).to.be.false;
            expect(tree.contains(9)).to.be.false;
            expect(tree.contains(76)).to.be.false;
        });
    });

    describe('printBreadthFirst()', function() {
        it('should not call console.log for an empty tree', function() {
            let log = sinon.fake();
            tree.printBreadthFirst(log);
            expect(log).to.not.have.been.called;
        });

        it('should print nodes in breadth first order', function() {
            let output = [];
            let log = sinon.fake((value) => output.push(value));

            tree.insert(50);
            tree.insert(25);
            tree.insert(10);
            tree.insert(75);
            tree.insert(90);
            tree.insert(1);
            tree.insert(30);

            tree.printBreadthFirst(log);

            let expectedOutput1 = [50, 25, 75, 10, 30, 90, 1];
            let expectedOutput2 = [50, 75, 25, 90, 30, 10, 1];

            expect(log.callCount).to.equal(7);
            expect(output).to.matchEither(expectedOutput1, expectedOutput2);
        });
    });

    describe('printDepthFirst()', function() {
        it('should not call console.log for an empty tree', function() {
            let log = sinon.fake();
            tree.printDepthFirst(log);
            expect(log).to.not.have.been.called;
        });

        it('should print nodes in depth first order', function() {
            let output = [];
            let log = sinon.fake((value) => output.push(value));

            tree.insert(50);
            tree.insert(25);
            tree.insert(10);
            tree.insert(75);
            tree.insert(90);
            tree.insert(1);
            tree.insert(30);

            tree.printDepthFirst(log);

            let expectedOutput1 = [50, 25, 10, 1, 30, 75, 90];
            let expectedOutput2 = [50, 75, 90, 25, 30, 10, 1];

            expect(log.callCount).to.equal(7);
            expect(output).to.matchEither(expectedOutput1, expectedOutput2);
        });
    });
});