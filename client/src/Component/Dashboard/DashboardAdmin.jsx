import React, {useState} from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import HomeCategories from '../FormCategory/HomeCategories'
import FormularioAdmin from '../formProductAdmin/formProductAdmin'
import HomeUser from '../User/HomeUser'
import OrderAdmin from '../Order/OrderAdmin'


export default function DashboardAdmin(){

    const [key, setKey] = useState('home');

    return (
        <Container fluid>
             <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="products" title="Products" >
          <FormularioAdmin/>
        </Tab>
        <Tab eventKey="categories" title="Categories">
          <HomeCategories />
        </Tab>
        <Tab eventKey="user" title="Users">
          <HomeUser />
        </Tab>
        <Tab eventKey="orders" title="Orders">
          <OrderAdmin />
        </Tab>
      </Tabs>

        </Container>
     
    );
  }
  


