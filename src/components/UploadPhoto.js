import React, { Component } from 'react'
import { connect } from 'react-redux'
import imageCompression from 'utils/imageCompression';
import ui from 'utils/ui'
import Input from 'components/Input'
import InputFile from 'components/InputFile'
import Textarea from 'components/Textarea'
import Button from 'components/Button'

import * as photoActions from 'redux/actions/photos'

import './UploadPhoto.scss'

const MAX_IMAGE_SIZE = 30000 // 30KB
const MAX_IMAGE_SIZE_MB = 0.03 // 30KB

class UploadPhoto extends Component {
  state = {
    file: '',
    fileName: '',
    location: '',
    caption: '',
    warningMessage: '',
    isCompressing: false,
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleFileChange = (e) => {
    const file = e.target.files[0]
    /**
     * If image size is bigger than MAX_IMAGE_SIZE(30KB),
     * Compress the image to load it on transaction
     * cf. Maximum transaction input data size: 32KB
     */
    if (file.size > MAX_IMAGE_SIZE) {
      this.setState({
        isCompressing: true,
      })
      return this.compressImage(file)
    }

    return this.setState({
      file,
      fileName: file.name,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { file, fileName, location, caption } = this.state
    this.props.uploadPhoto(file, fileName, location, caption)
    ui.hideModal()
  }

  compressImage = async (imageFile) => {
    try {
      const compressedFile = await imageCompression(imageFile, MAX_IMAGE_SIZE_MB)
      this.setState({
        isCompressing: false,
        file: compressedFile,
        fileName: compressedFile.name,
      })
    } catch (error) {
      this.setState({
        isCompressing: false,
        warningMessage: '* Fail to compress image'
      })
    }
  }

  render() {
    const { fileName, location, caption, isCompressing, warningMessage } = this.state
    return (
      <form className="UploadPhoto" onSubmit={this.handleSubmit}>
        <InputFile
          className="UploadPhoto__file"
          name="file"
          label="Search file"
          fileName={isCompressing ? 'Compressing image...' : fileName}
          onChange={this.handleFileChange}
          err={warningMessage}
          accept=".png, .jpg, .jpeg"
          required
        />
        <Input
          className="UploadPhoto__location"
          name="location"
          label="Location"
          value={location}
          onChange={this.handleInputChange}
          placeholder="Where did you take this photo?"
          required
        />
        <Textarea
          className="UploadPhoto__caption"
          name="caption"
          value={caption}
          label="Caption"
          onChange={this.handleInputChange}
          placeholder="Upload your memories"
          required
        />
        <Button
          className="UploadPhoto__upload"
          type="submit"
          title="Upload"
        />
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  uploadPhoto: (file, fileName, location, caption) =>
    dispatch(photoActions.uploadPhoto(file, fileName, location, caption)),
})

export default connect(null, mapDispatchToProps)(UploadPhoto)
