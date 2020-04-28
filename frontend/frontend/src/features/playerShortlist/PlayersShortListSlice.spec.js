import playerShortList, {addPlayer, removePlayer} from "./PlayersShortListSlice";

describe('PlayerShortList reducer', function () {
    it('should handle add player to shortlist',()=> {
        expect(
            playerShortList([], {
                type: addPlayer.type,
                payload: {
                    id: 1,
                    info: {name:'douglas', position:'midfield'}
                }
            })
        ).toEqual([
            {
                id: 1,
                info: {name:'douglas', position:'midfield'}
            }
        ])
    })
});


