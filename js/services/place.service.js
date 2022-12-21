import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { mapService } from './map.service.js'


const PLACE_KEY = 'placeDB'
_createPlaces()

export const placeService = {
    get,
    remove,
    save,
}
function query() {
    return storageService.query(PET_KEY)
}
function get(placeId) {
    return storageService.get(PLACE_KEY , placeId)
}

function remove(placeId) {
    return storageService.remove(PLACE_KEY , placeId)
}

function save(place) {
    if (place.id) {
        return storageService.put(PLACE_KEY , place)
    } else {
        return storageService.post(PLACE_KEY , place)
    }
}


// CREATE//

function getEmptyPlace(name = '',lat,lng) {
    return { id: makeId(), name,lat,lng} 
}

function _createPlaces() {
    let places = utilService.loadFromStorage(PLACE_KEY)
    if (!places || !places.length) {
        _createDemoPlaces()
    }
}


function _createDemoPlaces() {
    const placeNames = ['Greatplace', 'Neveragain']
    const placeCoords = [{lat: 32.047104,lng:34.832384},{lat: 32.047201,lng: 34.832581}]

    const places = placeNames.map((placeName, i) => {
        const place = _createPlace(placeName)
        place.placeCoords = placeCoords[i]
        return place
    })

    utilService.saveToStorage(PLACE_KEY, places)
}

function _createPlace(name) {
    const place = getEmptyPlace()
    place.id = utilService.makeId()
    place.name = name || utilService.randomPetName(pet.type)
    // place.lat = utilService.randomLat()
    // place.lng = utilService.randomLng()
    // place.createdAt = utilService.randomPastTime()
    // place.updatedAt = utilService.randomPastTime()
    // place.weather = utilService.
    return place
}
