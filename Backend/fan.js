/* 
 * ============================================================
 * Copyright (C) 2018 Mickael Gomez - All Rights Reserved
 * ------------------------------------------------------------
 * Contact : gomezmickael@orange.fr
 * Website : mickaelgomez.com
 * ============================================================
 */

/* > = = = = = = = = = = = < [ R E Q U I R E ] > = = = = = = = = = = = < */

	// --- Mongoose
		const mongoose = require('mongoose')
		mongoose.connect('mongodb://hiddenLogin:hiddenPassword@localhost/Fan')
		mongoose.Promise = global.Promise

	// --- Express
		const express = require('express')
		const app = express()

	// --- Access allow control origin
		const cors = require('cors')
		app.use(cors({origin: 'http://webmmi.iut-tlse3.fr'}))

	// --- Body-parser
		const bodyParser = require('body-parser')
		app.use(bodyParser.json())
		app.use(bodyParser.urlencoded({ extended: false }))

	// --- Router
		const router = express.Router()
		app.use(router)

	// --- Schemas
		const Workshop = require('./schemas/workshop')
		const Profile = require('./schemas/profile')

	// --- Models
		const Activity = require('./models/activity')
		const Student = require('./models/student')

	// --- Loop Student init
		const loopStudentInit = require('./utilities/loop-student-init')
		const loopWorkshopInit = require('./utilities/loop-workshop-init')

/* > = = = = = = = = = = = < [ H O M E ] > = = = = = = = = = = = < */

	// --- Home route
		router.get('/', (req,res) =>
		{
			res.json('API REST - FAN 2018 => Server up ! Développé par Mickael Gomez : gomezmickael@orange.fr')
		})

/* > = = = = = = = = = = = < [ S T U D E N T ] > = = = = = = = = = = = < */

	// --- Vars
		const doneURL = 'http://mickaelgomez.com/side-projects/fan/'
		const apikey = {
			key: "hiddenApiKey",
			error: "Erreur : L'api key est inexistante ou incorrecte"
		}

	// --- Add profile
		router.post('/profil', (req, res) =>
		{
			// Security : API_KEY
			if (req.query.apikey !== apikey.key)
			{
				res.send(apikey.error)
				return 0
			}
			
			// Create Profile document
			Profile.create(
			{
				nom: req.body.nom, 
				prenom: req.body.prenom, 
				email: req.body.email, 
				site: req.body.site,
				linkname1: req.body.linkname1,
				link1: req.body.link1,
				linkname2: req.body.linkname2,
				link2: req.body.link2,
				linkname3: req.body.linkname3,
				link3: req.body.link3,
				description: req.body.description
			}, 
			(err, profile) =>
			{
				if (err)
					return console.error(err)
				else
					res.redirect(`${doneURL}fiche/done?prenom=${profile.prenom}`)
			})
		})

	// --- Update keywords
		router.post('/addKeywords', (req, res) =>
		{
			// Security : API_KEY
			if (req.query.apikey !== apikey.key)
			{
				res.send(apikey.error)
				return 0
			}

			// Update Profile keywords
			Profile.update({nom: req.body.nom, prenom: req.body.prenom},
			{
				$set: {keywords: req.body.keywords}
			},
			(err, profiles) =>
			{
				if (err)
					console.error(err)
				else
					res.redirect(`${doneURL}keywords/done?nom=${req.body.nom}&prenom=${req.body.prenom}`)
			})
		})

	// --- Get all profiles
		router.get('/fiches', (req, res) => 
		{
			Profile.find({},{},
			(err, profiles) =>
			{
				if (err) 
					return console.error(err)
				else 
					res.json(profiles)
			})
		})

	// --- Search profiles
		router.get('/etudiants', (req, res) => 
		{
			// Init regex from query
			let query = new RegExp(req.query.search, 'i')

			// Apply regex on properties
			Profile.find({$or: [
				{nom: query},
				{prenom: query},
				{description: query}
			]},{},
			(err, profiles) =>
			{
				if (err)
					console.error(err)
				else
				{
					// Init all new Students objects
					let etudiants = loopStudentInit(profiles)
					res.json(etudiants)
				}
			})
		})

/* > = = = = = = = = = = = < [ W O R K S H O P ] > = = = = = = = = = = = < */

	// --- Add workshop
		router.post('/atelier', (req, res) =>
		{
			// Security : API_KEY
			if (req.query.apikey !== apikey.key)
			{
				res.send(apikey.error)
				return 0
			}

			// Create workshop document
			Workshop.create(
			{
				nom: req.body.nom, 
				teaser: req.body.teaser, 
				description: req.body.description
			}, 
			(err, atelier) =>
			{
				if (err)
					return console.error(err)
				else
					res.redirect(`${doneURL}atelier/done?nom=${atelier.nom}`)
			})
		})

	// --- Get all workshops
		router.get('/ateliers', (req, res) => 
		{
			Workshop.find({},{},
			(err, ateliers) =>
			{
				if (err) 
					return console.error(err)
				else
				{
					// Init all new Students objects
					let workshops = loopWorkshopInit(ateliers)
					res.json(workshops)
				}
			})
		})


/* = = = = = >{ START }< = = = = = */

	// --- Server
		let port = 80
		app.listen(port)
		console.log('Starting server on ' + port)