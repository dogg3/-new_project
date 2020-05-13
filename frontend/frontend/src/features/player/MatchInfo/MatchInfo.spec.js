import MatchInfo from "./MatchInfo";
import { shallow, mount } from 'enzyme';
import React from 'react';


it('Should render player info labels',()=>{

    const matchInfo = {name:'douglas',foot:'right', height:31, teamcountry:10};
    const wrapper =  shallow(<MatchInfo matchInfo={matchInfo}/>);

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

    const matchInfo = {name:'douglas',foot:'right', height:31, teamcountry:10};
    const wrapper =  shallow(<MatchInfo matchInfo={matchInfo}/>);
    ////TEXT
    const nameText = wrapper.find({label:'name'});
    const footText = wrapper.find({label:'foot'});
    const heightText = wrapper.find({label:'height'});

    expect(nameText.render().text()).toEqual('douglas');
    expect(footText.render().text()).toEqual('right');
    expect(heightText.render().text()).toEqual("31")

});