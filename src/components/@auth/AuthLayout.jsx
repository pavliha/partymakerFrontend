import React from 'react'
import { object } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Redirect, Route, Switch } from 'react-router-dom'
import RegisterScene from './@register/RegisterScene'
import LoginScene from './@login/LoginScene'
import AuthDevider from 'components/AndDevider'
import SocialLogin from './SocialLogin'
import connector from './connector'

const styles = () => ({
  root: {
    height: '100%',
    padding: '0 5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  scene: {
    flexGrow: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  devider: {
    flexGrow: 1,
  },
  social: {
    flexGrow: 2,
  },
})

class AuthLayout extends React.Component {
  componentDidMount() {
    const { actions } = this.props
    actions.layout.background('http://localhost:3333/images/summer.jpg')
  }

  componentWillUnmount() {
    const { actions } = this.props
    actions.layout.removeBackground()
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.scene}>
          <Switch>
            <Route exact path="/auth/register" component={RegisterScene} />
            <Route exact path="/auth/login" component={LoginScene} />
            <Redirect to="/auth/login" />
          </Switch>
        </div>
        <div className={classes.devider}>
          <AuthDevider />
        </div>
        <div className={classes.social}>
          <SocialLogin />
        </div>
      </div>
    )
  }
}

AuthLayout.propTypes = {
  classes: object.isRequired,
  actions: object.isRequired,
}

export default withStyles(styles)(connector(AuthLayout))
