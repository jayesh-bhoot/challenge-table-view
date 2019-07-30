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
        onFilterChange: PropTypes.func
        // classes: PropTypes.object.isRequired
    },
    getDefaultProps() {
        return {
            rows: [],
            columns: [],
            filters: []
        }
    },
    render() {
        const { rows, columns, filters, onFilterChange, onClearFilters } = this.props
        const emptyFilters = filters.every(f => !f.value.length)

        return (
            <div>
                {filters.map(f => <Select
                    multiple
                    label={f.label}
                    value={f.value}
                    items={[... new Set(rows.map(r => r[f.dataKey]))].sort()}
                    onChange={e => onFilterChange(f.dataKey, e.target.value)}
                />)}
                {!emptyFilters
                    && <Button fullWidth variant="contained" onClick={onClearFilters}>
                        Clear Filters
                    </Button>}
                <Table
                    rows={rows.filter(r => filters.every(f => !f.value.length || f.value.includes(r[f.dataKey])))}
                    columns={columns} />
            </div>
        )
    }
})
