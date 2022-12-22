export const mapService = {
    initMap,
    addMarker,
    panTo,
    getMap,
}

// Var that is used throughout this Module (not global)
var gMap
// const GEO_KEY = 'AIzaSyCCXR5LWk3ZODvwZVFokU7WhLEXR2aWDag'

function initMap(lat = 32.663000, lng = 35.020000) {
    return _connectGoogleApi()
        .then(() => {
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 12
            })
            var marker = new google.maps.Marker({
                position: { lat, lng },
                title: 'first location!'
            })
        })
}

function getMap() {
    return gMap
}

function addMarker(name,loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: `${name}`
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAfLttmiby9sv7RUc1lxi0h0XU_YBP-OoA' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}
