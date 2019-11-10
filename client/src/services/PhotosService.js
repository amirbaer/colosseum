import Api from '@/services/Api'

export default {
  fetchPhotos (page) {
    return Api().get(`photos?page=${page}`)
  }
}
