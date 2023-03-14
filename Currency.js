class Currency {

    static all_currencies = {}

    constructor(monnaie) {
        this._code = monnaie.code
        this._nom = monnaie.name
        this._symbole = monnaie.symbol

        if(!Currency.all_currencies[this._code]) {
            Currency.all_currencies[this._code] = this
        }
        
    }

    get code() {
        return this._code
    }

    get nom() {
        return this._nom
    }

    get symbole() {
        return this._symbole
    }

    toString() {
        return "La monnaie se nomme : " + this.nom + ", son code est : " + this.code + "\n son symbole est : " + this.symbole
    }

}