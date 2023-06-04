import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Nav, Navbar } from 'react-bootstrap';
import SearchBar from "./SearchBar";
import HomeView from "../HomeView";

const Navigationbar = (props) => {
  const { games } = props;
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">Steam Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView games={games}/>} />
          <Route index element={<HomeView games={games}/>} />
          <Route
            path="/search"
            element={<SearchBar games={games} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Navigationbar;