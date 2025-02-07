const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const Chai = require('chai');
const Assertion = Chai.Assertion;
const LinkedList = require('../../src/linked-list/LinkedList.js');

const expect = Chai.expect;
Chai.use(sinonChai);

Assertion.addMethod('structuredAs', function(values) {
    if( !values.length ) {
        this.assert(
            this._obj.head === null,
            'expected #{this} to have "head" property set to null',
            'expected #{this} to not have "head" property set to null'
        );
        return;
    }

    let expected = 'head-->';
    values.forEach((v) => {
        expected += v + '-->';
    });
    expected += 'null';

    let actual = 'head-->';
    let traveler = this._obj.head;
    while(traveler !== null) {
        actual += traveler.value + '-->';
        traveler = traveler.next;
    }
    actual += 'null';

    this.assert(
        expected === actual,
        'expected #{this} to be internally structured like #{exp} but instead it was structed liked #{act}',
        'expected #{this} to not be internally structured like #{exp}',
        expected,
        actual
    );
});

describe('LinkedList', function() {
    let linkedList;

    beforeEach(function() {
        linkedList = new LinkedList();
    });

    describe('print()', function() {
        it('should not print anything for an empty list', function() {
            let log = sinon.fake();

            linkedList.print(log);

            expect(log).to.not.have.been.called;
        });

        it('should print list in proper order', function() {
            let log = sinon.fake();

            linkedList.append(5);
            linkedList.append(10);
            linkedList.prepend(3);

            linkedList.print(log);

            expect(log.callCount).to.equal(3);
            expect(log.getCall(0).args[0]).to.equal(3);
            expect(log.getCall(1).args[0]).to.equal(5);
            expect(log.getCall(2).args[0]).to.equal(10);
        });

        it('should print list in proper order', function() {
            let log = sinon.fake();

            linkedList.prepend(5);
            linkedList.prepend(10);
            linkedList.append(3);

            linkedList.print(log);

            expect(log.callCount).to.equal(3);
            expect(log.getCall(0).args[0]).to.equal(10);
            expect(log.getCall(1).args[0]).to.equal(5);
            expect(log.getCall(2).args[0]).to.equal(3);
        });
    });

    describe('prepend()', function() {
        it('should accurately prepend on an empty list', function() {
            linkedList.prepend(10);

            expect(linkedList).to.be.structuredAs([10]);
        });

        it('should accurately prepend on a non-empty list', function() {
            linkedList.prepend(5);
            linkedList.prepend(10);
            linkedList.prepend(15);

            expect(linkedList).to.be.structuredAs([15, 10, 5]);
        });

        it('should increment length if length property is used', function() {
            if( !linkedList.hasOwnProperty('length') ) {
                return;
            }

            expect(linkedList.length).to.equal(0);
            linkedList.prepend(1);
            expect(linkedList.length).to.equal(1);
        });
    });

    describe('append()', function() {
        it('should accurately append on an empty list', function() {
            linkedList.append(10);

            expect(linkedList).to.be.structuredAs([10]);
        });

        it('should accurately append on a non-empty list', function() {
            linkedList.append(5);
            linkedList.append(10);
            linkedList.append(15);

            expect(linkedList).to.be.structuredAs([5, 10, 15]);
        });

        it('should increment length if length property is used', function() {
            if( !linkedList.hasOwnProperty('length') ) {
                return;
            }

            expect(linkedList.length).to.equal(0);
            linkedList.append(1);
            expect(linkedList.length).to.equal(1);
        });
    });

    describe('get()', function() {
        it('should have a "get" method', function() {
            expect(linkedList).to.have.property('get');
        });

        it('should throw an exception for an index < 0', function() {
            expect(() => linkedList.get(-1)).to.throw();
        });

        it('should throw an exception for an index < 0', function() {
            linkedList.append(5);

            expect(() => linkedList.get(-1)).to.throw();
        });

        it('should throw an exception for an index > the size of the linked list', function() {
            expect(() => linkedList.get(0)).to.throw();
        });

        it('should throw an exception for an index > the size of the linked list', function() {
            linkedList.append(5);
            linkedList.append(10);

            expect(() => linkedList.get(2)).to.throw();
        });

        it('should return the value found at the given index', function() {
            linkedList.append('a');
            linkedList.append('b');
            linkedList.append('c');

            let result = linkedList.get(0);

            expect(result).to.equal('a');
        });

        it('should return the value found at the given index', function() {
            linkedList.append('a');
            linkedList.append('b');
            linkedList.append('c');

            let result = linkedList.get(2);

            expect(result).to.equal('c');
        });

        it('should return the value found at the given index', function() {
            linkedList.append('a');
            linkedList.append('b');
            linkedList.append('c');

            let result = linkedList.get(1);

            expect(result).to.equal('b');
        });
    });

    describe('find()', function() {
        it('should have a "find" method', function() {
            expect(linkedList).to.have.property('find');
        });

        it('should return -1 for not found values (empty list)', function() {
            expect(linkedList.find('a')).to.equal(-1);
        });

        it('should return -1 for not found values (non-empty list)', function() {
            linkedList.append('a');
            linkedList.append('b');
            linkedList.append('c');

            expect(linkedList.find('z')).to.equal(-1);
        });

        it('should return the index for a found value (at the start)', function() {
            linkedList.append('a');
            linkedList.append('b');
            linkedList.append('c');

            expect(linkedList.find('a')).to.equal(0);
        });

        it('should return the index for a found value (at the end)', function() {
            linkedList.append('a');
            linkedList.append('b');
            linkedList.append('c');

            expect(linkedList.find('c')).to.equal(2);
        });

        it('should return the index for a found value (in the middle)', function() {
            linkedList.append('a');
            linkedList.append('b');
            linkedList.append('c');

            expect(linkedList.find('b')).to.equal(1);
        });

        it('should return the first index when duplicate values exist', function() {
            linkedList.append('a');
            linkedList.append('b');
            linkedList.append('a');
            linkedList.append('b');

            expect(linkedList.find('b')).to.equal(1);
        });
    });

    describe('removeFirst()', function() {
        it('should have a "removeFirst" method', function() {
            expect(linkedList).to.have.property('removeFirst');
        });

        it('should return the value of the first node (size 1)', function() {
            linkedList.append(1);

            let result = linkedList.removeFirst();

            expect(result).to.equal(1);
            expect(linkedList).to.be.structuredAs([]);
        });

        it('should return the value of the first node (size 1+)', function() {
            linkedList.append(10);
            linkedList.append(20);

            let result = linkedList.removeFirst();

            expect(result).to.equal(10);
            expect(linkedList).to.be.structuredAs([20]);
        });

        it('should return null for an empty linked list', function() {
            let result = linkedList.removeFirst();

            expect(result).to.be.null;
            expect(linkedList).to.be.structuredAs([]);
        });

        it('should decrement length if length property is used (size 1+)', function() {
            if( !linkedList.hasOwnProperty('length') ) {
                return;
            }

            linkedList.append(2);
            linkedList.append(3);

            expect(linkedList.length).to.equal(2);
            linkedList.removeFirst();
            expect(linkedList.length).to.equal(1);
        });

        it('should decrement length if length property is used (size 1)', function() {
            if( !linkedList.hasOwnProperty('length') ) {
                return;
            }

            linkedList.append(2);

            expect(linkedList.length).to.equal(1);
            linkedList.removeFirst();
            expect(linkedList.length).to.equal(0);
        });

        it('should not decrement length if length property is used (size 0)', function() {
            if( !linkedList.hasOwnProperty('length') ) {
                return;
            }

            expect(linkedList.length).to.equal(0);
            linkedList.removeFirst();
            expect(linkedList.length).to.equal(0);
        });
    });

    describe('removeLast()', function() {
        it('should have a "removeLast" method', function() {
            expect(linkedList).to.have.property('removeLast');
        });

        it('should return the value of the last node (size 1)', function() {
            linkedList.append(20);

            let result = linkedList.removeLast();

            expect(result).to.equal(20);
            expect(linkedList).to.be.structuredAs([]);
        });

        it('should return the value of the last node (size 1+)', function() {
            linkedList.append(2);
            linkedList.append(3);

            let result = linkedList.removeLast();

            expect(result).to.equal(3);
            expect(linkedList).to.be.structuredAs([2]);
        });

        it('should return null for an empty linkedlist', function() {
            let result = linkedList.removeLast();

            expect(result).to.be.null;
            expect(linkedList).to.be.structuredAs([]);
        });

        it('should decrement length if length property is used (size 1+)', function() {
            if( !linkedList.hasOwnProperty('length') ) {
                return;
            }

            linkedList.append(2);
            linkedList.append(3);

            expect(linkedList.length).to.equal(2);
            linkedList.removeLast();
            expect(linkedList.length).to.equal(1);
        });

        it('should decrement length if length property is used (size 1)', function() {
            if( !linkedList.hasOwnProperty('length') ) {
                return;
            }

            linkedList.append(2);

            expect(linkedList.length).to.equal(1);
            linkedList.removeLast();
            expect(linkedList.length).to.equal(0);
        });

        it('should not decrement length if length property is used (size 0)', function() {
            if( !linkedList.hasOwnProperty('length') ) {
                return;
            }

            expect(linkedList.length).to.equal(0);
            linkedList.removeLast();
            expect(linkedList.length).to.equal(0);
        });
    });

    describe('insertAt()', function() {
        it('should have a "insertAt" method', function() {
            expect(linkedList).to.have.property('insertAt');
        });

        it('should throw an exception for negative indexes', function() {
            expect(() => linkedList.insertAt(10, -1)).to.throw();
        });

        it('should throw an exception for indexes out of bounds', function() {
            linkedList.append(10);

            expect(() => linkedList.insertAt(10, 2)).to.throw();
        });

        it('should insert the value at the given index (index head)', function() {
            linkedList.append(10);
            linkedList.append(20);

            linkedList.insertAt(5, 0);

            expect(linkedList).to.be.structuredAs([5, 10, 20]);
        });

        it('should insert the value at the given index (index tail)', function() {
            linkedList.append(10);
            linkedList.append(20);

            linkedList.insertAt(30, 2);

            expect(linkedList).to.be.structuredAs([10, 20, 30]);
        });

        it('should insert the value at the given index (index middle)', function() {
            linkedList.append(10);
            linkedList.append(20);

            linkedList.insertAt(15, 1);

            expect(linkedList).to.be.structuredAs([10, 15, 20]);
        });

        it('should increment length if the length property is used', function() {
            if( !linkedList.hasOwnProperty('length') ) {
                return;
            }

            linkedList.append(10);
            linkedList.append(20);

            expect(linkedList.length).to.equal(2);
            linkedList.insertAt(15, 1);
            expect(linkedList.length).to.equal(3);
        });

        it('should not increment length if the length property is used (index error)', function() {
            if( !linkedList.hasOwnProperty('length') ) {
                return;
            }
            
            expect(linkedList.length).to.equal(0);
            try {
                linkedList.insertAt(15, 1);
            }
            catch(e) { }
            expect(linkedList.length).to.equal(0);
        });
    });

    describe('removeAt()', function() {
        it('should have a "removeAt" method', function() {
            expect(linkedList).to.have.property('removeAt');
        });

        it('should throw an exception for negative indexes', function() {
            expect(() => linkedList.removeAt(-1)).to.throw();
        });

        it('should throw an exception for indexes out of bounds', function() {
            linkedList.append(10);

            expect(() => linkedList.removeAt(1)).to.throw();
        });

        it('should remove and return the value at the given index (index head)', function() {
            linkedList.append(10);
            linkedList.append(20);
            linkedList.append(30);

            let result = linkedList.removeAt(0);
            expect(result).to.equal(10);
            expect(linkedList).to.be.structuredAs([20, 30]);
        });

        it('should remove and return the value at the given index (index tail)', function() {
            linkedList.append(10);
            linkedList.append(20);
            linkedList.append(30);

            let result = linkedList.removeAt(2);
            expect(result).to.equal(30);
            expect(linkedList).to.be.structuredAs([10, 20]);
        });

        it('should remove and return the value at the given index (index middle)', function() {
            linkedList.append(10);
            linkedList.append(20);
            linkedList.append(30);

            let result = linkedList.removeAt(1);
            expect(result).to.equal(20);
            expect(linkedList).to.be.structuredAs([10, 30]);
        });

        it('should decrement length if the length property is used', function() {
            if( !linkedList.hasOwnProperty('length') ) {
                return;
            }

            linkedList.append(10);
            linkedList.append(20);
            linkedList.append(30);

            expect(linkedList.length).to.equal(3);
            linkedList.removeAt(0);
            expect(linkedList.length).to.equal(2);
        });

        it('should not decrement length if the length property is used (index error)', function() {
            if( !linkedList.hasOwnProperty('length') ) {
                return;
            }

            linkedList.append(10);
            linkedList.append(20);
            linkedList.append(30);

            expect(linkedList.length).to.equal(3);
            try {
                linkedList.removeAt(-1);
            } catch(e) {}
            expect(linkedList.length).to.equal(3);
        });
    });
});