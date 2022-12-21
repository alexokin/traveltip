import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { placeService } from './services/place.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetUserPos = onGetUserPos
window.onRemovePlace = onRemovePlace


function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))

    placeService.query()
        .then(placesToRender)
}


// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

// function onGetLocs() {
//     locService.getLocs()
//         .then(locs => {
//             console.log('Locations:', locs)
//             document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
//         })
// }

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo(lat,lng) {
    console.log('Panning the Map')
    mapService.panTo(lat, lng)
}

function onRemovePlace(id){
    placeService.remove(id)
    .then(onInit)
}

function placesToRender(locations) {
    console.log(locations);
    const strHTML = locations.map(location => {
        return `<tr data-list-id="${location.id}">
        <td>${location.name}</td>
        <td><span class="btn-del-list" onClick="onPanTo(${location.lat},${location.lng})">GO</span></td>
        <td><span class="btn-del-list" onclick="onRemovePlace('${location.id}')">✕</span></td>
        </tr>
        `
    })
    const elLocationsTable = document.querySelector('.loc-table')
    elLocationsTable.innerHTML = strHTML.join('')
}