import React from 'react';
import style from './About.css'
import luciano from "./images/luciano.jpg"
import seba from "./images/seba.jpg"
import delfi from "./images/delfi.jpg"
import flor from "./images/flor.jpg"
import mati from "./images/mati.jpg"
import leandro from "./images/leandro.jpg"
import lucio from "./images/lucio.jpg"
import {Card, CardColumns, CardGroup, Button} from 'react-bootstrap';


export default function About(){
    return(
    <div>
        <span>
            <h1>Somos Tech Store</h1>
            <h4>agregar subtitulo re copado</h4>
            <p>Arroz con leche, me quiero casar
Con una señorita de San Nicolás
Que sepa cocer, que sepa bordar
Que sepa abrir la puerta para ir a jugar
Yo soy la viudita del barrio del rey
Me quiero casar y no sé con quién
Con esta sí, con esta no
Con esta señorita me caso yo
Arroz con leche, me quiero casar
Con una señorita de San Nicolás
Que sepa cocer, que sepa bordar</p>
        </span>
    <CardColumns>
    
        
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={luciano} />
            <Card.Body>
              <Card.Title>Luciano Arquel</Card.Title>
              <Card.Text class="col.sm">
              Desarrollador Full Stack <br/>
              Provincia (no me acuerdo perdon)<br/>
              algun dato interesante
              </Card.Text>
              <a href="https://www.linkedin.com/feed/" target="_blank">
              <Button variant="primary">Contactar</Button>
              </a>
            </Card.Body> 
            </Card>

            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={seba} />
            <Card.Body>
              <Card.Title>Sebastian Ferreyra</Card.Title>
              <Card.Text class="col.sm">
              Desarrollador Full Stack <br/>
              Provincia (no me acuerdo perdon)<br/>
              algun dato interesante
              </Card.Text>
              <a href="https://www.linkedin.com/feed/" target="_blank">
              <Button variant="primary">Contactar</Button>
              </a>
            </Card.Body> 
            </Card>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={delfi} />
            <Card.Body>
              <Card.Title>Delfina Lago</Card.Title>
              <Card.Text class="col.sm">
              Desarrolladora Full Stack <br/>
              Provincia (no me acuerdo perdon)<br/>
              algun dato interesante
              </Card.Text>
              <a href="https://www.linkedin.com/feed/" target="_blank">
              <Button variant="primary">Contactar</Button>
              </a>
            </Card.Body> 
            </Card>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={flor} />
            <Card.Body>
              <Card.Title>Florencia Gonzalez</Card.Title>
              <Card.Text class="col.sm">
              Desarrolladora Full Stack <br/>
              Provincia (no me acuerdo perdon)<br/>
              algun dato interesante
              </Card.Text>
              <a href="https://www.linkedin.com/feed/" target="_blank">
              <Button variant="primary">Contactar</Button>
              </a>
            </Card.Body> 
            </Card>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={mati} />
            <Card.Body>
              <Card.Title>Matias Betinotti</Card.Title>
              <Card.Text class="col.sm">
              Desarrollador Full Stack <br/>
              Provincia (no me acuerdo perdon)<br/>
              algun dato interesante
              </Card.Text>
              <a href="https://www.linkedin.com/feed/" target="_blank">
              <Button variant="primary">Contactar</Button>
              </a>
            </Card.Body> 
            </Card>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={leandro} />
            <Card.Body>
              <Card.Title>Leandro Prokopio</Card.Title>
              <Card.Text class="col.sm">
              Desarrollador Full Stack <br/>
              Provincia (no me acuerdo perdon)<br/>
              algun dato interesante
              </Card.Text>
              <a href="https://www.linkedin.com/feed/" target="_blank">
              <Button variant="primary">Contactar</Button>
              </a>
            </Card.Body> 
            </Card>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={lucio} />
            <Card.Body>
              <Card.Title>Lucio Gayoso</Card.Title>
              <Card.Text class="col.sm">
              Desarrollador Full Stack <br/>
              Provincia (no me acuerdo perdon)<br/>
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