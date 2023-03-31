let xhr = new  XMLHttpRequest ();
let countries = {}
const body_loader = document.getElementById('loader')

if (!xhr) {
    alert("Erreur de creation de l’objet XML HTTP Request");
} else {
    xhr.open("GET", '/PHP/gateway_to_restcountries.php', true);
    xhr.onreadystatechange = process;
    xhr.send(null);
}

function process () {
   if (xhr.readyState  == 4) {
      if (xhr.status  == 200) {
        countries = JSON.parse(xhr.response)
        Country.fill_db(countries)
        body_loader.classList.toggle('loader')
        lancement()
        //  alert("Ca marche : le  serveur a repondu !");
      } else {
         alert('Erreur retour requete XML HTTP : '+xhr.status);
      }
   }
}