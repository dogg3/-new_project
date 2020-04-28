import {createSlice} from "@reduxjs/toolkit";

let nextId = 0

const playersPivotSlice = createSlice({
    name: 'playersPivot',
    initialState:[],
    reducers:{

    }
})

export const {addToShortList} = playersPivotSlice.actions


export default playersPivotSlice.reducer