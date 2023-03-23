import { createSlice } from '@reduxjs/toolkit'
import crud from '../services/crud'

export const PhotoStore = createSlice({
  name: 'PhotoStore',
  initialState: {
    title: '',
    condition: '',
  },
  reducers: {
      
      saveData: async (state, payload) => {
        await crud.save(payload)
        .then((data) => {
            state.title = payload.title
            state.condition = payload.condition
        })

        return state        
    },
  },
})

export const { saveData } = PhotoStore.actions

export default PhotoStore.reducer