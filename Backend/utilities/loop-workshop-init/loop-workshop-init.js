// --- Require
	const Activity = require('./../../models/activity')

// --- Main

/*
* Loop through all documents to init new Workshops
* @param {array} : MongoDB documents
* @return {array} : Workshop objects
*/
function loopWorkshopInit (docs)
{
	let workshops = docs
	let workshopsTab = []

	workshops.forEach((atelier) =>
	{
		let workshop = new Activity(atelier)
		workshopsTab.push(workshop)
	})

	return workshopsTab
}
	

// --- Export
	module.exports = loopWorkshopInit;