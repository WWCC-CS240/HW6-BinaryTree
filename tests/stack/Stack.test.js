const Chai = require('chai');
const Stack = require('../../src/stack/Stack.js');
const expect = Chai.expect;

describe('Stack', function() {
    let stack;

    beforeEach(function() {
        stack = new Stack();
    });

    it('should have a "push" method', function() {
        expect(stack).to.have.property('push');
    });

    it('should have a "peek" method', function() {
        expect(stack).to.have.property('peek');
    });

    it('should have a "pop" method', function() {
        expect(stack).to.have.property('pop');
    });

    it('should have a "size" method', function() {
        expect(stack).to.have.property('size');
    });

    it('should have an "isEmpty" method', function() {
        expect(stack).to.have.property('isEmpty');
    });

    it('should store and return items Last In - First Out (LIFO): v1', function() {
        stack.push(10);
        stack.push(20);
        stack.push(30);

        expect(stack.isEmpty()).to.be.false;
        expect(stack.size()).to.equal(3);
        expect(stack.peek()).to.equal(30);
        expect(stack.pop()).to.equal(30);

        expect(stack.isEmpty()).to.be.false;
        expect(stack.size()).to.equal(2);
        expect(stack.peek()).to.equal(20);
        expect(stack.pop()).to.equal(20);

        expect(stack.isEmpty()).to.be.false;
        expect(stack.size()).to.equal(1);
        expect(stack.peek()).to.equal(10);
        expect(stack.pop()).to.equal(10);

        expect(stack.isEmpty()).to.be.true;
        expect(stack.size()).to.equal(0);
        expect(stack.pop()).to.be.null;
        expect(stack.peek()).to.be.null;
    });

    it('should store and return items Last In - First Out (LIFO): v2', function() {
        stack.push('abc');
        stack.push('xyz');
        stack.push('lmnop');

        expect(stack.isEmpty()).to.be.false;
        expect(stack.size()).to.equal(3);
        expect(stack.peek()).to.equal('lmnop');
        expect(stack.pop()).to.equal('lmnop');

        expect(stack.isEmpty()).to.be.false;
        expect(stack.size()).to.equal(2);
        expect(stack.peek()).to.equal('xyz');
        expect(stack.pop()).to.equal('xyz');

        expect(stack.isEmpty()).to.be.false;
        expect(stack.size()).to.equal(1);
        expect(stack.peek()).to.equal('abc');
        expect(stack.pop()).to.equal('abc');

        expect(stack.isEmpty()).to.be.true;
        expect(stack.size()).to.equal(0);
        expect(stack.pop()).to.be.null;
        expect(stack.peek()).to.be.null;
    });
});