<template>
  <div class="photos">
    <h1>Photos</h1>
    This file will list all the photos.

    <div v-for="photo in photos" v-bind:key="photo._id">
      <p>
        <span><b>{{ photo.filename }}</b></span><br />
        <span>{{ photo.size }}</span>
      </p>
    </div>
  </div>
</template>


<script>
import PhotosService from '@/services/PhotosService'
export default {
  name: 'photos',
  data () {
    return {
      photos: []
    }
  },
  created () {
    this.getPhotos()
  },
  methods: {
    async getPhotos () {
      const response = await PhotosService.fetchPhotos()
      this.photos = response.data
    }
  }
}
</script>
