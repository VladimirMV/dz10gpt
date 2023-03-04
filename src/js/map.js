export function startMap() {

    let mapOptions = {
        zoom: 3,
        minZoom: 1,
        center: new google.maps.LatLng(50.7244893,3.2668189),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        backgroundColor: 'none'
    };
    let map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
};


export function showCountriesCoose(countries) {
  
    let Mapss = function geoadres(adress) {
    let resultlat = ''; let resultlng = '';
    let resultnorthlng = ''; let resultsouthwlng = '';
    let resultnorthlat = ''; let resultsouthwlat = '';
    let zoom1 = 3;
    $.ajax({
    async: false,
    dataType: "json",
    url: 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyDjRKNZsq0ey2ADwabVY2KNl7n50KAGMZA&address=' + adress,
    success: function(data){
        console.log(data); 
    for (let key in data.results) {
    resultlat = data.results[key].geometry.location.lat;
    resultlng = data.results[key].geometry.location.lng;
   

    resultnorthlat = data.results[key].geometry.bounds.northeast.lat;
    resultnorthlng = data.results[key].geometry.bounds.northeast.lng;

    resultsouthwlat = data.results[key].geometry.bounds.southwest.lat;
    resultsouthwlng = data.results[key].geometry.bounds.southwest.lng;
     let deltax = resultnorthlng - resultsouthwlng; 
     let deltay = resultnorthlat - resultsouthwlat;

    
   let diagonal = Math.sqrt(deltax*deltax + deltay*deltay);
   
    zoom1 = Math.round(Math.log(360/diagonal)/Math.log(2))*1.4;
    if(zoom1 < 3) zoom1 = 3;
    if(zoom1 > 15) zoom1 = 15;
    
      
    } }
    });

    
    let mapOptions = {
        zoom:  zoom1,
        minZoom: 1,
        center: new google.maps.LatLng(resultlat,resultlng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        backgroundColor: 'none'
    };
  
     
    let map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    return { lat: resultlat, lng: resultlng};
    }
    let geo = new Mapss(countries.name.common);
    
    
}