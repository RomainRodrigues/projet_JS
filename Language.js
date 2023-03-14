class Language{

    static all_languages = {}

    constructor(langues){
        this._nom = langues.name
        this._iso639_2 = langues.iso639_2

        if(!Language.all_languages[this._nom]) {
            Language.all_languages[this._nom] = this
        }
    }

}