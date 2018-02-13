// --- Require
	const Activity = require('./../../models/activity')
	const suffleArray = require('./../shuffleArray')

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
		workshop.buildSlug()
		workshopsTab.push(workshop)
	})

	return suffleArray(workshopsTab)
}
	

// --- Export
	module.exports = loopWorkshopInit;