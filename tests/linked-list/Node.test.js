const Chai = require('chai');
const Node = require('../../src/linked-list/Node.js');

const expect = Chai.expect;

describe('Node', function() {
    it('should have a value field', function() {
        let node = new Node(10, null);

        expect(node).to.have.property('value', 10);
    });

    it('should have a next field', function() {
        let node = new Node(10, null);

        expect(node).to.have.property('next', null);
    });

    it('should default next to null', function() {
        let node = new Node(10);

        expect(node).to.have.property('next', null);
    });
});