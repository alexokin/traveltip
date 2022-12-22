import { mapService } from './services/map.service.js'
import { placeService } from './services/place.service.js'

window.onload = onInit
window.markersToRender = markersToRender
window.onPanTo = onPanTo
window.onGetUserPos = onGetUserPos
window.onRemovePlace = onRemovePlace


function onInit() {
    mapService.initMap()
        .then(() => {
            const gMap = mapService.getMap()
            gMap.addListener("click", (event) => {
                const locationName = prompt("Please enter location name")
                const lat = event.latLng.lat()
                const lng = event.latLng.lng()
                onAddPlace(locationName, lat, lng)
            })
        })
        .catch(() => console.log('Error: cannot init map'))
    placeService.query()
        .then(placesToRender)
    markersToRender()
}

// Position helfers //

function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            onPanTo(pos.coords.latitude, pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

// Actions - pan,add,remove //

function onPanTo(lat, lng) {
    mapService.panTo(lat, lng)
}

function onAddPlace(locationName, lat, lng) {
    placeService.setNewPlace(locationName, lat, lng)
        .then(onInit)
}

function onRemovePlace(id) {
    placeService.remove(id)
        .then(onInit)
}

// Renders //

function placesToRender(locations) {
    const strHTML = locations.map(location => {
        return `<tr data-list-id="${location.id}">
        <td>${location.name}</td>
        <td><span class="pan-to" onClick="onPanTo(${location.lat},${location.lng})">GO</span></td>
        <td><span class="remove-place" onclick="onRemovePlace('${location.id}')">✕</span></td>
        </tr>
        `
    })
    const elLocationsTable = document.querySelector('.loc-table')
    elLocationsTable.innerHTML = strHTML.join('')
}

function markersToRender() {
    placeService.query()
        .then(locations => {
            locations.forEach(location => {
                mapService.addMarker(location.name, { lat: location.lat, lng: location.lng })
            })
        })
}
