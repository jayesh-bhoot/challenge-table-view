``` react
<TableView
    rows={data}
    columns={[
        {label: 'Title', dataKey: 'title' },
        {label: 'Genre', dataKey: 'genre' },
        {label: 'Rating from 10', dataKey: 'rating'}
    ]}
    filters={[
        {label: 'Genre', dataKey: 'genre'},
        {label: 'Rating', dataKey: 'rating', defaultValue: [1, 7]}
    ]}/>
```
