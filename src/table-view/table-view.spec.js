import React from 'react'
import { Button } from '@material-ui/core'
import { TableRow } from '@material-ui/core'

import TableView from './table-view'
import { default as Select } from '../select'

describe('TableView with empty filters', () => {
  const props = {
    columns: [
      { label: 'Name', dataKey: 'name' },
      { label: 'Age', dataKey: 'age' },
      { label: 'Gender', dataKey: 'gender' }
    ],
    rows: [
      { name: 'Mike', age: 25, id: 1245, gender: 'Male' },
      { name: 'Jennifer', age: 30, id: 46874, gender: 'Female' },
      { name: 'Stella', age: 25, id: 46874, gender: 'Other' }
    ],
    filters: [
      { label: 'Age', dataKey: 'age' },
      { label: 'Gender', dataKey: 'gender', defaultValue: [] }
    ]
  }

  test('renders a TableView', () => {
    const wrapper = shallow(<TableView {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should count 2 filter selects', () => {
    const wrapper = mount(<TableView {...props} />)
    expect(wrapper.find(Select)).toHaveLength(2)
  })

  test('should verify sane defaults for filter selects', () => {
    const wrapper = mount(<TableView {...props} />)
    wrapper.find(Select).forEach(s => expect(s.props().value).toHaveLength(0))
  })

  test('should count 0 clear filter button', () => {
    const wrapper = mount(<TableView {...props} />)
    expect(wrapper.find(Button)).toHaveLength(0)
  })

  test('should count 3 data rows + 1 header row', () => {
    const wrapper = mount(<TableView {...props} />)
    expect(wrapper.find(TableRow)).toHaveLength(4)
  })
})


describe('TableView with populated filters', () => {
  const props = {
    columns: [
      { label: 'Name', dataKey: 'name' },
      { label: 'Age', dataKey: 'age' },
      { label: 'Gender', dataKey: 'gender' }
    ],
    rows: [
      { name: 'Mike', age: 25, id: 1245, gender: 'Male' },
      { name: 'Jennifer', age: 30, id: 46874, gender: 'Female' },
      { name: 'Stella', age: 24, id: 46874, gender: 'Other' },
      { name: 'Joey', age: 24, id: 46874, gender: 'Male' }
    ],
    filters: [
      { label: 'Age', dataKey: 'age', defaultValue: [24, 25] },
      { label: 'Gender', dataKey: 'gender', defaultValue: ['Male'] }
    ]
  }

  test('should count 1 clear filter button', () => {
    const wrapper = mount(<TableView {...props} />)
    expect(wrapper.find(Button)).toHaveLength(1)
  })

  test('should count 1 header plus 2 filtered data rows', () => {
    const wrapper = mount(<TableView {...props} />)
    expect(wrapper.find(TableRow)).toHaveLength(3)
  })
})
