import React, { Component } from 'react'
import vendorPropTypes from './vendor-prop-types'

class HTML5 extends Component {
  static propTypes = vendorPropTypes

  play() {
    this._player.play()
  }

  pause() {
    this._player.pause()
  }

  stop() {
    this._player.pause()
    this._player.currentTime = 0
  }

  seekTo(currentTime) {
    this._player.currentTime = currentTime
  }

  mute(muted) {
    this._player.muted = muted
  }

  setVolume(volume) {
    this._player.volume = volume
  }

  _handleCanPlay = () => {
    this.props.onReady()
  }

  _handlePlay = () => {
    this.props.onPlaying(true)
  }

  _handlePause = () => {
    this.props.onPlaying(false)
  }

  _handleEnded = () => {
    this.props.onPlaying(false)
  }

  _handleProgress = ({ target: { buffered, duration } }) => {
    let progress = 0

    if (buffered.length > 0) {
      progress = buffered.end(0)/duration
    }

    this.props.onProgress(progress)
  }

  _handleDuration = ({ target: { duration }}) => {
    this.props.onDuration(duration)
  }

  _handleTimeUpdate = ({ target: { currentTime } }) => {
    this.props.onTimeUpdate(currentTime)
  }

  _handleVolumeChange = ({ target: { volume, muted } }) => {
    this.props.onMute(muted)
    this.props.onVolumeChange(volume)
  }

  render() {
    return (
      <this.props.vendor
        ref={c => this._player = c}
        src={this.props.src}
        onCanPlay={this._handleCanPlay}
        onPlay={this._handlePlay}
        onPause={this._handlePause}
        onEnded={this._handleEnded}
        onProgress={this._handleProgress}
        onLoadedMetadata={this._handleDuration}
        onTimeUpdate={this._handleTimeUpdate}
        onVolumeChange={this._handleVolumeChange}
      />
    )
  }
}

export default HTML5
