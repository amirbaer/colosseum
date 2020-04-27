import Api from '@/services/Api'
import HelperService from '@/services/HelperService'

export default {
  async fetchPhotos (page) {
    var photos = []
    return Api().get(`photos?page=${page}`)
      .then(function (response) {
        response.data.forEach(function (photo) {
          photo.thumbnail = 'data:image/jpeg;base64,' + HelperService.arrayBufferToBase64(photo.thumbnail.data)
          photos.push(photo)
        })
        return photos
      })
  },
  async fetchRandomPhotos () {
    var photos = []
    return Api().get(`photos-rand`)
      .then(function (response) {
        response.data.forEach(function (photo) {
          photo.thumbnail = 'data:image/jpeg;base64,' + HelperService.arrayBufferToBase64(photo.thumbnail.data)
          photos.push(photo)
        })
        return photos
      })
  }
}
