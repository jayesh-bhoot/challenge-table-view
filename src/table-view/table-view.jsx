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
    filters: PropTypes.array
  },

  getDefaultProps() {
    return {
      rows: [],
      columns: [],
      filters: []
    }
  },

  getInitialState() {
    const filters = initializeFilterState(this.props.filters, this.props.rows)
    const filteredRows = filterRows(this.props.rows, filters)
    return { filters, filteredRows }
  },

  handleFilterChange(dataKey, selectedValues) {
    const filters = updateFilters(
      this.state.filters,
      f => f.dataKey === dataKey ? { ...f, selectedValues } : f)
    const filteredRows = filterRows(this.props.rows, filters)

    this.setState({ filters, filteredRows })
  },

  handleFiltersReset() {
    const filters = updateFilters(
      this.state.filters,
      f => ({ ...f, selectedValues: [] }))
    const filteredRows = this.props.rows

    this.setState({ filters, filteredRows })
  },

  render() {
    const { classes, columns } = this.props
    const { filters, filteredRows } = this.state

    return (
      <div className={classes.rootContainer}>
        <div className={classes.filterSetContainer}>
          {filters.map(f => (
            <div key={f.dataKey} className={classes.filterContainer}>
              <Select
                multiple
                label={f.label}
                value={f.selectedValues}
                items={f.allValues}
                onChange={e => this.handleFilterChange(f.dataKey, e.target.value)}
              />
            </div>
          ))}

          <div className={classes.filterResetContainer}>
            {
              !allFiltersEmpty(filters)
              && <Button fullWidth
                variant='contained'
                onClick={this.handleFiltersReset}>
                Clear Filters
              </Button>
            }
          </div>
        </div>

        <Table rows={filteredRows} columns={columns} />
      </div>
    )
  }
})

const initializeFilterState = (filters, rows) => {
  return filters.map(f => {
    return {
      dataKey: f.dataKey,
      selectedValues: f.defaultValue || [],
      allValues: extractFilterValues(f.dataKey, rows),
      label: f.label
    }
  })
}

const updateFilters = (filters, updateBy) => {
  return filters.map(f => updateBy(f))
}

const extractFilterValues = (filterKey, rows) => {
  const values = rows.map(r => r[filterKey])
  const dedup = [...new Set(values)]
  const sorted = dedup.some(x => typeof x !== 'number')
    ? dedup.sort()
    : dedup.sort((a, b) => a - b)
  return sorted
}

const allFiltersEmpty = filters => filters.every(f => !f.selectedValues.length)

const filterRows = (rows, filters) => {
  return rows.filter(row =>
    filters.every(f =>
      !f.selectedValues.length || f.selectedValues.includes(row[f.dataKey])))
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
