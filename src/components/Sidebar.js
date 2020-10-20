import React, { Component } from 'react'
import "../Sidebar.css"
import $ from "jquery"

class Sidebar extends Component {

  componentDidMount() {
    $("#sidebar-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }


  render() {
    return (
     <>
        {/* Sidebar */}
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a href="#">
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" id="sidebar-toggle">Close</a>
                </li>
                <li>
                    <a href="#">New Video +</a>
                </li>
                <li>
                    <a href="#">Logout</a>
                </li>
            </ul>
        </div>
        {/* /#sidebar-wrapper */}
     </>
    )
  }
}


export default Sidebar 