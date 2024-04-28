import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <section className="footerDiv">
      <div className="footer">
        <div className="left-div">
          <p>FASHION</p>
          <small>Complete your style with awesome clothes from us.</small>
          <div className="icons">
            <i>
              <FaFacebookF />
            </i>
            <i>
              <FaInstagram />
            </i>
            <i>
              <FaTwitter />
            </i>
            <i>
              <FaLinkedinIn />
            </i>
          </div>
        </div>
        <div className="side-one">
          <p>Company</p>
          <small>About</small>
          <br></br>
          <small>Contact us</small>
          <br></br>
          <small>Support</small>
          <br></br>
          <small>Careers</small>
        </div>
        <div className="side-one">
          <p>Quick Link</p>
          <small>Share Location</small>
          <br></br>
          <small>Orders Tracking</small>
          <br></br>
          <small>Size Guide</small>
          <br></br>
          <small>FAQs</small>
        </div>
        <div className="side-one">
          <p>Legal</p>
          <small>Terms & conditions</small>
          <br></br>
          <small>Privacy Policy</small>
        </div>
      </div>
    </section>
  );
};

export default Footer;
