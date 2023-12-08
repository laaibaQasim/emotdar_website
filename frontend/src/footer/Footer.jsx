import React from 'react';
import './footer.css'
const Footer = ({color, marginTop, copyRightColor}) => {
    const footerStyle = {
        backgroundColor: color,
        marginTop: marginTop,
      };
      const copyRightStyle = {
        backgroundColor: copyRightColor || "black",
      };
    return(
        <section id = "footer" className="footer" style={footerStyle}>
            <div className="social">
                <a href ="#"><i class="fa-brands fa-linkedin"></i></a>
                <a href ="#"><i class="fa-brands fa-github"></i></a>
                <a href ="#"><i class="fa-brands fa-discord"></i></a>
            </div>
            <ul>
                <li>
                    <a href ="">HOME</a>
                </li>
                <li>
                    <a href ="">RECORDER</a>
                </li>
                <li>
                    <a href ="">DETECTOR</a>
                </li>
                <li>
                    <a href ="">ABOUT US</a>
                </li>
            </ul>
            <p className='copy-right' style={copyRightStyle}>Copyrights @2023 all rights reserved by EmotDar</p>
        </section>
    )
}
export default Footer;