import { configureStore } from '@reduxjs/toolkit'
import PhotoStore from './PhotoStore'

export default configureStore({
  reducer: {
    photo: PhotoStore,
  },
})
