const fetchbtn=document.getElementById('fetchdata');
fetchbtn.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getcordinates,handleError);

    }else{
        alert("Geolocation is not supported by this browser.");
    }
})
function getcordinates(position){
    var latitude=position.coords.latitude;
    var longitude=position.coords.longitude;
    window.location.href = `weather.html?lat=${latitude}&lon=${longitude}`;
    storecoordinates(latitude,longitude);
}

let usercoord={};
function storecoordinates(latitude,longitude){
    usercoord={latitude,longitude};
    console.log(usercoord);
}
function handleError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}