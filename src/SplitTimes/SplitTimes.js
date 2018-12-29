import React from 'react';
import MarjorClock from '../MajorClock';

const SplitTimes = ({value = []}) => {
  return value.map((v, i) => <MarjorClock key={i} milliseconds={v} />);
};

export default SplitTimes;
