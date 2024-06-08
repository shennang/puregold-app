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
                Puregold Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aut consequuntur provident ex perspiciatis, esse officiis exercitationem modi voluptatum minima itaque commodi et est, odio excepturi. Iste culpa labore temporibus?
              </p>
            </div>
            <div className="column">
              <h6 className="heading">Products</h6>
              <p>
                <a href="#" className="link">
                  Meat
                </a>
              </p>
              <p>
                <a href="#" className="link">
                  Snacks
                </a>
              </p>
              <p>
                <a href="#" className="link">
                  Dairy
                </a>
              </p>
              <p>
                <a href="#" className="link">
                  Beverages
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
    </footer>
  );
}
