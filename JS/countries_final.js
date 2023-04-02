const tableauBody = document.getElementById("body")
const div_popup = document.getElementById("div_popup")
const select_continent = document.getElementById("continent-select")
const select_langue = document.getElementById("langue-select")
const th_nom = document.getElementById("nom")
const th_pop = document.getElementById("pop")
const th_surface = document.getElementById("surface")
const th_densite = document.getElementById("densite")
const th_continent = document.getElementById("continent")

let start = 0
let end = 24
let nb_popup = 1
let nb_popup_drapeau = 1

let all_countrie = Object.values(Country.all_countries)
let data_pays = [...all_countrie]
let pays_affiche = data_pays.filter((elem,key) => key < 25)
let continents = Array.from(new Set(data_pays.map(e => e.continent).sort()))
let langues = Array.from(new Set(data_pays.map(e => e.languages).flat()))

let current_continent = ''
let current_langue = ''
let current_pays = ''

let current_tri = ''
let tabWithOutTri = [] //table que sert à conserver les filtres

function setSelect() {
    for(const continent of continents){
        const option = document.createElement("option")
        option.value = continent
        option.textContent = continent
        select_continent.appendChild(option)
    }

    for(const langue of langues){
        const option = document.createElement("option")
        option.value = langue
        option.textContent = langue
        select_langue.appendChild(option)
    }
}


function filtreContinent(value) {
    resetTri()
    current_tri = ''
    start = 0
    end = 24
    if(value === ''){
        data_pays = [...all_countrie]
        current_continent = ''

        if(current_langue && current_pays){
            filtreLangue(current_langue)
            filtreInput(current_pays)
        } else if (current_langue) {
            filtreLangue(current_langue)
        } else if (current_pays) {
            filtreInput(current_pays)
        } else {
            pays_affiche = data_pays.filter((elem,key) => key < 25)
        }
    } else  if (current_continent !== '' && current_continent !== value){
        current_continent = value
        data_pays = [...all_countrie]
        data_pays = data_pays.filter((elem) => elem.continent === value)

        if(current_langue && current_pays){
            filtreLangue(current_langue)
            filtreInput(current_pays)
        } else if (current_langue) {
            filtreLangue(current_langue)
        } else if (current_pays) {
            filtreInput(current_pays)
        } else {
            pays_affiche = data_pays.filter((elem,key) => key < 25)
        }
    } else {
        current_continent = value
        data_pays = data_pays.filter((elem) => elem.continent === value)
        pays_affiche = data_pays.filter((elem,key) => key < 25)
    }
    chargeDonnees()
}

function filtreLangue(value) {
    resetTri()
    current_tri = ''
    start = 0
    end = 24
    if(value === ''){
        data_pays = [...all_countrie]
        current_langue = ''

        if(current_continent && current_pays){
            filtreContinent(current_continent)
            filtreInput(current_pays)
        } else if (current_continent) {
            filtreContinent(current_continent)
        } else if (current_pays) {
            filtreInput(current_pays)
        } else {
            pays_affiche = data_pays.filter((elem,key) => key < 25)
        }
    } else  if (current_langue !== '' && current_langue !== value){
        current_langue = value
        data_pays = [...all_countrie]
        data_pays = data_pays.filter((elem) => elem.languages.includes(value))

        if(current_continent && current_pays){
            filtreContinent(current_continent)
            filtreInput(current_pays)
        } else if (current_continent) {
            filtreContinent(current_continent)
        } else if (current_pays) {
            filtreInput(current_pays)
        } else {
            pays_affiche = data_pays.filter((elem,key) => key < 25)
        }
    } else {
        current_langue = value
        data_pays = data_pays.filter((elem) => elem.languages.includes(value))
        pays_affiche = data_pays.filter((elem,key) => key < 25)
    }
    chargeDonnees()
}

function debounce(func, timeout = 500){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}
function filtreInput(value){
    resetTri()
    current_tri = ''
    start = 0
    end = 24
    if(value === ''){
        data_pays = all_countrie
        current_pays = ''

        if(current_continent && current_langue){
            filtreContinent(current_continent)
            filtreLangue(current_langue)
        } else if (current_continent) {
            filtreContinent(current_continent)
        } else if (current_langue) {
            filtreLangue(current_langue)
        } else {
            pays_affiche = data_pays.filter((elem,key) => key < 25)
        }
    } else  if (current_pays !== '' && current_pays !== value){
        current_pays = value
        data_pays = all_countrie
        data_pays = data_pays.filter((elem) => elem.nomFrancais.toLowerCase().includes(value.toLowerCase()) || elem.nomAnglais.toLowerCase().includes(value.toLowerCase()))

        if(current_continent && current_langue){
            filtreContinent(current_continent)
            filtreLangue(current_langue)
        } else if (current_continent) {
            filtreContinent(current_continent)
        } else if (current_langue) {
            filtreLangue(current_langue)
        } else {
            pays_affiche = data_pays.filter((elem,key) => key < 25)
        }
    } else {
        current_pays = value
        data_pays = data_pays.filter((elem) => elem.nomFrancais.toLowerCase().includes(value.toLowerCase()) || elem.nomAnglais.toLowerCase().includes(value.toLowerCase()))
        pays_affiche = data_pays.filter((elem,key) => key < 25)
    }
    chargeDonnees()
}
const processChange = debounce((value) => filtreInput(value));

