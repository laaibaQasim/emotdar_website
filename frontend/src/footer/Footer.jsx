import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'
const Footer = ({marginTop}) => {
    const footerStyle = {
        backgroundColor: "rgba(22, 37, 57)",
        marginTop: marginTop,
      };
      const copyRightStyle = {
        backgroundColor: "rgba(16, 26, 39)",
      };
    return(
        <section id = "footer" className="footer" style={footerStyle}>
            <div className="social">
                <a href ="#"><i className="fa-brands fa-linkedin"></i></a>
                <a href ="#"><i className="fa-brands fa-github"></i></a>
                <a href ="#"><i className="fa-brands fa-discord"></i></a>
            </div>
            <ul>
                <li>
                    <Link to="/" className="nav-link text-white">HOME</Link>
                </li>
                <li>
                    <Link to="/recorder" className="nav-link text-white">RECORDER</Link>
                </li>
                <li>
                    <Link to="/detector" className="nav-link text-white">DETECTOR</Link>
                </li>
                <li>
                    <Link to="/about" className="nav-link text-white">ABOUT US</Link>
                </li>
            </ul>
            <p className='copy-right' style={copyRightStyle}>Copyrights @2023 all rights reserved by EmotDar</p>
        </section>
    )
}
export default Footer;