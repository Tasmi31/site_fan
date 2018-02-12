var urlEtudiant = "http://188.166.152.142/etudiants";
var urlAtelier = "http://188.166.152.142/ateliers";
Twig.cache(false); // pas de cache pour les vues en mode dev

$(document).ready(function() {
	// -- gestion du menus 
	$(".accueil").click(afficheAccueil);
	$(".programme").click(afficheProgramme);
	$(".infos").click(afficheInfos);
	$(".presse").click(affichePresse);
	$(".etudiant").click(listeEtudiant);
	$(".atelier").click(listeAtelier);
	$(".histoire-nav").click(afficheHistoire);

	$(".accueil").trigger('click');
});

// --- affichage des itineraires en utilisant la vue
function afficheAccueil(donnees) {
	var HTML = Twig.twig({ href: "templates/accueil.twig.html", async: false}).render();		
	$("#content").html(HTML);
	$(".link-side-nav").removeClass("active");
	$(".nav-link").removeClass("active");

	$(".social").removeClass("none");

	$(".accueil").addClass("active");
}

// --- affichage des itineraires en utilisant la vue
function afficheProgramme(donnees) {
	var HTML = Twig.twig({ href: "templates/programme.twig.html", async: false}).render();		
	$("#content").html(HTML);
	$(".link-side-nav").removeClass("active");
	$(".nav-link").removeClass("active");

	$(".social").removeClass("none");

	$(".programme").addClass("active");
}

// --- affichage des itineraires en utilisant la vue
function afficheHistoire(donnees) {
	var HTML = Twig.twig({ href: "templates/histoire.twig.html", async: false}).render();		
	$("#content").html(HTML);
	$(".link-side-nav").removeClass("active");
	$(".nav-link").removeClass("active");

	$(".social").removeClass("none");

	$(".histoire-nav").addClass("active");
}

// --- affichage des itineraires en utilisant la vue
function afficheInfos(donnees) {
	var HTML = Twig.twig({ href: "templates/infos.twig.html", async: false}).render();		
	$("#content").html(HTML);
	$(".link-side-nav").removeClass("active");
	$(".nav-link").removeClass("active");

	$(".social").addClass("none");

	$(".infos").addClass("active");
}

// --- affichage des itineraires en utilisant la vue
function affichePresse(donnees) {
	var HTML = Twig.twig({ href: "templates/presse.twig.html", async: false}).render();		
	$("#content").html(HTML);
	$(".link-side-nav").removeClass("active");
	$(".nav-link").removeClass("active");

	$(".social").addClass("none");

	$(".presse").addClass("active");
}

// --- liste des itineraires dispos => requete AJAX
function listeEtudiant(e) {
	e.preventDefault();
	$.get(urlEtudiant, afficheEtudiant);
}

// --- affichage des itineraires en utilisant la vue
function afficheEtudiant(donnees) {
	var HTML = Twig.twig({ href: "templates/fiches.twig.html", async: false}).render({"etudiants" : donnees});		
	$("#content").html(HTML);
	$(".link-side-nav").removeClass("active");
	$(".nav-link").removeClass("active");

	$(".social").addClass("none");

	$(".etudiant").addClass("active");
}
// --- liste des itineraires dispos => requete AJAX
function listeAtelier(e) {
	e.preventDefault();
	$.get(urlAtelier, afficheAtelier);
}

// --- affichage des itineraires en utilisant la vue
function afficheAtelier(donnees) {
	var HTML = Twig.twig({ href: "templates/atelier.twig.html", async: false}).render({"ateliers" : donnees});		
	$("#content").html(HTML);
	$(".link-side-nav").removeClass("active");
	$(".nav-link").removeClass("active");

	$(".social").addClass("none");

	$(".atelier").addClass("active");
}