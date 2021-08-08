import React, { Component } from 'react'
import {Link,withRouter} from "react-router-dom";

class Navbar extends Component {

    logOut(e){
        e.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.histrory.push('/');
    }

    render() {
const loginRegLink = (
   <ul className="nav nav-tabs">
      <li className="nav-items">
           <Link to="/login" className="nav-link">
               <h1><img src="https://img.icons8.com/ios-filled/50/000000/login-rounded-right.png"/>Login</h1>
           </Link>
      </li>
      <li className="nav-items">
           <Link to="/register" className="nav-link">
               <h1><img src="https://img.icons8.com/material-sharp/24/000000/add-user-male.png"/>Register</h1>
           </Link>
      </li>
   </ul>
)

const userLink = (
    <ul className="nav nav-tabs">
    <li className="nav-items">
         <Link to="/profile" className="nav-link">
             <h1><img src="https://img.icons8.com/color/48/000000/customer-skin-type-7.png"/>User</h1>
         </Link>
    </li>
    <li className="nav-items">
         <Link to="/uploads" className="nav-link">
             <h1><img src="https://img.icons8.com/flat-round/64/000000/upload-document--v1.png"/>Assignments Submission</h1>
         </Link>
    </li>
    <li className="nav-items">
         <Link to="/assignments" className="nav-link">
             <h1><img src="https://img.icons8.com/color/48/000000/list.png"/>Assignments List</h1>
         </Link>
    </li>

    <li className="nav-items">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
             <h1><img src="https://img.icons8.com/color/48/000000/logout-rounded-left.png"/>Logout</h1>
          </a>
    </li>
 </ul>
)

return(
    <nav className="navbar navbar-expand-lg navbar-light rounded">
     <button 
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar1"
      aria-controls="navbar1"
      aria-expanded="false"
     aria-label="Toggle navigation"
     >

         <span className="navbar-toggler-icon"></span>

     </button>

     <div className="collapse navbar-collapse justify-content-md-center" id="navbar1">
     <ul className="nav nav-tabs">
      <li className="nav-items">
           <Link to="/" className="nav-link">
               <h1><img src="https://img.icons8.com/ios-filled/48/000000/home.png"/>Home</h1>
           </Link>
      </li>
      
   </ul>
   {localStorage.userToken ? userLink:loginRegLink}
     </div>
    </nav>
)
    }
}

export default  withRouter(Navbar);