import { Button, withStyles } from '@material-ui/core'

const styles = () => ({
  root: {
    color: '#FFFFFF',
    height: '100%',
    backgroundColor: '#4B1BAE',
    '&:hover': {
      backgroundColor: '#3B0093'
    }
  }
})

export default withStyles(styles)(Button)
