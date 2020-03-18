const {getMinTemperate} = require('../src/index')

describe('getMinTemperature', () => {
	it('Successfully gets the min temperate for oxford 2004', async () =>{
		const location = 'oxford';
		const year = 2004;

		const result = await getMinTemperate({location:location, year:year});

		expect(result).toEqual(2.7)
	})
})