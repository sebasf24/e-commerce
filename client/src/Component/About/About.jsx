import React from 'react';
import styles from './about.css';
import luciano from "./images/luciano.jpg"
import seba from "./images/seba.jpg"
import delfi from "./images/delfi.jpg"
import flor from "./images/flor.jpg"
import mati from "./images/mati.jpg"
import leandro from "./images/leandro.jpg"
import lucio from "./images/lucio.jpg"
import { Card, CardColumns, CardGroup, Button } from 'react-bootstrap';


export default function About() {
  return (
    <div className='ml-3'>
      <span>
        <h1 style={{ color: '#3f51b5', fontWeight: 'bold' }}>Somos Tech Store</h1>
        <h4> Lideres en Tecnologia </h4>
        <p> - </p>
      </span>
      <CardColumns >

        <Card style={{ width: '17.9rem' }}>
          <Card.Img className='imgNosotros rounded-top' variant="top" src={luciano} />
          <Card.Body>
            <Card.Title style={{ color: '#3f51b5', fontWeight: 'bold' }}>Luciano Arquel</Card.Title>
            <Card.Text class="col.sm">
              Desarrollador Full Stack <br />
              Provincia (no me acuerdo perdon)<br />
              algun dato interesante
              </Card.Text>
            <a href="https://www.linkedin.com/feed/" target="_blank">
              <Button variant="primary">Contactar</Button>
            </a>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem' }}>
          <Card.Img className='imgNosotros rounded-top' variant="top" src={seba} />
          <Card.Body>
            <Card.Title style={{ color: '#3f51b5', fontWeight: 'bold' }}>Sebastian Ferreyra</Card.Title>
            <Card.Text class="col.sm">
              Desarrollador Full Stack <br />
              Provincia (no me acuerdo perdon)<br />
              algun dato interesante
              </Card.Text>
            <a href="https://www.linkedin.com/feed/" target="_blank">
              <Button variant="primary">Contactar</Button>
            </a>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem' }}>
          <Card.Img className='imgNosotros rounded-top' variant="top" src={delfi} />
          <Card.Body>
            <Card.Title style={{ color: '#3f51b5', fontWeight: 'bold' }}>Delfina Lago</Card.Title>
            <Card.Text class="col.sm">
              Desarrolladora Full Stack <br />
              Provincia (no me acuerdo perdon)<br />
              algun dato interesante
              </Card.Text>
            <a href="https://www.linkedin.com/feed/" target="_blank">
              <Button variant="primary">Contactar</Button>
            </a>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem' }}>
          <Card.Img className='imgNosotros rounded-top' variant="top" src={flor} />
          <Card.Body>
            <Card.Title style={{ color: '#3f51b5', fontWeight: 'bold' }}>Florencia Gonzalez</Card.Title>
            <Card.Text class="col.sm">
              Desarrolladora Full Stack <br />
              Provincia (no me acuerdo perdon)<br />
              algun dato interesante
              </Card.Text>
            <a href="https://www.linkedin.com/feed/" target="_blank">
              <Button variant="primary">Contactar</Button>
            </a>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem' }}>
          <Card.Img className='imgNosotros rounded-top' variant="top" src={mati} />
          <Card.Body>
            <Card.Title style={{ color: '#3f51b5', fontWeight: 'bold' }}>Matias Betinotti</Card.Title>
            <Card.Text class="col.sm">
              Desarrollador Full Stack <br />
              Provincia (no me acuerdo perdon)<br />
              algun dato interesante
              </Card.Text>
            <a href="https://www.linkedin.com/feed/" target="_blank">
              <Button variant="primary">Contactar</Button>
            </a>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem' }}>
          <Card.Img className='imgNosotros rounded-top' variant="top" src={leandro} />
          <Card.Body>
            <Card.Title style={{ color: '#3f51b5', fontWeight: 'bold' }}>Leandro Prokopio</Card.Title>
            <Card.Text class="col.sm">
              Desarrollador Full Stack <br />
              Provincia (no me acuerdo perdon)<br />
              algun dato interesante
              </Card.Text>
            <a href="https://www.linkedin.com/feed/" target="_blank">
              <Button variant="primary">Contactar</Button>
            </a>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem' }}>
          <Card.Img className='imgNosotros rounded-top' variant="top" src={lucio} />
          <Card.Body>
            <Card.Title style={{ color: '#3f51b5', fontWeight: 'bold' }}>Lucio Gayoso</Card.Title>
            <Card.Text class="col.sm">
              Desarrollador Full Stack <br />
              Provincia (no me acuerdo perdon)<br />
              algun dato interesante
              </Card.Text>
            <a href="https://www.linkedin.com/feed/" target="_blank">
              <Button variant="primary">Contactar</Button>
            </a>
          </Card.Body>

        </Card>

      </CardColumns>

    </div>
  )
}