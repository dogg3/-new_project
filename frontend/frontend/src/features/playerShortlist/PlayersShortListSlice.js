import {createSlice} from "@reduxjs/toolkit";

const PlayersShortList = createSlice({
    name:'playerShortList',
    initialState:[],
    reducers:{
        addPlayer(state, action){
            const {id, info} = action.payload
            state.push({id, info})
        },
        removePlayer(state, action){
            const {id} = action.payload
            state.pop({id})
        }
    }
})


export const {addPlayer, removePlayer} = PlayersShortList.actions
export default PlayersShortList.reducer