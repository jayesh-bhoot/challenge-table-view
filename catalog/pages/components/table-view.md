``` react
state: {
    filters: [
        {key: 'genre', value: []},
        {key: 'rating', value: []}
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
            ? {'key': key, 'value': value}
            : f)
    })}/>
```
