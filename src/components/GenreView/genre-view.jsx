import React from "react";
import { Col, Card, Button, Row, Container } from "react-bootstrap";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './genre-view.scss';

export default class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;
    return (
      <Row>
        <Col
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          key={this.props.genre[0]}

        >
          <Card
            className="movie-view justify-content-center"
            bg="light"
          >
            <Container>
              <Row className="justify-content-center" >
                <Card.Title className="card-title h5" >
                  <span>
                    {genre[1]}
                  </span>
                </Card.Title>
              </Row>
              <Row className="justify-content-center" >


              </Row>
            </Container>
            <Container>
              <Col
                className="image-container d-flex justify-content-center mt-5 mb-5"
              >
                <Card.Img
                  variant="top"
                  src={genre[3]}
                  className="img"
                />

                <div className="overlay d-flex align-items-center justify-content-center" >
                  {/* <>
                    <Button
                      key='birth'
                      variant='info'
                      size="sm"
                      disabled
                    >
                      birth:<br />{director[3]}

                    </Button>
                  </>
                  <>
                    <Button
                      key='death'
                      className='mr-2'
                      variant='info'
                      size="sm"
                      disabled
                    >
                      death:<br />{director[4]}
                    </Button>


                  </> */}
                </div>

              </Col>
            </Container>
            <Card.Body>
              <Card.Text
                style={{ color: '#17A2B8' }}
              >
                {genre[2]}
              </Card.Text>
            </Card.Body>
            <Button className="movie-button" bg="dark" variant="info" onClick={() => { onBackClick(null); }} value={this.setState.movieId}>Back</Button>

          </Card>
        </Col>
      </Row >
    );
  }

}
// PropTypes
GenreView.propTypes = {
  genre: PropTypes.arrayOf(PropTypes.string).isRequired
};