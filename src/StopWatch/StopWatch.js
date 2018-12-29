import React, { Component, Fragment } from 'react';
import ControlButtons from '../ControlButtons';
import SplitTimes from '../SplitTimes';
import MajorClock from '../MajorClock';

class StopWatch extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      isStarted: false,
      pauseTemp: 0,
      startTime: null,
      currentTime: null,
      splits: [],
    }
  }

  // state = {
  //   isStarted: false,
  //   startTime: null,
  //   currentTime: null,
  //   splits: [],
  // }

  onStart = () => {
      this.setState({
      isStarted: true,
      startTime: new Date(),
      currentTime: new Date(),
    });
    this.intervalHandle = setInterval(() => {
      this.setState({
        currentTime: new Date(),
      });
    }, 1000 / 60);
  };

  onPause = () => {
    const { startTime, currentTime, pauseTemp } = this.state;
    clearInterval(this.intervalHandle);
    this.setState({
      isStarted: false,
      pauseTemp: currentTime - startTime + pauseTemp,
    });
  };

  onReset = () => {
    this.setState({
      startTime: null,
      currentTime: null,
      pauseTemp: 0,
      splits: [],
    });
  };

  onSplit = () => {
    const { pauseTemp, splits, currentTime, startTime } = this.state;
    this.setState({
      splits: [...splits, currentTime - startTime + pauseTemp ]
    });
  };

  render() {
    const { splits, isStarted, startTime, currentTime, pauseTemp } = this.state;
    const milliseconds = isStarted ? currentTime - startTime + pauseTemp : pauseTemp;
    return (
      <Fragment>
        <MajorClock milliseconds={milliseconds}/>
        <ControlButtons
          activated={isStarted}
          onStart={this.onStart}
          onPause={this.onPause}
          onReset={this.onReset}
          onSplit={this.onSplit}
        />
        <SplitTimes value={splits} />
      </Fragment>
    )
  }
}

export default StopWatch;
