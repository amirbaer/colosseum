<template>
  <div class="photos">
    <h1>Photos</h1>
    This file will list all the photos.

    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="limit">
      <div v-for="photo in photos" v-bind:key="photo._id" data-aos="slide-up" data-aos-offset="100" data-aos-easing="ease-out-back">
        <p>
          <img v-bind:src="photo.thumbnail" />
          <span><b>{{ photo.filename }}</b></span><br />
          <span>{{ photo.size }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from 'aos'
import 'aos/dist/aos.css'
import infiniteScroll from 'vue-infinite-scroll'
import PhotosService from '@/services/PhotosService'

export default {
  name: 'photos',
  data () {
    return {
      photos: [],
      busy: false,
      page: 1
    }
  },
  created () {
    AOS.init()
    PhotosService.fetchPhotos()
      .then(photos => (this.photos = this.photos.concat(photos)))
  },
  methods: {
    loadMore () {
      this.busy = true
      this.page += 1

      setTimeout(() => {
        PhotosService.fetchPhotos(this.page)
          .then(photos => (this.photos = this.photos.concat(photos)))
        this.busy = false
      }, 1000)
    }
  },
  directives: {
    infiniteScroll
  }
}

</script>
