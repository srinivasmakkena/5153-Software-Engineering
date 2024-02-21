import { Component } from "react";
import "./Navbarstyles.css";
import mainLogo from "./assets/logo1.png";
import {Link } from "react-router-dom";

class Footer extends Component {
   state = { clicked: false };
   handleClick =() => {
    this.setState({clicked: !this.state.clicked})
   }
   render() {

   return (
    <>
        <footer>
            <div className="footer-buttons">
              <div style={{ display:'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                <button className="footer-button">Locations</button>
                <button className="footer-button">Support</button>
                <button className="footer-button">About Us</button>
                <button className="footer-button">Contact Us</button>
              </div>  
            </div>
          </footer>
    </>
    )
}
}

export default Footer;