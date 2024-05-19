import React from "react";
import { Menu, Dropdown, Button, Space , Row , Col } from "antd";
import {Link} from 'react-router-dom'
import logo from "../assets/Logo2.jpg"
import styled from "styled-components";

const LogoImage = styled.img`
  width: 10%;

  @media (max-width: 600px) {
    width: 15%;
  }
`;

function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem('user'))
  const menu = (
    <Menu>
        <Menu.Item>
        <a
         
          href="/"
        >
          Home
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          
          href="/userbookings"
        >
          Bookings
        </a>
      </Menu.Item>
      {user.username=="Atul"&&(
      <Menu.Item>
        <a href="/admin">
          Admin
        </a>
        
      </Menu.Item>
      )}
      <Menu.Item onClick={()=>{
          localStorage.removeItem('user');
          window.location.href='/login'
      }}>
          <li style={{color:'orangered'}}>Logout</li>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <div className="header bs1">
          <Row gutter={16} justify='center'>
              <Col lg={20} sm={24} xs={24} >
              <div className="d-flex justify-content-between" style={{alignItems:'center'}}>
              <LogoImage src={logo} alt="Logo" />
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button>{user.username}</Button>
          </Dropdown>
        </div>
              </Col>
          </Row>
        
      </div>
      <div className="content">{props.children}</div>

      <div className="footer text-center">
      <hr />

           <p>Desinged and Developed By</p>

           

           <p>Blaze Bikes NIT Kurukshetra</p>
          
      </div>
    </div>
  );
}

export default DefaultLayout;