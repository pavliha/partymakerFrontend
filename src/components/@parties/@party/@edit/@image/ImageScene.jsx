import React from 'react'
import { object } from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Avatar, Button } from '@material-ui/core'
import PictureUpload from './PictureUpload'
import connector from '../connector'

const styles = theme => ({
  root: {
    paddingTop: 25,
    paddingRight: 15,
    paddingLeft: 15,
  },
  button: {
    marginTop: theme.spacing.size3,
  },
  avatar: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: '5%',
    margin: 2,
  },
})

class ImageScene extends React.Component {
  componentDidMount() {
    const { actions } = this.props
    actions.header.back()
    actions.header.title('Фото')
  }

  componentWillUnmount() {
    const { actions } = this.props
    actions.header.menu()
    actions.header.resetTitle()
  }

  handleClick = () => {
    const { actions, match } = this.props
    actions.parties.show(match.params.id)
  }

  handleUpload = (name, value) => {
    const { actions, match } = this.props
    actions.party.change(match.params.id, { pictures: value })
  }

  render() {
    const { classes, party } = this.props
    return (
      <div className={classes.root}>
        <div>
          <Typography variant="subheading">Изменить фотографии вечеринки</Typography>
          <Typography variant="subheading">Ваши ранние фото</Typography>
          <div className={classes.avatar}>
            {!isEmpty(party) &&
            party.pictures.map((img, index) => <Avatar key={index} src={img.url} className={classes.photo} />)
            }
          </div>
          <Typography variant="subheading">Ваши новые фото</Typography>
          <PictureUpload
            name="pictures"
            onChange={this.handleUpload}
          />
        </div>
        <Button variant="raised" color="primary" type="submit" onClick={this.handleClick}>
          Сохранить
        </Button>
      </div>
    )
  }
}

ImageScene.propTypes = {
  classes: object.isRequired,
  party: object.isRequired,
  actions: object.isRequired,
  match: object.isRequired,
}

export default connector(withStyles(styles)(ImageScene))
