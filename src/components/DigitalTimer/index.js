import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timeLimit: 25,
    minutes: 25,
    seconds: 60,
    isTimerRunning: false,
    initial: true,
  }

  onStartPause = () => {
    const {isTimerRunning, minutes} = this.state
    this.count = 0
    this.timeElapsedSec = 0

    if (minutes === 1) {
      this.setState(() => ({
        minutes: 0,
      }))
    }

    if (isTimerRunning === true) {
      this.setState(prevState => ({
        isTimerRunning: !prevState.isTimerRunning,
      }))
    }

    if (isTimerRunning === false && minutes > 0) {
      this.setState(prevState => ({
        isTimerRunning: !prevState.isTimerRunning,
      }))

      this.timerId = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.timerId)
    }

    if (minutes === 0) {
      clearInterval(this.timerId)
      this.setState(prevState => ({
        isTimerRunning: !prevState.isTimerRunning,
      }))
    }
  }

  onReset = () => {
    this.setState({
      isTimerRunning: false,
      minutes: 25,
      timeLimit: 25,
      seconds: 59,
      initial: true,
    })
    clearInterval(this.timerId)
    this.timeElapsedSec = 0
  }

  onClickMinus = () => {
    const {isTimerRunning, timeLimit} = this.state
    if (isTimerRunning === false && timeLimit > 0) {
      this.setState(prevState => ({
        timeLimit: prevState.timeLimit - 1,
        minutes: prevState.minutes - 1,
      }))
    }
  }

  onClickPlus = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning === false) {
      this.setState(prevState => ({
        timeLimit: prevState.timeLimit + 1,
        minutes: prevState.minutes + 1,
      }))
    }
  }

  tick = () => {
    const {minutes, timeLimit, initial} = this.state

    this.count += 1
    this.timeElapsedSec += 1

    this.isTimerCompleted = this.timeElapsedSec === timeLimit * 60

    if (initial === true) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        initial: false,
      }))
    }

    if (this.isTimerCompleted) {
      this.setState({isTimerRunning: false})
      clearInterval(this.timerId)
    }
    this.setState(prevState => ({
      seconds: prevState.seconds - 1,
    }))

    if (this.count === 60 && minutes > 0) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
      }))
      this.count = 0
    }
  }

  render() {
    const {timeLimit, minutes, seconds, isTimerRunning, initial} = this.state
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    this.timerStatus = isTimerRunning ? 'Running' : 'Paused'
    this.controllerText = isTimerRunning ? 'Pause' : 'Start'
    this.startOrPauseIcon = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    this.altText = isTimerRunning ? 'pause icon' : 'play icon'
    this.secText = initial ? '00' : stringifiedSeconds

    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>
        <div className="sub-container">
          <div className="img-container">
            <div className="background-img">
              <div className="time-cont">
                <h1 className="time">
                  {stringifiedMinutes}:{this.secText}
                </h1>
                <p className="text">{this.timerStatus}</p>
              </div>
            </div>
          </div>

          <div className="timer-controls">
            <div className="controls1">
              <button
                className="controller-btn"
                type="button"
                onClick={this.onStartPause}
              >
                <img
                  className="icon"
                  src={this.startOrPauseIcon}
                  alt={this.altText}
                />
                <p className="text">{this.controllerText}</p>
              </button>

              <button
                className="controller-btn"
                type="button"
                onClick={this.onReset}
              >
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p className="text">Reset</p>
              </button>
            </div>

            <div className="range-control">
              <p className="mini-text">Set Timer limit</p>
              <div className="range-position">
                <button
                  className="plus-minus-btn"
                  type="button"
                  onClick={this.onClickMinus}
                >
                  -
                </button>
                <p className="time-control-display">{timeLimit}</p>
                <button
                  className="plus-minus-btn"
                  type="button"
                  onClick={this.onClickPlus}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
