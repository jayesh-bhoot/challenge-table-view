import React from 'react'
import { Button } from '@material-ui/core'
import { TableRow } from '@material-ui/core'

import TableView from './table-view'
import { default as Select } from '../select'

describe('Unfiltered TableView', () => {
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
      { label: 'Age', dataKey: 'age', value: undefined },
      { label: 'Gender', dataKey: 'gender', value: [] }
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


describe('Filtered TableView', () => {
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
      { label: 'Age', dataKey: 'age', value: [25] }
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

  test('should verify 1 value in filter select', () => {
    const wrapper = mount(<TableView {...props} />)
    expect(wrapper.find(Select).props().value).toEqual([25])
  })
})
