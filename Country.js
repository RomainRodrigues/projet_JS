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
        this._gentile = pays.denonym
        this._drapeau = pays.flag
        this._population = pays.population
        this._TLD = pays.topLevelDomain
        this._codeMonnaie = pays.currencies ? pays.currencies.map(element => element.code) : []
        this._languages = pays.languages ? pays.languages.map(element => element.name) : []
    }

    toString() {
        if(this.capitale == "") {
            return "Nom : " + this.nomAnglais
        } else {
            return "Nom : " + this.nomAnglais + ", la capitale est : " + this.capitale
        }
        
    }

    get nomAnglais() {
        return this._name.anglais
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

    get getPopDensity() {
        return this._population / this._superficie
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
