/*
* Activity's information
* @class
*/
class Activity
{
	/*
	* Build a new Activity
	* @constructor
	* @param {array} : document MongoDB
	*/
	constructor (activity)
	{
		this.nom = activity.nom
		this.description = activity.description
		
		if (activity.teaser.length > 0)
			this.teaser = activity.teaser
	}
}

// --- Export
	module.exports = Activity;