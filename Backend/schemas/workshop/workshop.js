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

	let workshop = new Schema({
		nom : {
			type: String,
			required: true
		},
		description : {
			type: String,
			required: true
		},
		teaser : {
			type: String,
			required: false
		}
	})

// --- Model
	let Workshop = mongoose.model('atelier', workshop);

// --- Export
	module.exports = Workshop;