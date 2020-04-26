
import Vue from 'vue'
import Router from 'vue-router'
import Photos from '@/components/Photos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/photos'
    },
    {
      path: '/photos',
      name: 'Photos',
      component: Photos
    }
  ]
})
