Country.fill_db(countries)

const tableauBody = document.getElementById("body")

let start = 0
let end = 24

const data_pays = Object.values(Country.all_countries)

let pays_affiche = data_pays.filter((elem,key) => key < 25)

function chargeDonnees(data){
    tableauBody.replaceChildren()
    for(const pays of pays_affiche){
        const tr = document.createElement("tr")

        const tdNom = document.createElement("td")
        tdNom.textContent = pays.nomFrancais

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
}

chargeDonnees(pays_affiche)//Au chargement

function page_suivante(){
    if(end !== data_pays.length - 1){
        start = start + 25
        end = end + 25
        if(end>data_pays.length){
            end = data_pays.length - 1
        }
        pays_affiche = data_pays.filter((elem,key) => key>=start && key <= end)
    }
    chargeDonnees(pays_affiche)
}

function page_precedente(){
    if(start !== 0){
        start = start - 25
        end = end - 25
        if(start<0){
            start = 0
            end = start+25
        }
        pays_affiche = data_pays.filter((elem,key) => key>=start && key <= end)
    }
    chargeDonnees(pays_affiche)
}