import React from 'react';
import { Container } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import MainView from './components/MainView/main-view';
import './index.scss';

class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container className='index-jsx' >
        <MainView />
      </Container>
    );
  }
}
const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);