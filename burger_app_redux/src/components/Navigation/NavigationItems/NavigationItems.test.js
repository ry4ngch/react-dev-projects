import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import NavigationItems from '.NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        //const wrapper = shallow(<NavigationItems/>)
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        //const wrapper = shallow(<NavigationItems isAuthenticated/>)
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    });
})