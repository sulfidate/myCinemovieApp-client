import React from 'react';
import { PropTypes } from 'prop-types';

import { Card, Button, Image, Link, Container } from 'react-bootstrap';



export class DirectorView extends React.Component {

  render() {
    const { directorData, onBackClick, movies } = this.props;
    const directorMovies = movies.filter(m => m.Director[1] === directorData[1]);

    return (

      <Card style={{ marginTop: '25px', padding: '5px' }} border="info" >
        <Image rounded
          variant="top"
          src={directorData[5]}
          style={{ width: '100%', maxWidth: '360px' }}
        />
        <Card.Body>
          <Card.Title style={{ fontSize: '2rem' }} >{directorData[1]} </Card.Title>
          <Card.Text style={{ fontSize: '1.3rem' }} >Birthday: {directorData[3]}  </Card.Text>
          <Card.Text style={{ fontSize: '1.3rem' }} >Deathday: {directorData[4]}  </Card.Text>
          <Card.Text style={{ fontSize: '1.1rem' }} >{directorData[2]}  </Card.Text>
        </Card.Body>
        <Card.Text style={{ fontSize: '1.3rem' }} >More movies from  {directorData[1]}: </Card.Text>
        <Container fluid>
          {directorMovies.map((m, i) => (
            <Card.Link
              href={`/movies/${m._id}`}
              key={i}>
              {/* {m.Title} */}
              <Image rounded thumbnail
                variant="bottom"
                src={m.ImagePath}
                style={{ width: '100%', maxWidth: '10rem', float: 'left', marginRight: '.9rem' }}
              />

            </Card.Link>
          )
          )}
        </Container>
        <Button variant="info" size="lg" style={{ marginTop: '50px', color: 'white' }} onClick={() => onBackClick(null, "")}>back</Button>

      </Card >
    );
  }
}

// DirectorView.propTypes = {
//   directorData: PropTypes.shape({
//     Name: PropTypes.string.isRequired,
//     Bio: PropTypes.string.isRequired
//   })
// };
