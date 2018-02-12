// --- Require
	const Student = require('./../../models/student')

// --- Main

/*
* Loop through all profiles to init new Students
* @param {array} : MongoDB documents
* @return {array} : Student objects
*/
function loopStudentInit (profiles)
{
	let students = profiles
	let studentsTab = []

	students.forEach((profile) =>
	{
		let std = new Student(profile)
		std.cleanLinks()
		studentsTab.push(std)
	})

	return studentsTab
}
	

// --- Export
	module.exports = loopStudentInit;