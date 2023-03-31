Country.fill_db(countries)

const tableauBody = document.getElementById("body")

for(const key in Country.all_countries){

    pays = Country.all_countries[key]

    const tr = document.createElement("tr")

    const tdNom = document.createElement("td")
    tdNom.textContent = pays.nomAnglais

    const tdPop = document.createElement("td")
    tdPop.textContent = pays.population

    const tdSurface = document.createElement("td")
    tdSurface.textContent = pays.superficie

    const tdDensite = document.createElement("td")
    tdDensite.textContent = pays.getPopDensity

    const tdContinent = document.createElement("td")
    tdContinent.textContent = pays.continent
    
    const tdDrapeau = document.createElement("td")
    const image = document.createElement("img")
    const attribut = document.createAttribute("src")
    attribut.value = pays.drapeau
    image.setAttributeNode(attribut)
    tdDrapeau.appendChild(image)

    tr.appendChild(tdNom)
    tr.appendChild(tdPop)
    tr.appendChild(tdSurface)
    tr.appendChild(tdDensite)
    tr.appendChild(tdContinent)
    tr.appendChild(tdDrapeau)

    tableauBody.appendChild(tr)
}