import React from 'react';
import PageTitle from './PageTitle'
import renderer, {create} from 'react-test-renderer'



describe("PageTitle component", () => {

    test('it shows the expected page title', ()=>{
        const theTitle = "whatever";
        const component = renderer.create(<PageTitle title={theTitle}/>);
        const instance = component.root;
        const h3 = instance.findByType("h3")
        expect(h3.props.children).toBe(theTitle)

    })

    test("it shows the expected subtitle", ()=>{

        const subTitle = "subTitle";
        const component = renderer.create(<PageTitle subtitle={subTitle}/>)
        const instance = component.root;
        const span = instance.findByType("span");
        expect(span.props.children).toBe(subTitle)
    })

})