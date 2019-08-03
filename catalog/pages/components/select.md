

``` react
state: {
  value: ''
}
---
<Select
  label='Select'
  value={state.value}
  items={['United States', 'Canada', 'Mexico']}
  onChange={e => setState({ value: e.target.value })}
/>
```

for more details check https://material-ui.com/components/selects/
