import PlayerInfo from "./PlayerInfo";
import { shallow, mount } from 'enzyme';
import React from 'react';


describe('Test player info components',()=>{

    it('Should render description table', ()=>{
        const playerInfo = {name:'douglas',foot:'right', height:31, teamcountry:10};
        const wrapper =  shallow(<PlayerInfo playerinfo={playerInfo}/>);

        expect(wrapper.find('#Player_info_description').exists()).toBeTruthy()

    });
    it('Should render player info labels',()=>{

        const playerInfo = {name:'douglas',foot:'right', height:31, teamcountry:10};
        const wrapper =  shallow(<PlayerInfo playerinfo={playerInfo}/>);

        ///LABELS
        const name = wrapper.find({label:'name'}).exists();
        const foot = wrapper.find({label:'foot'}).exists();
        const height = wrapper.find({label:'height'}).exists();
        const teamcountry = wrapper.find({label:'teamcountry'}).exists();

        expect(name).toBeTruthy();
        expect(foot).toBeTruthy();
        expect(height).toBeTruthy();
        expect(teamcountry).toBeTruthy()



    });

    it('Should render player info values',()=>{

        const playerInfo = {name:'douglas',foot:'right', height:31, teamcountry:10};
        const wrapper =  shallow(<PlayerInfo playerinfo={playerInfo}/>);
        ////TEXT
        const nameText = wrapper.find({label:'name'});
        const footText = wrapper.find({label:'foot'});
        const heightText = wrapper.find({label:'height'});

        expect(nameText.render().text()).toEqual('douglas');
        expect(footText.render().text()).toEqual('right');
        expect(heightText.render().text()).toEqual("31")
    });


    describe('Should render correctly when undefined is passed as playerinfo', ()=>{

        it('Should render error message',()=>{

            const wrapper =  shallow(<PlayerInfo playerinfo={undefined}/>);
            expect(wrapper.find('#errorMessagePlayerInfo').exists()).toBeTruthy()
        });

        it('Should not render playerinfo descriptions',()=>{

            const wrapper =  shallow(<PlayerInfo playerinfo={undefined}/>);

            expect(wrapper.find('#Player_info_description').exists()).toBeFalsy()

        })

    })



});
