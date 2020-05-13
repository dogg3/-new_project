import {fetch_player_info,  loading_player_info, loading_player_info_success, loading_player_info_failure, set_player_id} from './forwardSlice'
import {fetch_duels_info, loading_duels_info, loading_duels_info_success, loading_duels_info_failure,fetch_duels_analytics, loading_duels_analytics, loading_duels_analytics_success, loading_duels_analytics_failure} from "./forwardSlice";
import {fetch_passes_info, loading_passes_info, loading_passes_info_success, loading_passes_info_failure,fetch_passes_analytics, loading_passes_analytics, loading_passes_analytics_success, loading_passes_analytics_failure} from "./forwardSlice";
import {fetch_shots_info, loading_shots_info, loading_shots_info_success, loading_shots_info_failure,fetch_shots_analytics, loading_shots_analytics, loading_shots_analytics_success, loading_shots_analytics_failure} from "./forwardSlice";
import {fetch_matches, loading_matches, loading_matches_success, loading_matches_failure} from "./forwardSlice";
import {fetch_rankings, loading_rankings, loading_rankings_success, loading_rankings_failure} from "./forwardSlice";


import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from "./forwardSlice";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var mock = new MockAdapter(axios);

///Change position and player Id here
const position = 'forwards';
const playerId = 36;


