import { Component } from "react";
import "./Navbarstyles.css";
import mainLogo from "./assets/logo1.png";

class navbar extends Component {
   state = { clicked: false };
   handleClick =() => {
    this.setState({clicked: !this.state.clicked})
   }
   render() {

   return (
    <>
        <nav>
            
            <div id = "desktop" onClick={this.handleClick}>
                <i id="bar" className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}>
                </i>
            </div>
            <a href = "index.html">
                <img src= {mainLogo} width="161" height="55" viewBox="0 0 161 44" fill="none" alt="logo1"/>
            </a>
            <div>
               <ul id ="navbar">
                    <li><a className="active"
                    href = "index.html">Home</a></li>
                    <li><a href = "services.html">Services</a></li>    
                    <li><a href = "zipcode.html">Zipcode</a></li>    
                    <li><a href = "signup_login.html">Login/Register</a></li>    
                </ul> 
            </div>
            
        </nav>
        </>
    )
}
}

export default navbar;