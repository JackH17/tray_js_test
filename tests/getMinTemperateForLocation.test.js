const {getMinTemperatureForLocation} = require('../src/index')

describe('getMinTemperatureForLocation', () => {
	it('Successfully gets the min temperate for heathrow for all time', async () =>{
		const location = 'heathrow';

		const result = await getMinTemperatureForLocation({location:location});

		expect(result).toEqual(-4.6)
	})
})