const resetTri = () => {
    switch(current_tri){
        case 'pays':
            th_nom.classList.remove('gras')
            break
        case 'pop':
            th_pop.classList.remove('gras')
            break
        case 'surface':
            th_surface.classList.remove('gras')
            break
        case 'densite':
            th_densite.classList.remove('gras')
            break
        case 'continent':
            th_continent.classList.remove('gras')
            break
    }
}

th_nom.addEventListener('click',(event) => {
    if(current_tri){
        console.log('test')
        resetTri()
    } else {
        th_nom.classList.add('gras')
    }
    triPays()
})
const triPays = () => {
    start = 0
    end = 24
    if(current_tri === ''){
        tabWithOutTri = [...data_pays]
    }
    if(current_tri !== 'pays'){
        current_tri = 'pays'
        data_pays.sort((a,b) => {
            return a.nomFrancais.localeCompare(b.nomFrancais)
        })
    } else {
        current_tri = ''
        data_pays = [...tabWithOutTri]
    }
    pays_affiche = data_pays.filter((elem,key) => key < 25)
    chargeDonnees()
}

th_pop.addEventListener('click',(event) => {
    if(current_tri){
        resetTri()
    } else {
        th_pop.classList.add('gras')
    }
    triPop()
})
const triPop = () => {
    start = 0
    end = 24
    if(current_tri === ''){
        tabWithOutTri = [...data_pays]
    }
    if(current_tri !== 'pop'){
        current_tri = 'pop'
        data_pays.sort((a,b) => {
            return a.population - b.population
        })
    } else {
        current_tri = ''
        data_pays = [...tabWithOutTri]
    }
    pays_affiche = data_pays.filter((elem,key) => key < 25)
    chargeDonnees()
}

th_surface.addEventListener('click',(event) => {
    if(current_tri){
        resetTri()
    } else {
        th_surface.classList.add('gras')
    }
    triSurface()
})
const triSurface = () => {
    start = 0
    end = 24
    if(current_tri === ''){
        tabWithOutTri = [...data_pays]
    }
    if(current_tri !== 'surface'){
        current_tri = 'surface'
        data_pays.sort((a,b) => {
            return a.superficie - b.superficie
        })
    } else {
        current_tri = ''
        data_pays = [...tabWithOutTri]
    }
    pays_affiche = data_pays.filter((elem,key) => key < 25)
    chargeDonnees()
}

th_densite.addEventListener('click',(event) => {
    if(current_tri){
        resetTri()
    } else {
        th_densite.classList.add('gras')
    }
    triDensite()
})
const triDensite = () => {
    start = 0
    end = 24
    if(current_tri === ''){
        tabWithOutTri = [...data_pays]
    }
    if(current_tri !== 'densite'){
        current_tri = 'densite'
        data_pays.sort((a,b) => {
            return a.getPopDensity - b.getPopDensity
        })
    } else {
        current_tri = ''
        data_pays = [...tabWithOutTri]
    }
    pays_affiche = data_pays.filter((elem,key) => key < 25)
    chargeDonnees()
}

th_continent.addEventListener('click',(event) => {
    if(current_tri){
        resetTri()
    } else {
        th_continent.classList.add('gras')
    }
    triContinent()
})
const triContinent = () => {
    start = 0
    end = 24
    if(current_tri === ''){
        tabWithOutTri = [...data_pays]
    }
    if(current_tri !== 'continent'){
        current_tri = 'continent'
        data_pays.sort((a,b) => {
            return a.continent.localeCompare(b.continent)
        }).sort((a,b) => {
            if(a.continent.localeCompare(b.continent) === 0){
                return a.nomFrancais.localeCompare(b.nomFrancais)
            }
        })
    } else {
        current_tri = ''
        data_pays = [...tabWithOutTri]
    }
    pays_affiche = data_pays.filter((elem,key) => key < 25)
    chargeDonnees()
}

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
        if(end - start !== 24){
            end = end - (end - start + 1)
            start = end - 24
        } else {
            start = start - 25
            end = end - 25
        }
        pays_affiche = data_pays.filter((elem,key) => key>=start && key <= end)
    }
    chargeDonnees(pays_affiche)
}

function lancement(){
    all_countrie = Object.values(Country.all_countries)
    data_pays = [...all_countrie]
    pays_affiche = data_pays.filter((elem,key) => key < 25)
    continents = Array.from(new Set(data_pays.map(e => e.continent).sort()))
    langues = Array.from(new Set(data_pays.map(e => e.languages).flat()))
    setSelect()
    chargeDonnees()
}