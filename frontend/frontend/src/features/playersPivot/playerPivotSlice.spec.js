


import playersPivot from './playerPivotSlice'
import {fetch_defenders_overall,loading_defenders,defenders_success,defenders_failure,set_currentPlayer} from "./playerPivotSlice";
import {fetch_midfielders_overall,loading_midfielders,midfielders_success,midfielders_failure} from "./playerPivotSlice";
import {fetch_forwards_overall,loading_forwards,forwards_success,forwards_failure} from "./playerPivotSlice";

import {fetch_stats_defenders, loading_statistics_defenders,success_statistics_defenders,failure_statistics_defenders} from "./playerPivotSlice";
import {fetch_stats_midfielders, loading_statistics_midfielders,success_statistics_midfielders,failure_statistics_midfielders} from "./playerPivotSlice";
import {fetch_stats_forwards, loading_statistics_forwards,success_statistics_forwards,failure_statistics_forwards} from "./playerPivotSlice";


import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var mock = new MockAdapter(axios);


const defenderPlayerId = 36;
const midfielderPlayerId = 36;
const forwardPlayerId = 36;

describe('Testing the slice reducers', function () {
        beforeEach(()=>{
            var mock = new MockAdapter(axios);
            mock.restore()

        });


    //OVERALL data
    describe('Defenders overall',()=>{

        it('Should handle fetch success of defenders overall',()=>{
            const store = mockStore();
            mock.onGet('http://35.246.111.237/api/defenders/overall').reply(200, {
                    278289 : {name: 'douglas landvik'},167145:{name: 'douglas landvik'}
            });
            const resp = {278289 : {name: 'douglas landvik'},167145:{name: 'douglas landvik'}};
            return   store.dispatch(fetch_defenders_overall()).then(() => {
                //console.log()(store.getActions())
                expect(store.getActions()[0].type).toEqual(loading_defenders.type);
                expect(store.getActions()[1].type).toEqual(defenders_success.type);
                expect(store.getActions()[1].payload).toEqual(resp)
            })
        });

        it('Should handle fetch failure of defenders overall',()=>{
            const store = mockStore();
            mock.onGet('http://35.246.111.237/api/defenders/overall').reply(400);

            return store.dispatch(fetch_defenders_overall()).then(() => {
                //console.log()(store.getActions())
            }).catch(e=>{
                expect(store.getActions()[0].type).toEqual(loading_defenders.type);
                expect(store.getActions()[1].type).toEqual(defenders_failure.type)

            })
        })

    });


    describe('Midfielders overall',()=>{

        it('Should handle fetch success of midfielders overall',()=>{
            const store = mockStore();
            mock.onGet('http://35.246.111.237/api/midfielders/overall').reply(200, {
                278289 : {name: 'douglas landvik'},167145:{name: 'douglas landvik'}
            });
            const resp = {278289 : {name: 'douglas landvik'},167145:{name: 'douglas landvik'}};
            return   store.dispatch(fetch_midfielders_overall()).then(() => {
                //console.log()(store.getActions())
                expect(store.getActions()[0].type).toEqual(loading_midfielders.type);
                expect(store.getActions()[1].type).toEqual(midfielders_success.type);
                expect(store.getActions()[1].payload).toEqual(resp)
            })
        });

        it('Should handle fetch failure of midfielders overall',()=>{
            const store = mockStore();
            mock.onGet('http://35.246.111.237/api/midfielders/overall').reply(400);

            return store.dispatch(fetch_midfielders_overall()).then(() => {
            }).catch(e=>{
                expect(store.getActions()[0].type).toEqual(loading_midfielders.type);
                expect(store.getActions()[1].type).toEqual(midfielders_failure.type)
            })
        })

    });



    describe('Forwards overall',()=>{

        it('Should handle fetch success of forwards overall',()=>{
            const store = mockStore();
            mock.onGet('http://35.246.111.237/api/forwards/overall').reply(200, {
                278289 : {name: 'douglas landvik'},167145:{name: 'douglas landvik'}
            });
            const resp = {278289 : {name: 'douglas landvik'},167145:{name: 'douglas landvik'}};
          return    store.dispatch(fetch_forwards_overall()).then(() => {
                //console.log()(store.getActions())
                expect(store.getActions()[0].type).toEqual(loading_forwards.type);
                expect(store.getActions()[1].type).toEqual(forwards_success.type);
                expect(store.getActions()[1].payload).toEqual(resp)
            })
        });

        it('Should handle fetch failure of forwards overall',()=>{
            const store = mockStore();
            mock.onGet('http://35.246.111.237/api/forwards/overall').reply(400);

            return store.dispatch(fetch_forwards_overall()).then(() => {

            }).catch(e=>{
                ////console.log()(store.getActions())
                expect(store.getActions()[0].type).toEqual(loading_forwards.type);
                expect(store.getActions()[1].type).toEqual(forwards_failure.type)
            })
        })

    });
    


    //STATS data of all datapoints in set
    describe('Defenders stats', ()=>{


        it('Should handle fetch defenders stats succesfully',    () =>{
            const store= mockStore();
            mock.onGet('http://35.246.111.237/api/defenders/stats').reply(200, {
                278289 : {name: 'douglas landvik'},167145:{name: 'douglas landvik'}
            });
            const resp = {278289 : {name: 'douglas landvik'},167145:{name: 'douglas landvik'}};
             return store.dispatch(fetch_stats_defenders()).then(()=>{
                //console.log()(store.getActions())
                expect(store.getActions()[0].type).toEqual(loading_statistics_defenders.type);
                expect(store.getActions()[1].type).toEqual(success_statistics_defenders.type);
                expect(store.getActions()[1].payload).toEqual(resp)
            })

        });


        it('Should handle fetch failure defenders stats ',()=>{
            const store= mockStore();

            mock.onGet('http://35.246.111.237/api/defenders/stats').reply(400);
            return store.dispatch(fetch_stats_defenders()).then(()=>{
            }).catch((e)=>{
                expect(store.getActions()[0].type).toEqual(loading_statistics_defenders.type);
                expect(store.getActions()[1].type).toEqual(failure_statistics_defenders().type)
            })
        })


    });



    describe('forwards stats', ()=>{


        it('Should handle fetch forwards stats succesfully',    () =>{
            const store= mockStore();
            mock.onGet('http://35.246.111.237/api/forwards/stats').reply(200, {
                278289 : {name: 'douglas landvik'},167145:{name: 'douglas landvik'}
            });
            const resp = {278289 : {name: 'douglas landvik'},167145:{name: 'douglas landvik'}};
            return store.dispatch(fetch_stats_forwards()).then(()=>{
                //console.log()(store.getActions())
                expect(store.getActions()[0].type).toEqual(loading_statistics_forwards.type);
                expect(store.getActions()[1].type).toEqual(success_statistics_forwards.type);
                expect(store.getActions()[1].payload).toEqual(resp)
            })

        });


        it('Should handle fetch failure forwards stats ',()=>{
            const store= mockStore();

            mock.onGet('http://35.246.111.237/api/forwards/stats').reply(400);
            return store.dispatch(fetch_stats_forwards()).then(()=>{
            }).catch((e)=>{
                expect(store.getActions()[0].type).toEqual(loading_statistics_forwards.type);
                expect(store.getActions()[1].type).toEqual(failure_statistics_forwards().type)
            })
        })


    });
        describe('forwards stats', ()=>{


            it('Should handle fetch forwards stats succesfully',    () =>{
                const store= mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/stats').reply(200, {
                    278289 : {name: 'douglas landvik'},167145:{name: 'douglas landvik'}
                });
                const resp = {278289 : {name: 'douglas landvik'},167145:{name: 'douglas landvik'}};
                return store.dispatch(fetch_stats_forwards()).then(()=>{
                    //console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(loading_statistics_forwards.type);
                    expect(store.getActions()[1].type).toEqual(success_statistics_forwards.type);
                    expect(store.getActions()[1].payload).toEqual(resp)
                })

            });

            it('Should handle fetch failure forwards stats ',()=>{
                const store= mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/stats').reply(400);
                return store.dispatch(fetch_stats_forwards()).then(()=>{
                }).catch((e)=>{
                    expect(store.getActions()[0].type).toEqual(loading_statistics_forwards.type);
                    expect(store.getActions()[1].type).toEqual(failure_statistics_forwards().type)
                })
            })


        })



});