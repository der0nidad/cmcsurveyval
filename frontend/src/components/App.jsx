import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import RouterComponent from './RouterComponent';
import store from '../store';


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
        <RouterComponent />
      </Provider>
    );
  }
}

export default App;

const container = document.getElementById('app');
render(<App />, container);
