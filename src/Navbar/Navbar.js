import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav} from 'react-bootstrap'
import '../App.css'

class TopBar extends Component{
    constructor(props){
        super(props)
        this.home = React.createRef()
        this.link = React.createRef()
    }

    render(){
        return(
        <Navbar bg="black" variant="dark" expand="xl">
        <Navbar.Brand href="#home" className="title-brand">Blue Sky Weather&emsp;<i className="fas fa-cloud-sun"></i></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
        </Navbar.Collapse>
        </Navbar>            
        );
    }
}

export default TopBar;