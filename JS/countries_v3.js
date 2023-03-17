const tableauBody = document.getElementById("body")
const div_popup = document.getElementById("div_popup")

let start = 0
let end = 24
let nb_popup = 1
let nb_popup_drapeau = 1

const data_pays = Object.values(Country.all_countries)

let pays_affiche = data_pays.filter((elem,key) => key < 25)

function chargeDonnees(){
    tableauBody.replaceChildren()
    div_popup.replaceChildren()
    
    for(const pays of pays_affiche){
        const tr = document.createElement("tr")

        //popup détails
        const a = document.createElement("a")
        const href = document.createAttribute("href")
        href.value = '#popup'+nb_popup.toString()
        a.setAttributeNode(href)

        //popup drapeau
        const a_drapeau = document.createElement("a")
        const href_drapeau = document.createAttribute("href")
        href_drapeau.value = '#popup_drapeau'+nb_popup_drapeau.toString()
        a_drapeau.setAttributeNode(href_drapeau)

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
        a_drapeau.appendChild(image)
        tdDrapeau.appendChild(a_drapeau)

        tr.appendChild(tdNom)
        tr.appendChild(tdPop)
        tr.appendChild(tdSurface)
        tr.appendChild(tdDensite)
        tr.appendChild(tdContinent)
        tr.appendChild(tdDrapeau)
        tr.appendChild(a)

        tr.addEventListener('click',(event) => {
            a.click()
        })

        tableauBody.appendChild(tr)

        // popup pays
        const a_popup = document.createElement("a")
        const href_popup = document.createAttribute("href")
        href_popup.value = '#'
        a_popup.setAttributeNode(href_popup)
        a_popup.innerHTML = '&times;'
        a_popup.classList.add('cross')

        const div1 = document.createElement("div")
        div1.id = 'popup'+nb_popup.toString()
        div1.classList.add('overlay')

        const div2 = document.createElement("div")
        div2.classList.add('popup')
        
        const titre = document.createElement("h2")
        titre.textContent = pays.nomFrancais

        const content = document.createElement("p")
        content.innerHTML = pays.toString()

        div2.appendChild(a_popup)
        div2.appendChild(titre)
        div2.appendChild(content)
        div1.appendChild(div2)
        div_popup.appendChild(div1)

        nb_popup++

        // popup drapeau
        const a_popup_drapeau = document.createElement("a")
        const href_popup_drapeau = document.createAttribute("href")
        href_popup_drapeau.value = '#'
        a_popup_drapeau.setAttributeNode(href_popup_drapeau)
        a_popup_drapeau.innerHTML = '&times;'
        a_popup_drapeau.classList.add('cross')

        const div1_drapeau = document.createElement("div")
        div1_drapeau.id = 'popup_drapeau'+nb_popup_drapeau.toString()
        div1_drapeau.classList.add('overlay')

        const div2_drapeau = document.createElement("div")
        div2_drapeau.classList.add('popup', 'popup_drapeau')
        
        const content_drapeau = document.createElement("img")
        content_drapeau.src = pays.drapeau
        content_drapeau.classList.add('img_detail')

        div2_drapeau.appendChild(a_popup_drapeau)
        div2_drapeau.appendChild(content_drapeau)
        div1_drapeau.appendChild(div2_drapeau)
        div_popup.appendChild(div1_drapeau)

        nb_popup++
        nb_popup_drapeau++
    }
    nb_popup = 1
    nb_popup_drapeau = 1
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