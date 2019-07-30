``` react
state: {
    filters: [
        {label: 'Genre', key: 'genre', value: []},
        {label: 'Rating', key: 'rating', value: []}
    ]
}
---
<TableView
    rows={data}
    columns={[
        {label: 'Title', dataKey: 'title' },
        {label: 'Genre', dataKey: 'genre' },
        {label: 'Rating from 10', dataKey: 'rating'}
    ]}
    filters={state.filters}
    onFilterChange={(key, value) => setState({
        filters: state.filters.map(f => f.key === key
            ? {...f, value}
            : f)
    })}
    onClearFilters={() => setState({
        filters: state.filters.map(f => ({...f, value: []}))
    })}/>
```
