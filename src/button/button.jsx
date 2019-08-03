import { Button, withStyles } from '@material-ui/core'

export default withStyles(theme => ({
  root: {
    color: '#FFFFFF',
    backgroundColor: '#4B1BAE',
    '&:hover': {
      backgroundColor: '#3B0093'
    }
  }
}))(Button)
