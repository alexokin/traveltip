import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { mapService } from './map.service.js'


const PLACE_KEY = 'placeDB'
_createPlaces()

export const placeService = {
    get,
    remove,
    save,
    getEmptyPlace,
    query,
    setnewplace,
}
function query() {
    return storageService.query(PLACE_KEY)
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
function setnewplace(name = '',lat,lng){
    const newPlace= {name,lat,lng}
    save(newPlace)
}
function getEmptyPlace(name = '',lat,lng) {
    return {name,lat,lng}
}

function _createPlaces() {
    let places = utilService.loadFromStorage(PLACE_KEY)
    if (!places || !places.length) {
        _createDemoPlaces()
    }
}


function _createDemoPlaces() {
    const placeNames = ['Greatplace', 'Neveragain']
    const placecords = [{lat:32.047104,lng:34.832384},{lat:32.047201,lng:34.832581}]

    const places = placeNames.map((place,i) => {
        const demoPlace = _createPlace(place)
        demoPlace.lat=placecords[i].lat
        demoPlace.lng=placecords[i].lng
        return demoPlace
    })

    utilService.saveToStorage(PLACE_KEY, places)
}

function _createPlace(name,lat,lng) {
    const place = getEmptyPlace()
    place.id = utilService.makeId()
    place.name = name
    place.lat = lat
    place.lng = lng
    // place.createdAt = utilService.randomPastTime()
    // place.updatedAt = utilService.randomPastTime()
    // place.weather = utilService.
    return place
}
