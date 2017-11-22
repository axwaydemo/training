const specs = require('../src');
const action = require('../src/action');
const expect = require('chai').expect;
const { mocknode } = require('axway-flow-sdk');

describe('nodehandler-gm-objectfilter', () => {
	describe('#constructor', () => {
		it('[TEST-1] should define node specs', () => {
			expect(specs).to.exist;
			expect(typeof action.include).to.equal('function');
			expect(typeof action.exclude).to.equal('function');
			expect(mocknode('gm-objectfilter')).to.exist;
		});
	});

	describe('include', () => {
		it('[TEST-2] should fail if no source', () => {
			return mocknode(specs).node('gm-objectfilter').invoke('include', { source: undefined, fields: [] })
				.then((data) => {
					expect(data).to.deep.equal({
						error: [ null, 'Invalid source, object required.' ]
					});
				});
		});

		it('[TEST-3] should fail if no fields', () => {
			const source = {
				hello: 'world'
			};
			return mocknode(specs).node('gm-objectfilter').invoke('include', { source, fields: undefined })
				.then((data) => {
					expect(data).to.deep.equal({
						error: [ null, 'Invalid fields, array required.' ]
					});
				});
		});

		it('[TEST-4] only includes specified fields', () => {
			const source = {
				field1: 'one',
				field2: 2,
				field3: { hello: 'world' },
				field4: true
			};
			const fields = [ 'field1', 'field3' ];
			return mocknode(specs).node('gm-objectfilter').invoke('include', { source, fields })
				.then((data) => {
					expect(data).to.deep.equal({
						next: [ null, { field1: 'one', field3: { hello: 'world' } } ]
					});
				});
		});
	});

	describe('exclude', () => {
		it('[TEST-5] should fail if no source', () => {
			return mocknode(specs).node('gm-objectfilter').invoke('exclude', { source: undefined, fields: [] })
				.then((data) => {
					expect(data).to.deep.equal({
						error: [ null, 'Invalid source, object required.' ]
					});
				});
		});

		it('[TEST-6] should fail if no fields', () => {
			const source = {
				hello: 'world'
			};
			return mocknode(specs).node('gm-objectfilter').invoke('exclude', { source, fields: undefined })
				.then((data) => {
					expect(data).to.deep.equal({
						error: [ null, 'Invalid fields, array required.' ]
					});
				});
		});

		it('[TEST-7] only includes specified fields', () => {
			const source = {
				field1: 'one',
				field2: 2,
				field3: { hello: 'world' },
				field4: true
			};
			const fields = [ 'field1', 'field3' ];
			return mocknode(specs).node('gm-objectfilter').invoke('exclude', { source, fields })
				.then((data) => {
					expect(data).to.deep.equal({
						next: [ null, { field2: 2, field4: true } ]
					});
				});
		});
	});
});
