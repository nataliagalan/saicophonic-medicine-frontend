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
      <div id="wrapper">
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

        {/* <!-- Page Content --> */}
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1>Simple Sidebar</h1>
                        <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will appear/disappear. On small screens, the page content will be pushed off canvas.</p>
                        <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>.</p>
                        
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- /#page-content-wrapper --> */}

</div>
{/* <!-- /#wrapper --> */}
     </>
    )
  }
}


export default Sidebar 