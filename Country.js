class Country {

    static all_countries = {}

    constructor(pays) {
        this._name =  {
            français : pays.translations.fr ? pays.translations.fr : "",
            anglais : pays.name,
            allemand : pays.translations.de ? pays.translations.de : "",
            italien : pays.translations.it ? pays.translations.it : ""

        }
        this._alpha3code = pays.alpha3Code
        this._superficie = pays.area
        this._paysFrontaliers = pays.borders ? pays.borders : []
        this._capitale = pays.capital ? pays.capital : ""
        this._continent = pays.region
        this._gentile = pays.demonym
        this._drapeau = pays.flag
        this._population = pays.population
        this._TLD = pays.topLevelDomain ? pays.topLevelDomain : []
        this._codeMonnaie = pays.currencies ? pays.currencies.map(element => element.code) : []
        this._languages = pays.languages ? pays.languages.map(element => element.name) : []
    }

    toString() {
        let listePaysFronta = ""
        let listeTLD = ""
        let listeMonnaie = ""
        let listeLangue = ""
        this._paysFrontaliers.forEach(element => listePaysFronta+= Country.all_countries[element].nomFrancais + ", ")
        this._TLD.forEach(element => listeTLD+= element + ", ")
        this._codeMonnaie.forEach(element => listeMonnaie+= Currency.all_currencies[element].nom + ", ")
        this._languages.forEach(element => listeLangue+= Language.all_languages[element]._nom + ", ")
        //Enlève les deux derniers caractères à la fin de la chaîne de caractère pour éviter d'afficher la virgule.
        listePaysFronta = listePaysFronta.substring(0, listePaysFronta.length - 2)
        listeTLD = listeTLD.substring(0, listeTLD.length - 2)
        listeMonnaie = listeMonnaie.substring(0, listeMonnaie.length - 2)
        listeLangue = listeLangue.substring(0, listeLangue.length - 2)


        if(this.capitale == "") {
            return "Nom : " + this.nomAnglais + "\nPopulation : " + this.population + "\nSuperficie : " + this.superficie + " km²\n" +
            "Densité : " + this.getPopDensity + "\nContinent : " + this._continent + "\nPays frontaliers : " + listePaysFronta + "\nAppelation habitant : " + this._gentile +
            "\nTop Level Domains : " + listeTLD + "\nMonnaies : " + listeMonnaie + "\nLangues parlées : " + listeLangue
        } else {
            return "Nom : " + this.nomAnglais + "\nCapitale : " + this.capitale + "\nPopulation : " + this.population + "\nSuperficie : " + this.superficie + " km²\n" +
            "Densité : " + this.getPopDensity + "\nContinent : " + this._continent + "\nPays frontaliers : " + listePaysFronta + "\nAppelation habitant : " + this._gentile +
            "\nTop Level Domains : " + listeTLD + "\nMonnaies : " + listeMonnaie + "\nLangues parlées : " + listeLangue
        }
        
    }

    get TLD(){
        return this._TLD
    }

    get nomAnglais() {
        return this._name.anglais
    }

    get nomFrancais() {
        return this._name.français
    }

    get capitale() {
        return this._capitale
    }

    get alpha3code() {
        return this._alpha3code
    }

    get codeMonnaie() {
        return this._codeMonnaie
    }

    get languages(){
        return this._languages
    }

    get population(){
        return this._population
    }

    get superficie(){
        return this._superficie
    }

    get getPopDensity() {
        if(!this._superficie){
            return -1
        } else {
            return this._population / this._superficie
        }
    }

    get drapeau(){
        return this._drapeau
    }

    get continent(){
        return this._continent
    }

    get paysFrontaliers() {
        return this._paysFrontaliers
    }

    get getBorders() {
        let paysFrontaliers = []
        for(const country of this._paysFrontaliers) {
            paysFrontaliers.push(Country.all_countries[country])
        }
        return paysFrontaliers
    }

    get getCurrencies() {
        let listeMonnaie = []
        this.codeMonnaie.forEach(code => {

            listeMonnaie.push(Currency.all_currencies[code])
        })
        return listeMonnaie
    }

    get getLanguages() {
        let listeLangue = []
        this.languages.forEach(name => {

            listeLangue.push(Language.all_languages[name])
        })
        return listeLangue
    }

    static fill_db(data) {
        for(const country of data) {
            let nouveau = new Country(country)
            this.all_countries[nouveau.alpha3code] = nouveau
            if(country.currencies){
                for(let monnaie of country.currencies) {
                    new Currency(monnaie)
                }
            }
            for(let langue of country.languages) {
                new Language(langue)
            }
        }
    }

    static affichage_pays() {
        for(const country in this.all_countries) {
            console.log(this.all_countries[country].toString())
        }
    }


}

Country.fill_db(countries)
//Country.affichage_pays()
//console.log(Country.all_countries["AFG"].getBorders())

// console.log(Country.all_countries["AFG"].getLanguages)
