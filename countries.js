
window.onload =fetchCountryData();
async function fetchCountryData(){
    fetch("https://restcountries.eu/rest/v2/all",{
        method: 'GET'
    }).then(response => response.json())
    .then(response => {
        response.forEach(country => {
            console.log(`Name:   ${country.name}`);
            console.log(`Flag:   ${country.flag}`);
        })
     })
    .catch(err => {
        console.log(err);
    });
}


export async function countryInfo(name){
    fetch(`https://restcountries.eu/rest/v2/name/${name}`,{
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

