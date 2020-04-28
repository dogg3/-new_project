import playersPivot, {addToShortList} from "./playerPivotSlice";


//PlayerPivotsReducers
it('should should handle add_to_shorlits',()=>{


    expect(
        playersPivot([],{
            type:addToShortList.type,
            payload:{
                info:[]
            }
        })
    ).toEqual([],{
        type:addToShortList.type,
        payload:{
            info:[]
        }

    })
})