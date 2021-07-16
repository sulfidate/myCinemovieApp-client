import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import './director-view.scss';


export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <>
        <div className="director-view justify-content-md-center">
          <Image className="director-poster" src={director.ImagePath} rounded fluid />
          <div className="director-name">
            <div className="value">{director.Name}</div>
          </div>
          <div className="director-bio">
            <div className="value">{director.Bio}</div>
          </div>
          <div className="director-birth">
            <div className="value">{director.Birth}</div>
          </div>
          <div className="director-death">
            <div className="value">{director.Death}</div>
          </div>

          <Button className="label" variant="info" size="lg" block style={{ margin: '15px 0 15px 0' }} onClick={() => { onBackClick(null); }}>Back</Button>{' '}
        </div>
      </>
    );
  }
}

MovieView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};