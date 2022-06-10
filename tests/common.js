import {expect} from 'chai'
import * as functional from 'common/functional'

describe('Functional', () => {
	describe('existy(v)', () => {
		it('should return false when v is undefined', () => {
			expect(functional.existy(undefined)).to.be.false;
		});
		it('should return false when v is null', () => {
			expect(functional.existy(null)).to.be.false;
		});
		it('should return true when v === false', () => {
			expect(functional.existy(false)).to.be.true;
		});
		it('should return true when v === true', () => {
			expect(functional.existy(true)).to.be.true;
		});
		it('should return true when v === 0', () => {
			expect(functional.existy(0)).to.be.true;
		});
		it('should return true when v !== 0', () => {
			expect(functional.existy(1)).to.be.true;
		});
		it('should return true when v === ""', () => {
			expect(functional.existy('')).to.be.true;
		});
		it('should return true when v !== ""', () => {
			expect(functional.existy('a string')).to.be.true;
		});
		it('should return true when v is an array', () => {
			expect(functional.existy([])).to.be.true;
		});
		it('should return true when v is an object', () => {
			expect(functional.existy({})).to.be.true;
		});
	});

	describe('cat(a, b)', () => {
		it('should return an array', () => {
			expect(functional.cat([], 0)).to.be.an('array');
		});
		it('should append elements to the given array', () => {
			const a1 = [0, 1, 2];
			const a2 = functional.cat(a1, 3, 4, 5);
			expect(a2).to.have.lengthOf(6);
			expect(a2.slice(0, 3)).eql(a1);
			expect(a2.slice(3, 6)).eql([3, 4, 5]);
		});
		it('should concatenate two arrays', () => {
			const a1 = [0, 1, 2];
			const a2 = [3, 4, 5];
			const a3 = functional.cat(a1, a2);
			expect(a3).to.have.lengthOf(6);
			expect(a3.slice(0, 3)).to.eql(a1);
			expect(a3.slice(3, 6)).to.eql(a2);
		});
	});

	describe('construct(e, a)', () => {
		it('should return an array', () => {
			expect(functional.construct(0, [])).to.be.an('array');
		});
		it('should not mutate a', () => {
			const a1 = [1, 2];
			functional.construct(0, a1);
			expect(a1).to.be.eql([1, 2]);
		});
		it('should insert e at the begining of a', () => {
			const a = functional.construct(0, []);
			expect(a).to.have.lengthOf(1);
			expect(a[0]).to.equal(0);
		});

	});


});
