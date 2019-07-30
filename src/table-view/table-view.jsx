import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'

export default createReactClass({
    displayName: 'TableView',
    propTypes: {
        rows: PropTypes.array,
        columns: PropTypes.array,
        // classes: PropTypes.object.isRequired
    },
    getDefaultProps() {
        return {
            rows: [],
            columns: []
        }
    },
    render() {
        return(
            <div>Hello</div>
        )
    }
})
