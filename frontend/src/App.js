import React from 'react';
import TitleBar from './TitleBar';

import 'typeface-roboto';
import ControlledVisualizer from './ControlledVisualizer';
import { CssBaseline } from '@material-ui/core';

const App = () => {
  return(
    <div>
      <React.Fragment>
        <CssBaseline />
        <TitleBar />
        <ControlledVisualizer />
      </React.Fragment>
    </div>
  );
}

export default App;
