import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

import { default as Table } from '../table'
import { default as Select } from '../select'

export default createReactClass({
  displayName: 'TableView',
  propTypes: {
    rows: PropTypes.array,
    columns: PropTypes.array,
    filters: PropTypes.array,
    onFilterChange: PropTypes.func,
    onClearFilters: PropTypes.func
  },
  getDefaultProps () {
    return {
      rows: [],
      columns: [],
      filters: []
    }
  },
  render () {
    const { rows, columns, onFilterChange, onClearFilters } = this.props
    const filters = this.props.filters.map(f => ({
      ...f,
      value: f.value || []
    }))
    const areFiltersEmpty = filters.every(f => !f.value.length)

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          {filters.map(f => (
            <Select
              key={f.dataKey}
              multiple
              label={f.label}
              value={f.value}
              items={[...new Set(rows.map(r => r[f.dataKey]))].sort()}
              onChange={e => onFilterChange(f.dataKey, e.target.value)}
            />
          ))}

          {!areFiltersEmpty &&
          <Button variant='contained' onClick={onClearFilters}>
                            Clear Filters
          </Button>
          }
        </div>
        <div>
          <Table
            rows={areFiltersEmpty
              ? rows
              : rows.filter(r => filters.every(f =>
                !f.value.length ||
                                f.value.includes(r[f.dataKey])))}
            columns={columns} />
        </div>
      </div>
    )
  }
})
