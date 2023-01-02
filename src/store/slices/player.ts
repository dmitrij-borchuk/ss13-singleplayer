import {
	createSlice /* , PayloadAction */,
	PayloadAction,
} from '@reduxjs/toolkit'
import { GameObjectConfig } from '../../types'

interface PlayerState {
	inventory: GameObjectConfig[]
}

const initialState: PlayerState = { inventory: [] }

const slice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		addInventoryItem(state, action: PayloadAction<GameObjectConfig>) {
			state.inventory.push(action.payload)
		},
		removeInventoryItem(state, action: PayloadAction<string>) {
			const index = state.inventory.findIndex((i) => i.id === action.payload)
			state.inventory.splice(index, 1)
		},
	},
})

export default slice.reducer
