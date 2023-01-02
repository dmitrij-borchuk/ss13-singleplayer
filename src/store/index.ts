import { combineReducers, configureStore, createAction } from '@reduxjs/toolkit'
import { generateWorld } from '../utils/generator'
import gameReducer from './slices/game'
import mapReducer from './slices/map'
import playerReducer from './slices/player'
export const up = createAction('UP')

const reducer = combineReducers({
	game: gameReducer,
	map: mapReducer,
	player: playerReducer,
})

// export const createGameStore = (initialState: GameState) => {
// const reducer = createReducer<SpellTowerState>(initialState, {
//   [up.type]: state => moveColumns(state, up.type),
//   // Lots more here ...
// })
// }
export type RootState = ReturnType<typeof reducer>

const preloadedState: RootState = {
	game: {
		paused: true,
	},
	map: {
		objects: generateWorld(),
	},
	player: {
		inventory: [],
	},
}

// We need `any` here to prevent circular dependency
const store = configureStore({ reducer, preloadedState: preloadedState as any })

export default store

export type AppStore = typeof store
