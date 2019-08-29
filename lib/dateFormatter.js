module.exports = (date) => {

	const options = { 
		year: 'numeric', 
		month: 'numeric', 
		day: 'numeric', 
		timeZone: 'America/Chicago', 
		hour: 'numeric',
		hour12: true, 
		minute: 'numeric' };

	return date.toLocaleDateString('en-US',options)

}