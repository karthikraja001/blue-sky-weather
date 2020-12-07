import React,{Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

class FooBar extends Component{
    render(){
        return(
            <div className="handwrite contanier" id="contact" style={{backgroundColor: "black",color: "white"}}>
            <hr></hr>
            <h1 className="d-flex justify-content-center">Contact Me</h1>
            <br></br>
            <br></br>
            <p className="d-flex justify-content-center">Karthik Raja&emsp;&emsp;Student / Web Designer</p>
            <div className="d-flex justify-content-center">
              <a href="https://www.facebook.com/profile.php?id=100008541247273" className="fab fa-facebook fa-2x"> </a>
              <a href="https://twitter.com/MrAnonymousofcl" className="fab fa-twitter fa-2x"> </a>
              <a href="https://github.com/mr-anonymous-official" className="fab fa-github fa-2x"> </a>
              <a href="https://instagram.com/mr.anonymous_official/" className="fab fa-instagram fa-2x"> </a>
          </div>
          <footer className="page-footer font-small blue">
            <div className="footer-copyright text-center py-3">© 2020 Copyright:  Blue Sky Weather
            </div>    
          </footer>
          </div>
        )
    }
}

export default FooBar;