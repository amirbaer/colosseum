import Api from '@/services/Api'

export default {
  fetchPhotos () {
    return Api().get('photos')
  }
}
