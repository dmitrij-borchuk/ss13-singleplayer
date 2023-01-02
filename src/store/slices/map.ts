import { createSlice /* , PayloadAction */ } from '@reduxjs/toolkit'
import { StaticObject } from '../../types'

interface MapState {
	objects: StaticObject[]
}

const initialState: MapState = { objects: [] }

const slice = createSlice({
	name: 'map',
	initialState,
	reducers: {},
})

// export const { pause } = slice.actions

export default slice.reducer
