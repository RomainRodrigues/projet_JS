pays = Country.all_countries['FRA']

const nom = document.getElementById("nom")
nom.textContent = pays.nomAnglais

const population = document.getElementById("population")
population.textContent = pays.population

const surface = document.getElementById("surface")
surface.textContent = pays.superficie

const densite = document.getElementById("densite")
densite.textContent = pays.getPopDensity

const continent = document.getElementById("continent")
continent.textContent = pays.continent

const drapeau = document.getElementById("drapeau")
var image = document.createElement("img")
var attribut = document.createAttribute("src")
attribut.value = pays.drapeau
image.setAttributeNode(attribut)
drapeau.appendChild(image)