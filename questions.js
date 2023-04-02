Country.fill_db(countries)

function outsideTheContinent(){
    let res = []
    for(const key in Country.all_countries) {
        pays = Country.all_countries[key]
        pays.paysFrontaliers.forEach(frontalier => {
            pays_frontalier = Country.all_countries[frontalier]
            if(pays.continent !== pays_frontalier.continent){
                if(!res.includes(pays)){
                    res.push(pays)
                }
            }
        })
    }
    return res
}

// console.log(outsideTheContinent())

function moreNeighbors(){
    let nbVoisins = 0
    let res = []
    for(const key in Country.all_countries) {
        pays = Country.all_countries[key]
        let frontaliers = []
        for (let frontalier of pays.paysFrontaliers) {
            frontaliers.push(Country.all_countries[frontalier])
        }
        if(pays.paysFrontaliers.length === nbVoisins){
            res.push({
                pays : pays,
                borders: frontaliers
            })
        } else if(pays.paysFrontaliers.length > nbVoisins){
            res = []
            nbVoisins = pays.paysFrontaliers.length
            res.push({
                pays : pays,
                borders: frontaliers
            })
        }
    }
    return res
}

// console.log(moreNeighbors())

function neighborless(){
    let res = []
    for(const key in Country.all_countries) {
        pays = Country.all_countries[key]
        if(pays.paysFrontaliers.length === 0){
            res.push(pays)
        }
    }
    return res
}

// console.log(neighborless())

function moreLanguages() {
    let nbLangues = 0
    let res = []
    for(const key in Country.all_countries) {
        pays = Country.all_countries[key]
        let langues = []
        for (let name of pays.languages) { // c'est le nom de la langue qui est stockée dans le tableau pays.languages
            langues.push(Language.all_languages[name])
        }
        if(pays.languages.length === nbLangues){
            res.push({
                pays : pays,
                languages: langues
            })
        } else if(pays.languages.length > nbLangues){
            res = []
            nbLangues = pays.languages.length
            res.push({
                pays : pays,
                languages: langues
            })
        }
    }
    return res
}

// console.log(moreLanguages())

function withCommonLanguage() {
    let res = []

    for(const key in Country.all_countries) {
        pays = Country.all_countries[key]
        let paysFronts = []
        for(frontalier of pays.paysFrontaliers) {
            let unpaysFrontalier = Country.all_countries[frontalier]
            let border_languages = []
            for(let nom_langue of unpaysFrontalier.languages) {
                if(pays.languages.find(e => e === nom_langue)) {
                    border_languages.push(Language.all_languages[nom_langue])
                }
            }
            if(border_languages.length > 0){
                paysFronts.push({
                    border : unpaysFrontalier,
                    languages : border_languages
                })
            }
        }
        if(paysFronts.length > 0){
            res.push({
                pays : pays,
                borders : paysFronts
            })
        }
        
    }
    return res 
}

// console.log(withCommonLanguage())

function withoutCommonCurrency() {
    let res = []

    for(const key in Country.all_countries) {
        pays = Country.all_countries[key]
        let compteur = 0
        for(frontalier of pays.paysFrontaliers) {
            let unpaysFrontalier = Country.all_countries[frontalier]
            if(pays.codeMonnaie.filter(e => unpaysFrontalier.codeMonnaie.find(z => z === e)).length > 0){
                compteur++
            }
        }
        if(compteur===0){
            res.push(pays)
        }
    }
    return res
}

// console.log(withoutCommonCurrency())

function sortingDecreasingDensity(){
    const keys = Object.keys(Country.all_countries).sort((a,b) => {
        return Country.all_countries[b].getPopDensity - Country.all_countries[a].getPopDensity
    })

    return keys.map(e => Country.all_countries[e])
}

// console.log(sortingDecreasingDensity())

function moreTopLevelDomains(){
    return Object.keys(Country.all_countries).map(e => Country.all_countries[e]).filter(elem => elem.TLD.length > 1)
}

// console.log(moreTopLevelDomains())

function veryLongTrip(nom_pays,liste=[]) {
    
    let codePays;
    for(let unPays of Object.keys(Country.all_countries).map(elem => Country.all_countries[elem])){
        if(unPays.nomAnglais == nom_pays){
            codePays = unPays.alpha3code
            break
        }
        
    }

    let pays = Country.all_countries[codePays]
    
    for(let paysFronts of pays.paysFrontaliers){
        let paysFronta = Country.all_countries[paysFronts]
        
        if(!liste.includes(paysFronta)){
            liste.push(paysFronta)
            veryLongTrip(paysFronta.nomAnglais,liste)
        } else {
            console.log("Pays déjà visité")
        }
    }
    return liste
}



// console.log(veryLongTrip("France"))