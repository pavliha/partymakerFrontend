/* eslint-disable function-paren-newline,react/prefer-stateless-function,no-return-assign */
import React from 'react'
import PropTypes from 'prop-types'
import { LinearProgress, FormControl, FormHelperText } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import uniq from 'lodash/uniq'
import flatten from 'lodash/flattenDeep'
import PictureList from './PictureList'
import Http from 'services/Http'
import AddPicture from './AddPicture'

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.size4,
  },
  fileInput: {
    opacity: 0,
    position: 'absolute',
  },
  pictureList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
})

class PictureUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pictures: [],
      percent: 0,
      saved: uniq(flatten(props.value)),
    }

    this.handleClickInput = this.handleClickInput.bind(this)
  }

  add = (image) => {
    if (image.type.match(/image.*/)) {
      const reader = new FileReader()
      reader.onload = () => {
        const { pictures } = this.state
        pictures.push(reader.result)
        this.setState({ pictures: uniq(pictures) })
      }
      reader.readAsDataURL(image)
    }
  }

  upload = async (image) => {
    clearTimeout(this.timeout)
    this.setState({ percent: 0 })

    // noinspection JSUnusedGlobalSymbols
    const config = {
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        this.setState({ percent })
      },
    }

    const formData = new FormData()
    formData.append('image', image, config)
    const response = await Http.post(this.props.url, formData)
    const { saved } = this.state
    saved.push(response.url)
    this.setState({ percent: 100, saved })

    this.timeout = setTimeout(() => this.setState({ percent: 0 }), 300)
  }

  handleChange = async (e) => {
    const image = e.target.files[0]
    await this.upload(image)
    this.add(image)
    this.props.onChange(this.props.name, flatten(this.state.saved))
  }

  handleBlur = () => {
    this.props.onBlur(this.props.name, true)
  }

  handleClickInput() {
    this.fileInput.click()
  }

  render() {
    const { classes, name, helperText } = this.props
    return (
      <FormControl className={classes.root}>
        <div className={classes.pictureList}>
          <PictureList pictures={this.state.pictures} />
          <AddPicture onClick={this.handleClickInput} />
        </div>
        <input
          className={classes.fileInput}
          ref={input => this.fileInput = input}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          name={name}
          type="file"
        />
        {this.state.percent ?
          <LinearProgress color="secondary" variant="determinate" value={this.state.percent} /> : null}
        {helperText ? <FormHelperText id="name-error-text">{helperText}</FormHelperText> : null}
      </FormControl>
    )
  }
}

PictureUpload.propTypes = {
  url: PropTypes.string,
  classes: PropTypes.object.isRequired,
  value: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  helperText: PropTypes.string,
}
PictureUpload.defaultProps = {
  url: '/upload',
  helperText: '',
  onBlur: () => {},
}

export default withStyles(styles)(PictureUpload)
