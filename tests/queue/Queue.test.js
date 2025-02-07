const Chai = require('chai');
const Queue = require('../../src/queue/Queue.js');
const expect = Chai.expect;

describe('Queue', function() {
    let queue;

    beforeEach(function() {
        queue = new Queue();
    });

    it('should have a "enqueue" method', function() {
        expect(queue).to.have.property('enqueue');
    });

    it('should have a "peek" method', function() {
        expect(queue).to.have.property('peek');
    });

    it('should have a "dequeue" method', function() {
        expect(queue).to.have.property('dequeue');
    });

    it('should have a "size" method', function() {
        expect(queue).to.have.property('size');
    });

    it('should have an "isEmpty" method', function() {
        expect(queue).to.have.property('isEmpty');
    });

    it('should store and return items First In - First Out (FIFO): v1', function() {
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);

        expect(queue.isEmpty()).to.be.false;
        expect(queue.size()).to.equal(3);
        expect(queue.peek()).to.equal(10);
        expect(queue.dequeue()).to.equal(10);

        expect(queue.isEmpty()).to.be.false;
        expect(queue.size()).to.equal(2);
        expect(queue.peek()).to.equal(20);
        expect(queue.dequeue()).to.equal(20);

        expect(queue.isEmpty()).to.be.false;
        expect(queue.size()).to.equal(1);
        expect(queue.peek()).to.equal(30);
        expect(queue.dequeue()).to.equal(30);

        expect(queue.isEmpty()).to.be.true;
        expect(queue.size()).to.equal(0);
        expect(queue.peek()).to.be.null;
        expect(queue.dequeue()).to.be.null;
    });

    it('should store and return items First In - First Out (FIFO): v2', function() {
        queue.enqueue('abc');
        queue.enqueue('xyz');
        queue.enqueue('lmnop');

        expect(queue.isEmpty()).to.be.false;
        expect(queue.size()).to.equal(3);
        expect(queue.peek()).to.equal('abc');
        expect(queue.dequeue()).to.equal('abc');

        expect(queue.isEmpty()).to.be.false;
        expect(queue.size()).to.equal(2);
        expect(queue.peek()).to.equal('xyz');
        expect(queue.dequeue()).to.equal('xyz');

        expect(queue.isEmpty()).to.be.false;
        expect(queue.size()).to.equal(1);
        expect(queue.peek()).to.equal('lmnop');
        expect(queue.dequeue()).to.equal('lmnop');

        expect(queue.isEmpty()).to.be.true;
        expect(queue.size()).to.equal(0);
        expect(queue.peek()).to.be.null;
        expect(queue.dequeue()).to.be.null;
    });
});