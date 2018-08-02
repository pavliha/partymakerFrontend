import React from 'react'
import { object, func } from 'prop-types'
import { withStyles } from '@material-ui/core/styles/index'
import { Link } from 'react-router-dom'
import { Typography, FormControlLabel, Switch, Button, TextField, Grid } from '@material-ui/core'
import connector from '../connector'
import PictureUpload from './PictureUpload'

const styles = theme => ({
  root: {
    padding: '0 15px',
    maxWidth: 400,
    marginTop: theme.spacing.size4,
    '@media only screen and (max-width: 320px)': {
      marginTop: theme.spacing.size1,
    },
  },
  mb: {
    marginBottom: theme.spacing.size3,
  },
  typography: {
    marginBottom: theme.spacing.size1,
  },
  checked: {
    height: 30,
  },
})

class SummaryForm extends React.Component {
  componentDidMount() {
    const { actions } = this.props

    this.checkRequiredFields()

    actions.party.update({ step: 3 })
  }

  componentDidUpdate() {
    const { party, history, actions } = this.props
    if (party.success) {
      actions.party.reset()
      history.push('/parties')
    }
    if (party.error) {
      actions.party.reset()
    }
  }

  checkRequiredFields = () => {
    const { party, history } = this.props
    const required = [
      'type', 'title', 'district', 'address',
      'startDay', 'startTime', 'peopleMin',
      'peopleMax', 'description',
    ]

    required.forEach(field => {
      if (party.form[field] === undefined) {
        history.push('/party/create/step/2')
      }
    })
  }

  handleSwitch = () => {
    const { actions, party } = this.props
    actions.party.update({ private: !party.form.private, step: 3 })
  }

  handleUpload = (name, value) => {
    const { actions } = this.props
    actions.party.update({ pictures: value })
  }

  handleSubmit = () => {
    const { actions, party } = this.props
    actions.party.create(party.form)
  }

  render() {
    const { classes, party } = this.props
    return (
      <form className={classes.root}>
        <Typography gutterBottom color="error">
          {party.error && `${party.error.status} ошибка создания вечеринки ${party.error.data.error.message}`}
        </Typography>
        <FormControlLabel
          className={classes.checked}
          label="Приватная вечеринка"
          control={<Switch
            name="checked"
            checked={party.form.private}
            onChange={this.handleSwitch}
            color="primary"
          />}
        />
        <Typography variant="caption" className={classes.mb}>
          Эту вечеринку будут видеть только приглашенные вами пользователи
        </Typography>
        <div className={classes.mb}>
          <Typography variant="body1" className={classes.typography}>
            Если у вас есть фотографии с места вечеринки,
            пожалуйста загрузите их, чтобы друзья понимали куда идут
          </Typography>
        </div>
        <PictureUpload
          name="pictures"
          value={party.form.pictures || []}
          onChange={this.handleUpload}
        />
        <Typography variant="subheading" className={classes.typography}>
          Ссылка для приглашения
        </Typography>
        <TextField
          className={classes.mb}
          fullWidth
          name="invite_url"
          value={party.form.invite_url}
          disabled
        />
        <Grid container justify="space-between" className={classes.buttonGroup}>
          <Link to="/party/create/step/2">
            <Button>
              Назад
            </Button>
          </Link>
          <Button
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
            disabled={party.loading && !party.error}
          >
            {party.loading && !party.error ? 'Создание...' : 'Готово'}
          </Button>
        </Grid>
      </form>
    )
  }
}

SummaryForm.propTypes = {
  history: object.isRequired,
  classes: object.isRequired,
  actions: object.isRequired,
  party: object.isRequired,
}

export default withStyles(styles)(connector(SummaryForm))