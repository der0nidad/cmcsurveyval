import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { RouterComponent } from './RouterComponent';
import store from '../store';


const THEME = createMuiTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [],
      // loaded: false,
      // placeholder: 'Loading',
    };
  }

  componentDidMount() {
    // fetch('/api/lead/')
    //   .then((response) => {
    //     if (response.status > 400) {
    //       return this.setState(() => ({ placeholder: 'Something went wrong!' }));
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     this.setState(() => ({
    //       data,
    //       loaded: true,
    //     }));
    //   });
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={THEME}>
          <RouterComponent />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;

const container = document.getElementById('app');
render(<App />, container);
