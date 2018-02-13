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

	/*
	* Build a slug out of workshop name
	* @function
	*/
	buildSlug ()
	{
		let url = this.nom.toLowerCase()

		url = url.replace(/ /g, '-')
		url = url.replace(/é|è|ê/g, 'e')

		this.slug = url
	}
}

// --- Export
	module.exports = Activity;