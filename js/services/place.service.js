import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const PLACE_KEY = 'placeDB'

export const placeService = {
    get,
    remove,
    save,
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

function getEmptyPlace(name = '') {
    return { id: '', name,lat,lng,createdAt,updatedAt}
}

function _createPlaces() {
    let pets = utilService.loadFromStorage(PET_KEY)
    if (!pets || !pets.length) {
        _createDemoPets()
    }
}


function _createDemoPlaces() {
    const placeNames = ['Greatplace', 'Neveragain']
    const placecords = ['{32.047104,34.832384}','{32.047201,34.832581}']

    const places = placeNames.map((placeName, i) => {
        const place = _createPlace(placeName)
        place.placecords = placecords[i]
        return place
    })

    utilService.saveToStorage(PET_KEY, pets)
}

function _createPlace(name) {
    const place = getEmptyPlace()
    place.id = utilService.makeId()
    place.name = name || utilService.randomPetName(pet.type)
    place.lat = utilService.randomLat()
    place.lng = utilService.randomLng()
    place.createdAt = utilService.randomPastTime()
    place.updatedAt = utilService.randomPastTime()
    // place.weather = utilService.
    return place
}
