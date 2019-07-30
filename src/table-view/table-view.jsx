import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'

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
        const { rows, columns, filters, onFilterChange } = this.props
        return (
            <div>
                {filters.map(f => <Select
                    multiple
                    label={f.label}
                    value={f.value}
                    items={[... new Set(rows.map(r => r[f.key]))].sort()}
                    onChange={e => onFilterChange(f.key, e.target.value)}
                />)}
                <Table
                    rows={rows.filter(r => filters.every(f => !f.value.length || f.value.includes(r[f.key])))}
                    columns={columns} />
            </div>
        )
    }
})
