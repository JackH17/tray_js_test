const {getAverageSunHoursForLocation} = require('../src/index')

describe('getAverageSunHoursForLocation', () => {
	it('Successfully gets the average sun hours for heathrow for all records', async () =>{
		const location = 'heathrow';

		const result = await getAverageSunHoursForLocation({location:location});

		expect(result).toEqual(128)
	})
})