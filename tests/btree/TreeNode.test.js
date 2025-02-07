const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const Chai = require('chai');
const Assertion = Chai.Assertion;

const expect = Chai.expect;
Chai.use(sinonChai);

const TreeNode = require('../../src/btree/TreeNode');

describe('TreeNode', function() {
    let node;

    beforeEach(function() {
        node = new TreeNode(5);
    });

    it('should have a left property', function() {
        expect(node).to.have.property('left');
        expect(node.left).to.be.null;
    });

    it('should have a right property', function() {
        expect(node).to.have.property('right');
        expect(node.right).to.be.null;
    });

    it('should have a value property', function() {
        expect(node).to.have.property('value');
        expect(node.value).to.equal(5);
    });
});