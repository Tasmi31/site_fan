/* ============================================================
 * Copyright (C) 2018 Mickael Gomez - All Rights Reserved
 * ------------------------------------------------------------
 * Contact : gomezmickael@orange.fr
 * Website : mickaelgomez.com
 * ============================================================
 */

// --- Require
	const mongoose = require('mongoose');

// --- Schema
	let Schema = mongoose.Schema;

	let profile = new Schema({
		nom : {
			type: String,
			required: true
		},
		prenom: {
			type: String,
			required: true
		},
		email : {
			type: String,
			required: true
		},
		site : {
			type: String,
			required: false
		},
		linkname1 : {
			type: String,
			required: false
		},
		link1 : {
			type: String,
			required: false
		},
		linkname2 : {
			type: String,
			required: false
		},
		link2 : {
			type: String,
			required: false
		},
		linkname3 : {
			type: String,
			required: false
		},
		link3 : {
			type: String,
			required: false
		},
		description : {
			type: String,
			required: true
		},
		keywords : {
			type: [String],
			required: false
		}
	})

// --- Model
	let Profile = mongoose.model('profile', profile);

// --- Export
	module.exports = Profile;