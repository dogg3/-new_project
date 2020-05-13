import EventInfo from "./EventInfo";
import { shallow } from 'enzyme';
import React from 'react';


let eventInfo;
let eventType;



beforeEach(async ()=>{
    eventInfo = {"Ground defending duel won":37,"Air duel won":28,"Ground loose ball duel won":9,"Ground attacking duel won":2,"Air duel total":55,"Ground loose ball duel total":27,"Ground attacking duel total":25,"Total duels":182};
    eventType = 'Defending duel'
});


describe('EventInfo component unit testing', () =>{


    it('Should render event type as title',()=>{
        const wrapper =  shallow(<EventInfo title={eventType} eventInfo={eventInfo}/>);
        const title = wrapper.find({title:eventType});

        expect(wrapper.find({title:eventType}).exists()).toBeTruthy()
    });

    it('Should render event info labels',()=>{
        const wrapper =  shallow(<EventInfo title={eventType} eventInfo={eventInfo}/>);
        for (let [key, value] of Object.entries(eventInfo)) {
            expect(wrapper.find({label:key}).exists()).toBeTruthy()

        }
    });

    it('Should render event info values',()=>{
        const wrapper =  shallow(<EventInfo title={eventType} eventInfo={eventInfo}/>);
        for (let [key, value] of Object.entries(eventInfo)) {
            expect(wrapper.find({label:key}).render().text()).toEqual(value.toString())
        }
    });



    describe('Should render correctly when undefined is passed as eventinfo', ()=>{

        it('Should render error message',()=>{

            const wrapper =  shallow(<EventInfo eventInfo={undefined}/>);
            expect(wrapper.find('#errorMessageEventInfo').exists()).toBeTruthy()
        });

        it('Should not render playerinfo descriptions',()=>{

            const wrapper =  shallow(<EventInfo eventInfo={undefined}/>);

            expect(wrapper.find('.eventType').exists()).toBeFalsy()

        })

    })



});


