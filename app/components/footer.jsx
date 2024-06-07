import React from "react";
import "./navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Footer() {
  return (
    <footer className="footer">
      <section className="social-media">
        <div className="left">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="right">
          <a href="#" className="icon-link">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="icon-link">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="icon-link">
            <i className="fab fa-google"></i>
          </a>
          <a href="#" className="icon-link">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="icon-link">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="icon-link">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section className="links">
        <div className="container">
          <div className="grid">
            <div className="column">
              <h6 className="heading">Company name</h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>
            <div className="column">
              <h6 className="heading">Products</h6>
              <p>
                <a href="#" className="link">
                  Angular
                </a>
              </p>
              <p>
                <a href="#" className="link">
                  React
                </a>
              </p>
              <p>
                <a href="#" className="link">
                  Vue
                </a>
              </p>
              <p>
                <a href="#" className="link">
                  Laravel
                </a>
              </p>
            </div>
            <div className="column">
              <h6 className="heading">Useful links</h6>
              <p>
                <a href="#" className="link">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#" className="link">
                  Settings
                </a>
              </p>
              <p>
                <a href="#" className="link">
                  Orders
                </a>
              </p>
              <p>
                <a href="#" className="link">
                  Help
                </a>
              </p>
            </div>
            <div className="column">
              <h6 className="heading">Contact</h6>
              <p>
                <i className="fas fa-home"></i> New York, NY 10012, US
              </p>
              <p>
                <i className="fas fa-envelope"></i>
                info@example.com
              </p>
              <p>
                <i className="fas fa-phone"></i> + 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print"></i> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="copyright">
        © 2021 Copyright:
        <a href="https://mdbootstrap.com/" className="mdbootstrap-link">
          MDBootstrap.com
        </a>
      </div>
    </footer>
  );
}
