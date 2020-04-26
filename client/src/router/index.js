
import Vue from 'vue'
import Router from 'vue-router'
import Photos from '@/components/Photos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/photos',
      alias: '/',
      name: 'Photos',
      component: Photos
    }
  ]
})
