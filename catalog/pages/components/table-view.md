``` react
state: {
    filters: {}
}
---
<TableView
    rows={data}
    columns={[
        {label: 'Title', dataKey: 'title' },
        {label: 'Genre', dataKey: 'genre' },
        {label: 'Rating from 10', dataKey: 'rating'}
    ]}
    filters={[
        {label: 'Genre', dataKey: 'genre', value: state.filters['genre'] || []},
        {label: 'Rating', dataKey: 'rating', value: state.filters['rating'] || []}
    ]}
    onFilterChange={(dataKey, value) => setState({
        filters: {
            ...state.filters,
            [dataKey]: value
        }
    })}
    onClearFilters={() => setState({filters: {}})}/>
```
