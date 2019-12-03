

window.onload = fetchCountryData();

export async function fetchCountryData(name){

   await fetch(`https://restcountries.eu/rest/v2/name/${name}`,{
        method: 'GET'
    }).then(response => response.json())
    .then(response => {
        response.forEach(country => {
            questions.push(country.flag);
        })
     })
    .catch(err => {
        console.log(err);
    });
    console.log(flag);
}

export let flag =[];

export async function countryInfo(name){
 await fetch(`https://restcountries.eu/rest/v2/name/${name}`,{
        method: 'GET'
    }).then(response => response.json()).then(response => 
        response.forEach(country => {
             window.alert(
                `Name: ${country.name} 
                Capital: ${country.capital} 
                Population: ${country.population}  
                Region: ${country.region}  
                Subregion: ${country.subregion}` )
             }).catch(err => {
        console.log(err);
    }));
}
