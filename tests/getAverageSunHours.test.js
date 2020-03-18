const {getAverageSunHours} = require('../src/index')

describe('getAverageSunHours', () => {
	it('Successfully gets the average sun hours for heathrow 1999', async () =>{
		const location = 'heathrow';
		const year = 1999;

		const result = await getAverageSunHours({location:location, year:year});

		expect(result).toEqual(151)
	})
})