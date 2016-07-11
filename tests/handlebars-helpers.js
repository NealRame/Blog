const chai = require('chai');
const path = require('path');
const expect = chai.expect;

describe('Helpers', () => {
	const helpers_dir = path.join('..', 'src', 'layouts', 'helpers');
	describe('contains', () => {
		const contains = require(path.join(helpers_dir, 'contains'));
		it('should return true when a collection contains a given element', () => {
			expect(contains([0, 1, 3], 1)).to.be.true;
		});
		it('should return false when a collection does not contain a given element', () => {
			expect(contains([0, 1, 3], 4)).to.be.false;
		});
	});
	describe('eq', () => {
		const eq = require(path.join(helpers_dir, 'eq'));
		it('should return true when two given primitive value are equals', () => {
			expect(eq(0, 0)).to.be.true;
		});
		it('should return false when two given primitive value are not equals', () => {
			expect(eq(0, 1)).to.be.false;
		});
	});
	describe('limit', () => {
		const limit = require(path.join(helpers_dir, 'limit'));
		it('should return a new collection', () => {
			const a = [0, 1, 2];
			expect(limit(a, 1)).to.not.equal(a);
		});
		it('should not alter the given collection', () => {
			const a = [0, 1, 2];
			limit(a, 1);
			expect(a).to.eql([0, 1, 2]);
		});
		it('should return a collection of at most a given size', () => {
			expect(limit([0, 1], 1)).to.have.length.of.at.most(1);
		});
		it('should work with an empty collection', () => {
			expect(limit([], 1)).to.have.length.of.at.most(1);
		})
	});
});
