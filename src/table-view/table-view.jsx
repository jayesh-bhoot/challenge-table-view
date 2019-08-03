import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'

import { default as Table } from '../table'
import { default as Select } from '../select'
import { default as Button } from '../button'


const TableView = createReactClass({
  displayName: 'TableView',

  propTypes: {
    rows: PropTypes.array,
    columns: PropTypes.array,
    filters: PropTypes.array,
    onFilterChange: PropTypes.func,
    onClearFilters: PropTypes.func
  },

  getDefaultProps() {
    return {
      rows: [],
      columns: [],
      filters: []
    }
  },

  render() {
    const {
      classes,
      rows, columns,
      onFilterChange, onClearFilters } = this.props
    const filters = sanitizeFilters(this.props.filters)

    return (
      <div className={classes.rootContainer}>
        <div className={classes.filterSetContainer}>
          {filters.map(f => (
            <div key={f.dataKey} className={classes.filterContainer}>
              <Select
                multiple
                label={f.label}
                value={f.value}
                items={extractFilterValues(rows, f)}
                onChange={e => onFilterChange(f.dataKey, e.target.value)}
              />
            </div>
          ))}

          <div className={classes.filterResetContainer}>
            {
              !allFiltersEmpty(filters)
              && <Button fullWidth
                variant='contained'
                onClick={onClearFilters}>
                Clear Filters
              </Button>
            }
          </div>
        </div>

        <Table rows={filterRows(rows, filters)} columns={columns} />
      </div>
    )
  }
})

const sanitizeFilters = filters => {
  return filters.map(f => ({ ...f, value: f.value || [] }))
}

const extractFilterValues = (rows, filter) => {
  const values = rows.map(r => r[filter.dataKey])
  const dedup = [...new Set(values)]
  const sorted = dedup.some(x => typeof x !== 'number')
    ? dedup.sort()
    : dedup.sort((a, b) => a - b)
  return sorted
}

const allFiltersEmpty = filters => filters.every(f => !f.value.length)

const filterRows = (rows, filters) => {
  return allFiltersEmpty(filters)
    ? rows
    : rows.filter(r => filters.every(f =>
      !f.value.length || f.value.includes(r[f.dataKey])))
}

const styles = () => ({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  filterSetContainer: {
    display: 'flex',
    width: '50%',
    alignItems: 'stretch'
  },
  filterContainer: {
    flex: '1',
    marginLeft: '10px'
  },
  filterResetContainer: {
    flex: 1,
    marginLeft: '10px',
  }
})
export default withStyles(styles)(TableView)
