import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GameState {
	paused: boolean
}

const initialState: GameState = { paused: false }

const slice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		pause(state, action: PayloadAction<boolean>) {
			state.paused = action.payload
		},
	},
})

export const { pause } = slice.actions

export default slice.reducer
