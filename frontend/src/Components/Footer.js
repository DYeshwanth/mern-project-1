import React from 'react'
import './../Styles/Footer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import {faPhone} from "@fortawesome/free-solid-svg-icons"

const Footer = () => {
  return (
    <div className="Footer">
      <div className="content">
        <div>
          <h5>Follow us on</h5>
          <a href="https://www.instagram.com/" target="blank"> <FontAwesomeIcon icon={faInstagram} id="socialIcon"  /></a>
          <a href="https://www.facebook.com/" target="blank"><FontAwesomeIcon icon={faFacebook} id="socialIcon" /></a>

          <a href="https://www.twitter.com/" target="blank"><FontAwesomeIcon icon={faTwitter} id="socialIcon" /></a>

          <a href="https://www.youtube.com/" target="blank"><FontAwesomeIcon icon={faYoutube} id="socialIcon" /></a>
          
        </div>
        <div>
          <h5>Contact us</h5>
          <table>
            
                <td><FontAwesomeIcon icon={faPhone} /></td>
                <td><p className='ph-no'>9876543210</p></td>
            
          </table>
          
          
        </div>
        <div className="subscribe">
          <h5>Subscribe to us</h5>
          <label for = "email">Email</label>
          <input type="email" id="email"></input>
          <button>Subscribe</button> 
        </div>
      </div>
    </div>

  )
}

export default Footer
