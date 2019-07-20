import React from 'react'
import { shallow, mount } from 'enzyme'

import Email from '../src/index'

const customDomains = ['jest.com', 'enzyme.com']

describe('Email Component', () => {
  it('should render correctly without props', () => {
    const component = shallow(<Email />)
    expect(component).toMatchSnapshot()
  })
  it('should suggest test@gmail.com', () => {
    const component = mount(<Email />)

    // enter an email address
    component
      .find('input#rea-input')
      .simulate('change', { target: { value: 'test@gm' } })

    expect(component.instance().state.value).toEqual('test@gmail.com')
  })
  it('should suggest test@jest.com', () => {
    const component = mount(<Email domains={customDomains} />)

    // enter an email address
    component
      .find('input#rea-input')
      .simulate('change', { target: { value: 'test@je' } })

    expect(component.instance().state.value).toEqual('test@jest.com')
  })
})
