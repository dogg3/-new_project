import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './ForwardsShortListSlice'
import {getFirebase,getFirestore} from "react-redux-firebase";
import myFirebase from "../../../firebase";

//Mock the adding of player to the shorlist
jest.mock('react-redux-firebase', () => ({
    getFirestore: jest.fn().mockReturnValue({
        collection: jest.fn().mockReturnValue({
            doc: jest.fn().mockReturnValue({
                collection: jest.fn().mockReturnValue({
                    doc: jest.fn().mockReturnValue({
                        delete: jest.fn().mockResolvedValue(),
                        set:jest.fn(x =>{
                            if( x['playerId'] == undefined){
                                return Promise.reject('aa')
                            }
                            else {
                                return Promise.resolve()
                            }
                        })
                    })
                }),
                set: jest.fn((x) => {

                    if( x['playerId'] == undefined){
                        return Promise.reject('aa')
                    }
                    else {
                        return Promise.resolve()
                    }
                }),
                update: jest.fn((x) => {

                    if( x['playerId'] == undefined){
                        return Promise.reject('no player id')
                    }
                    else {
                        return Promise.resolve()
                    }
                }),
            })
        })
    })
}));






const middlewares = [thunk.withExtraArgument({getFirestore})];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('Testing the forward shortlist reducer', ()=> {



    //ADDING
    describe('Testing adding player to forward shortlist', () =>{

        it('Should handle add player success',()=>{
            //We mock the firestore here as resolved
            return store.dispatch(actions.shortlist_add_forward('qQqPa6ROJPZRTjMBZmjb2Cycy4t2',36)).then(() =>{
                //Actions handled and passed playerID and userid to firestore
                expect(store.getActions()[0].type).toEqual(actions.add_forward_loading().type);
                expect(store.getActions()[1].type).toEqual(actions.add_forward_success().type)
            })
        });


        it('Should handle add player failure when no arguments passed',()=>{
            const store = mockStore();
            return store.dispatch(actions.shortlist_add_forward()).then(() =>{
                //Actions handled and passed playerID and userid to firestore
                expect(store.getActions()[0].type).toEqual(actions.add_forward_loading().type);
                expect(store.getActions()[1].type).toEqual(actions.add_forward_failure().type)
                //console.log()(store.getActions()[1])
            })
        })
    });



    describe('Testing removing player to forward shortlist', () =>{

        it('Should handle remove player success',()=>{
            const store = mockStore();
            //We mock the firestore here as resolved
            return store.dispatch(actions.shortlist_remove_forward('qQqPa6ROJPZRTjMBZmjb2Cycy4t2',36)).then(() =>{
                //Actions handled and passed playerID and userid to firestore
                expect(store.getActions()[0].type).toEqual(actions.shortlist_remove_forward_loading().type);
                expect(store.getActions()[1].type).toEqual(actions.shortlist_remove_forward_success().type)
            })
        })
    })

});