describe("Testing the player slice reducers" , () =>{



    ////PLAYER INFO TESTS
    describe('Testing playerinfo', () =>{
        beforeEach(()=>{
            var mock = new MockAdapter(axios);
            mock.restore()

        });



        it('Should handle fetch success of player info for forwards',()=>{

            const store = mockStore();
            const url ='http://35.246.111.237/api/'+position+'/playerinfo/' + playerId;
            //console.log()(url)
            mock.onGet(url).reply(200, {
                value : {name: 'douglas landvik'}
            });


            const resp = {value : {name: 'douglas landvik'}};
            return store.dispatch(fetch_player_info(playerId)).then(() => {
                //console.log()(store.getActions())
                expect(store.getActions()[0].type).toEqual(loading_player_info.type);
                expect(store.getActions()[2].type).toEqual(loading_player_info_success.type);
                expect(store.getActions()[2].payload).toEqual(resp)

            })
        });



        it('Should handle fetch failure of player info for forwards',()=>{

            const store = mockStore();
            mock.onGet('http://35.246.111.237/api/forwards/playerinfo/' + playerId).reply(404);
            return store.dispatch(fetch_player_info(playerId)).then(() => {

                ////console.log()(store.getActions())
                expect(store.getActions()[0].type).toEqual(loading_player_info.type);
                expect(store.getActions()[1].type).toEqual(loading_player_info_failure.type)
            })
        })

    });


    ////DUELS INFO TESTS
    describe('Testing player duels', () =>{

        beforeEach(()=>{
            var mock = new MockAdapter(axios);
            mock.restore()
        });

        describe('Duels info',()=>{

            it('Should handle fetch success of duel info',()=>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/duels/info/' + playerId).reply(200, {
                    36 : {name: 'douglas landvik'}
                });
                const resp = {36 : {name: 'douglas landvik'}};
                return store.dispatch(fetch_duels_info(playerId)).then(() => {
                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(loading_duels_info.type);
                    expect(store.getActions()[1].type).toEqual(loading_duels_info_success.type);
                    expect(store.getActions()[1].payload).toEqual(resp)
                })
            });


            it('Should handle fetch failure of player info',()=>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/duels/info/' + playerId).reply(404);
                return store.dispatch(fetch_duels_info(playerId)).then(() => {

                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(loading_duels_info.type);
                    expect(store.getActions()[1].type).toEqual(loading_duels_info_failure.type)
                })
            })


        });



        describe('Duels analytics',()=>{

            it('Should handle fetch success of duel analytics',()=>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/duels/analytics/' + playerId).reply(200, {
                    36 : {name: 'douglas landvik'}
                });
                const resp = {36 : {name: 'douglas landvik'}};
                return store.dispatch(fetch_duels_analytics(playerId)).then(() => {
                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(loading_duels_analytics.type);
                    expect(store.getActions()[1].type).toEqual(loading_duels_analytics_success.type);
                    expect(store.getActions()[1].payload).toEqual(resp)
                })
            });

            it('Should handle fetch failure of duel analytics',()=>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/duels/analytics/' + playerId).reply(400);

                return store.dispatch(fetch_duels_analytics(playerId)).then(() => {
                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(loading_duels_analytics.type);
                    expect(store.getActions()[1].type).toEqual(loading_duels_analytics_failure.type)
                })
            })

        })
    });


    describe('Testing player passes', ()=>{

        describe('Passes info',()=>{

            it("Should handle fetch success of passes info", ()=>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/passes/info/' + playerId).reply(200, {
                    36 : {name: 'douglas landvik'}
                });
                const resp = {36 : {name: 'douglas landvik'}};
                return store.dispatch(fetch_passes_info(playerId)).then(() => {
                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(loading_passes_info.type);
                    expect(store.getActions()[1].type).toEqual(loading_passes_info_success.type);
                    expect(store.getActions()[1].payload).toEqual(resp)
                })


            });

            it("Should handle fetch failure of passes info", ()=>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/passes/info/' + playerId).reply(404);
                return store.dispatch(fetch_passes_info(playerId)).then(() => {

                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(loading_passes_info.type);
                    expect(store.getActions()[1].type).toEqual(loading_passes_info_failure.type)
                })

            })

        });

        describe('Passes analytics',()=>{

            it('Should handle fetch success of duel analytics',()=>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/passes/analytics/' + playerId).reply(200, {
                    36 : {name: 'douglas landvik'}
                });
                const resp = {36 : {name: 'douglas landvik'}};
                return store.dispatch(fetch_passes_analytics(playerId)).then(() => {
                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(loading_passes_analytics.type);
                    expect(store.getActions()[1].type).toEqual(loading_passes_analytics_success.type);
                    expect(store.getActions()[1].payload).toEqual(resp)
                })
            });

            it('Should handle fetch failure of duel analytics',()=>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/passes/analytics/' + playerId).reply(400);

                return store.dispatch(fetch_passes_analytics(playerId)).then(() => {
                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(loading_passes_analytics.type);
                    expect(store.getActions()[1].type).toEqual(loading_passes_analytics_failure.type)
                })
            })

        })

    } );




    describe('Testing player shots', ()=>{

        describe('Shots info',()=>{

            it("Should handle fetch success of shots info", ()=>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/shots/info/' + playerId).reply(200, {
                    36 : {name: 'douglas landvik'}
                });
                const resp = {36 : {name: 'douglas landvik'}};
                return store.dispatch(fetch_shots_info(playerId)).then(() => {
                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(loading_shots_info.type);
                    expect(store.getActions()[1].type).toEqual(loading_shots_info_success.type);
                    expect(store.getActions()[1].payload).toEqual(resp)
                })


            });

            it("Should handle fetch failure of shots info", ()=>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/shots/info/' + playerId).reply(404);
                return store.dispatch(fetch_shots_info(playerId)).then(() => {

                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(loading_shots_info.type);
                    expect(store.getActions()[1].type).toEqual(loading_shots_info_failure.type)
                })

            })

        });

        describe('Shots analytics',()=>{

            it('Should handle fetch success of duel analytics',()=>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/shots/analytics/' + playerId).reply(200, {
                    36 : {name: 'douglas landvik'}
                });
                const resp = {36 : {name: 'douglas landvik'}};
                return store.dispatch(fetch_shots_analytics(playerId)).then(() => {
                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(loading_shots_analytics.type);
                    expect(store.getActions()[1].type).toEqual(loading_shots_analytics_success.type);
                    expect(store.getActions()[1].payload).toEqual(resp)
                })
            });

            it('Should handle fetch failure of duel analytics',()=>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/shots/analytics/' + playerId).reply(400);

                return store.dispatch(fetch_shots_analytics(playerId)).then(() => {
                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(loading_shots_analytics.type);
                    expect(store.getActions()[1].type).toEqual(loading_shots_analytics_failure.type)
                })
            })

        })

    } );
    describe('Testing player matches',()=>{
        it('Should handle fetch success of matches',()=>{
            const store = mockStore();
            mock.onGet('http://35.246.111.237/api/forwards/matches/' + playerId).reply(200, {
                36 : {name: 'douglas landvik'}
            });
            const resp = {36 : {name: 'douglas landvik'}};
            return store.dispatch(fetch_matches(playerId)).then(() => {
                ////console.log()(store.getActions())
                expect(store.getActions()[0].type).toEqual(loading_matches.type);
                expect(store.getActions()[1].type).toEqual(loading_matches_success.type);
                expect(store.getActions()[1].payload).toEqual(resp)
            })
        });

        it('Should handle fetch success of matches',()=>{
            const store = mockStore();
            mock.onGet('http://35.246.111.237/api/forwards/matches/' + playerId).reply(400);
            const resp = {36 : {name: 'douglas landvik'}};
            return store.dispatch(fetch_matches(playerId)).then(() => {
                ////console.log()(store.getActions())
                expect(store.getActions()[0].type).toEqual(loading_matches.type);
                expect(store.getActions()[1].type).toEqual(loading_matches_failure.type)
            })
        })
    });

    describe('Testing player rankings',()=>{
        it('Should handle fetch success of rankings',()=>{
            const store = mockStore();
            mock.onGet('http://35.246.111.237/api/forwards/rankings/' + playerId).reply(200, {
                36 : {name: 'douglas landvik'}
            });
            const resp = {36 : {name: 'douglas landvik'}};
            return store.dispatch(fetch_rankings(playerId)).then(() => {
                ////console.log()(store.getActions())
                expect(store.getActions()[0].type).toEqual(loading_rankings.type);
                expect(store.getActions()[1].type).toEqual(loading_rankings_success.type);
                expect(store.getActions()[1].payload).toEqual(resp)
            })
        });

        it('Should handle fetch success of rankings',()=>{
            const store = mockStore();
            mock.onGet('http://35.246.111.237/api/forwards/rankings/' + playerId).reply(400);
            const resp = {36 : {name: 'douglas landvik'}};
            return store.dispatch(fetch_rankings(playerId)).then(() => {
                ////console.log()(store.getActions())
                expect(store.getActions()[0].type).toEqual(loading_rankings.type);
                expect(store.getActions()[1].type).toEqual(loading_rankings_failure.type)
            })
        })
    });




    describe('Testing stats',()=>{
        describe('Testing duels stats',()=>{
            it('Should handle duels stats succesfully', () =>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/duels/analytics/stats').reply(200, {
                    36 : {name: 'douglas landvik'}
                });
                const resp = {36 : {name: 'douglas landvik'}};
                return store.dispatch(actions.fetch_duels_stats()).then(() => {
                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(actions.loading_duels_stats.type);
                    expect(store.getActions()[1].type).toEqual(actions.loading_duels_stats_success.type);
                    expect(store.getActions()[1].payload).toEqual(resp)
                }).catch(e=>{
                    expect(e).toBeFalsy()
                })
            });


            it('Should handle duels stats unsucessfully', () =>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/duels/analytics/stats' + playerId).reply(400);
                const resp = {36 : {name: 'douglas landvik'}};
                return store.dispatch(actions.fetch_duels_stats()).then(() => {
                }).catch(err=>{

                    expect(store.getActions()[0].type).toEqual(actions.loading_duels_stats.type);
                    expect(store.getActions()[1].type).toEqual(actions.loading_duels_stats_failure.type)

                })
            })
        });
        describe('Testing passs stats',()=>{
            it('Should handle passs stats succesfully', () =>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/passes/analytics/stats').reply(200, {
                    36 : {name: 'douglas landvik'}
                });
                const resp = {36 : {name: 'douglas landvik'}};
                return store.dispatch(actions.fetch_passes_stats()).then(() => {
                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(actions.loading_passes_stats.type);
                    expect(store.getActions()[1].type).toEqual(actions.loading_passes_stats_success.type);
                    expect(store.getActions()[1].payload).toEqual(resp)
                }).catch(e=>{
                    expect(e).toBeFalsy()
                })
            });


            it('Should handle passes stats unsucessfully', () =>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/passes/analytics/stats' + playerId).reply(400);
                const resp = {36 : {name: 'douglas landvik'}};
                return store.dispatch(actions.fetch_passes_stats()).then(() => {
                }).catch(err=>{

                    expect(store.getActions()[0].type).toEqual(actions.loading_passes_stats.type);
                    expect(store.getActions()[1].type).toEqual(actions.loading_passes_stats_failure.type)

                })
            })
        });

        describe('Testing shots stats',()=>{
            it('Should handle shots stats succesfully', () =>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/shots/analytics/stats').reply(200, {
                    36 : {name: 'douglas landvik'}
                });
                const resp = {36 : {name: 'douglas landvik'}};
                return store.dispatch(actions.fetch_shots_stats()).then(() => {
                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(actions.loading_shots_stats.type);
                    expect(store.getActions()[1].type).toEqual(actions.loading_shots_stats_success.type);
                    expect(store.getActions()[1].payload).toEqual(resp)
                }).catch(e=>{
                    expect(e).toBeFalsy()
                })
            });


            it('Should handle shots stats unsucessfully', () =>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/shots/analytics/stats' + playerId).reply(400);
                const resp = {36 : {name: 'douglas landvik'}};
                return store.dispatch(actions.fetch_shots_stats()).then(() => {
                }).catch(err=>{

                    expect(store.getActions()[0].type).toEqual(actions.loading_shots_stats.type);
                    expect(store.getActions()[1].type).toEqual(actions.loading_shots_stats_failure.type)

                })
            })
        });


        describe('Testing matches stats',()=>{
            it('Should handle matches stats succesfully', () =>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/matches/analytics/stats').reply(200, {
                    36 : {name: 'douglas landvik'}
                });
                const resp = {36 : {name: 'douglas landvik'}};
                return store.dispatch(actions.fetch_matches_stats()).then(() => {
                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(actions.loading_matches_stats.type);
                    expect(store.getActions()[1].type).toEqual(actions.loading_matches_stats_success.type);
                    expect(store.getActions()[1].payload).toEqual(resp)
                }).catch(e=>{
                    expect(e).toBeFalsy()
                })
            });


            it('Should handle matches stats unsucessfully', () =>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/matches/analytics/stats' + playerId).reply(400);
                const resp = {36 : {name: 'douglas landvik'}};
                return store.dispatch(actions.fetch_matches_stats()).then(() => {
                }).catch(err=>{

                    expect(store.getActions()[0].type).toEqual(actions.loading_matches_stats.type);
                    expect(store.getActions()[1].type).toEqual(actions.loading_matches_stats_failure.type)

                })
            })
        });

        describe('Testing rankings stats',()=>{
            it('Should handle rankings stats succesfully', () =>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/rankings/analytics/stats').reply(200, {
                    36 : {name: 'douglas landvik'}
                });
                const resp = {36 : {name: 'douglas landvik'}};
                return store.dispatch(actions.fetch_rankings_stats()).then(() => {
                    ////console.log()(store.getActions())
                    expect(store.getActions()[0].type).toEqual(actions.loading_rankings_stats.type);
                    expect(store.getActions()[1].type).toEqual(actions.loading_rankings_stats_success.type);
                    expect(store.getActions()[1].payload).toEqual(resp)
                }).catch(e=>{
                    expect(e).toBeFalsy()
                })
            });


            it('Should handle rankings stats unsucessfully', () =>{
                const store = mockStore();
                mock.onGet('http://35.246.111.237/api/forwards/rankings/analytics/stats' + playerId).reply(400);
                const resp = {36 : {name: 'douglas landvik'}};
                return store.dispatch(actions.fetch_rankings_stats()).then(() => {
                }).catch(err=>{

                    expect(store.getActions()[0].type).toEqual(actions.loading_rankings_stats.type);
                    expect(store.getActions()[1].type).toEqual(actions.loading_rankings_stats_failure.type)

                })
            })
        })
    })
    
    
    

});



