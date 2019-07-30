import React from 'react'

import Button from './button'

test('should render a button', () => {
  const wrapper = shallow(<Button> Hello </Button>)
  expect(wrapper).toMatchSnapshot()
})
