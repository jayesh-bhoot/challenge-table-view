``` react
state: {
    filters: [
        {label: 'Genre', dataKey: 'genre', value: []},
        {label: 'Rating', dataKey: 'rating', value: []}
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
    onFilterChange={(dataKey, value) => setState({
        filters: state.filters.map(f => f.dataKey === dataKey ? {...f, value} : f)
    })}
    onClearFilters={() => setState({
        filters: state.filters.map(f => ({...f, value: []}))
    })}/>
```
