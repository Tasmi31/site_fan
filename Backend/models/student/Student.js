/*
* Student profile
* @class
*/
class Student
{
	/*
	* Build a new Student
	* @constructor
	* @param {array} : document MongoDB
	*/
	constructor (profile)
	{
		this.nom = profile.nom
		this.prenom = profile.prenom
		this.email = profile.email
		this.description = profile.description

		if (profile.site.length > 0)
			this.site = profile.site

		if (profile.linkname1.length > 0 && profile.link1.length > 0)
		{
			this.linkname1 = profile.linkname1.toLowerCase()
			this.link1 = profile.link1
		}

		if (profile.linkname2.length > 0 && profile.link2.length > 0)
		{
			this.linkname2 = profile.linkname2.toLowerCase()
			this.link2 = profile.link2
		}

		if (profile.linkname3.length > 0 && profile.link3.length > 0)
		{
			this.linkname3 = profile.linkname3.toLowerCase()
			this.link3 = profile.link3
		}	

		if (profile.keywords.length > 0)
			this.keywords = profile.keywords
	}

	/*
	* Delete empty properties
	* @function
	*/
	cleanLinks ()
	{
		// Kind of link
		let acceptedLinks = [
			'linkedin', 
			'facebook', 
			'twitter', 
			'instagram',
			'behance', 
			'radiom', 
			'soundcloud', 
			'youtube', 
			'500px', 
			'deviantart'
		]

		// Correspondence with Icon
		let awesomeIcons = [
			'fab fa-linkedin-in',
			'fab fa-facebook-f',
			'fab fa-twitter',
			'fab fa-instagram',
			'fab fa-behance',
			'fas fa-microphone',
			'fab fa-soundcloud',
			'fab fa-youtube',
			'fab fa-500px',
			'fab fa-deviantart'
		]

		// Replace link name by corresponding icon
		let indexIcon1 = acceptedLinks.indexOf(this.linkname1)
		this.linkname1 = awesomeIcons[indexIcon1]

		let indexIcon2 = acceptedLinks.indexOf(this.linkname2)
		this.linkname2 = awesomeIcons[indexIcon2]

		let indexIcon3 = acceptedLinks.indexOf(this.linkname3)
		this.linkname3 = awesomeIcons[indexIcon3]
	}
}

// --- Export
	module.exports = Student