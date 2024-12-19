import React from "react";
import '../components/Footer.css';

import { Link } from 'react-router-dom';
export default function Footer() {
  return (

    <footer
      className="footer"
      data-uid="de923bfe-779c-4c54-84d1-262253d1079f"
      data-component="Footer"
    >
      <div className="container">
        <div className="row">
          <div className="footer__logo-container-section">
            <div className="col-12 col-md-3 col-lg-2 footer__logo-col">
              <span className="icon icon--fill footer__logo">
                <svg
                  width="75"
                  height="27"
                  viewBox="0 0 75 27"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1.824 16.523V1.145c0-.577 0-.864-.143-1.007-.142-.14-.425-.14-.986-.138C.017.003.017.003.017.704v6.014C.017 13 .016 19.281.02 25.562c0 .174-.007.324-.012.452-.03.69-.033.753 1.187.734.553-.009.63-.084.63-.658v-9.567Zm47.798-5.233c1.444-1.575 3.252-2.24 5.315-2.026 2.18.226 4.31 1.55 5.37 4.326.086-.16.167-.322.248-.483.177-.353.353-.704.572-1.024 1.023-1.49 2.41-2.438 4.175-2.748 2.108-.37 3.964.22 5.5 1.72a6.525 6.525 0 0 1 1.967 4.05c.052.474.082.952.083 1.428.006 2.473.005 4.946.004 7.419v2.073c0 .575-.133.71-.693.723-1.296.027-1.293-.074-1.268-.836.004-.123.009-.263.009-.422v-.248c-.004-3.125-.008-6.25 0-9.374.006-1.653-.517-3.117-1.627-4.287-1.889-1.99-4.702-2.115-6.724-.207-1.025.967-1.603 2.16-1.849 3.536-.059.33-.056.673-.053 1.014l.002.243c-.003 2.288-.003 4.577-.002 6.865v3.018c0 .602-.094.694-.695.698-.598.003-.897.004-1.047-.145-.15-.149-.15-.45-.152-1.05v-.006c-.002-1.012.002-2.025.006-3.038v-.002c.008-2.426.016-4.853-.049-7.277-.066-2.436-1.942-4.763-4.321-5.131-1.567-.242-2.873.24-4.015 1.298-.377.35-.45.354-.756-.107Zm-1.27 6.926.001-2.138c.001-1.74.002-3.479-.002-5.218 0-.163.003-.303.006-.425.008-.334.013-.522-.078-.627-.118-.136-.395-.134-1.032-.13l-.066.001c-.637.005-.697.063-.697.72V25.462c0 .14-.003.265-.005.376-.017.875-.019.932 1.285.91.508-.009.588-.094.588-.609V18.216Zm-7.74-3.6c.385.995.623 2.032.594 3.164H29.79l-.068-.001c-.208-.004-.421-.008-.42.311.002.314.206.306.403.298l.089-.002h7.644c1.748-.001 3.496-.002 5.245.006.344.001.51-.116.479-.476l-.009-.102c-.023-.267-.047-.533-.075-.8-.215-1.986-1.017-3.708-2.391-5.105-2.182-2.217-4.811-3.072-7.86-2.495-3.8.719-6.733 4.03-7.001 8.084-.173 2.597.653 4.888 2.442 6.748 2.103 2.186 4.675 3.052 7.646 2.586 1.847-.29 3.421-1.141 4.729-2.51.148-.154.287-.307.089-.504-.199-.196-.36-.098-.538.08-1.267 1.281-2.768 2.069-4.545 2.344-2.19.34-4.069-.293-5.573-1.898-2.032-2.167-2.627-4.832-2.227-7.75.306-2.229 1.28-4.109 3.06-5.464 1.877-1.427 3.939-1.678 6.074-.674 1.782.838 2.918 2.327 3.629 4.16ZM20.74 17.78c-.038-1.455-.345-2.78-.985-4.002-1.024-1.953-2.508-3.387-4.692-3.807-1.905-.366-3.623.177-5.085 1.496-1.412 1.274-2.278 2.887-2.6 4.766-.516 3.023.06 5.8 2.157 8.079 1.72 1.87 3.883 2.382 6.305 1.804 1.5-.358 2.783-1.114 3.88-2.22.064-.064.18-.074.297-.085.054-.004.107-.01.156-.02-.003.056 0 .118.004.18.008.134.016.268-.045.334-1.174 1.26-2.6 2.08-4.265 2.44-2.585.557-4.967.054-7.077-1.578-1.814-1.402-2.943-3.265-3.33-5.579-.435-2.596.172-4.932 1.744-6.987 1.3-1.699 3.006-2.768 5.092-3.186 2.558-.514 4.887.042 6.945 1.647 1.777 1.385 2.881 3.231 3.255 5.505.053.325.09.653.126.98v.001l.034.298c.048.416-.136.548-.54.547-3.763-.01-7.526-.008-11.289-.006H9.271l-.058.001c-.198.003-.402.006-.41-.277-.01-.33.234-.333.476-.333 2.913.002 5.825.002 8.738.002h2.724Z"></path>
                </svg>
              </span>
            </div>
            <div className="col-12 col-md-9 col-lg-10 footer__welcome">
              <div className="header-normal-regular footer__welcome-text">
              Welcome to Lim
              </div>
              <div className="footer__account-container">
                <button
                  type="button"
                  title="تسجيل الدخول"
                  className="cta cta--theme cta--theme-primary footer__button footer__button--sign-in button-medium"
                >
                  <span className="cta__label button-medium">Log in</span>
                </button>
                <button
                  type="button"
                  title="تسجيل حساب جديد"
                  className="cta cta--theme cta--theme-light footer__button footer__button--sign-up button-medium"
                >
                  <span className="cta__label button-medium">
                    Register a new account
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row fotrmenu">
          {/* Information Section */}
          <div className="offset-lg-2 col-6 col-md-3 col-lg-2">
            <div className="footer__links paragraph-regular">
              <h4 className="footer__links-title" >
                Information
              </h4>
              <ul>
                <li className="footer__link-item">
                  <a href="/ar/ae/info/about-us" className="footer__link" style={{ direction: "ltr", textAlign: "left" }}>
                    About Us
                  </a>
                </li>
                <li className="footer__link-item">
                  <a href="/ar/ae/info/store-locater" className="footer__link" style={{ direction: "ltr", textAlign: "left" }}>
                    Branches
                  </a>
                </li>
              </ul>
              {/* Social Media Links */}
              <ul className="footer-social-media">
                <li className="footer-social-media__item--facebook footer-social-media__item">
                  <a
                    href="https://www.facebook.com/leemglobalfashion/"
                    rel="noopener noreferrer"
                    title="Facebook"
                    className="cta footer-social-media__cta"
                  >
                    <span className="icon icon--fill footer-social-media__icon">
                      {/* Facebook Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path
                          d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 8.438 9.877v-6.986h-2.54v-2.89h2.54V9.795c0-2.507 1.493-3.89 3.777-3.89 1.094 0 2.239.195 2.239.195v2.46h-1.262c-1.243 0-1.63.773-1.63 1.563V12h2.774l-.443 2.891h-2.33v6.986A10 10 0 0 0 19.07 4.93 10 10 0 0 0 12 2Z"
                          fill="#4267B2"
                        />
                      </svg>
                    </span>
                  </a>
                </li>
                {/* <li className="footer-social-media__item--instagram footer-social-media__item">
                  <a
                    href="https://www.instagram.com/leem_global/"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Instagram"
                    className="cta footer-social-media__cta"
                  >
                    <span className="icon icon--fill footer-social-media__icon"> */}
                      {/* Instagram Icon */}
                      {/* <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
                        <path
                          d="M18.538 6.662a1.2 1.2 0 0 1-1.2 1.2 1.2 1.2 0 0 1-1.2-1.2 1.2 1.2 0 0 1 1.2-1.2 1.2 1.2 0 0 1 1.2 1.2M12 6.865A5.135 5.135 0 1 0 17.135 12 5.135 5.135 0 0 0 12 6.865Zm0 8.468A3.333 3.333 0 1 1 15.333 12 3.333 3.333 0 0 1 12 15.333z"
                          fill="#4267B2"
                        />
                      </svg>
                    </span>
                  </a>
                </li> */}
                <li className="footer-social-media__item--youtube footer-social-media__item">
                  <a
                    href="https://www.youtube.com/@leemglobal9565"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Youtube"
                    className="cta footer-social-media__cta"
                  >
                    <span className="icon icon--fill footer-social-media__icon">
                      {/* YouTube Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="29" height="24" viewBox="0 0 29 24">
                        <path d="M11.653 16.282V7.718L19.088 12ZM28.194 5.13a3.579 3.579 0 0 0-2.518-2.518C23.44 2 14.5 2 14.5 2s-8.94 0-11.176.588A3.653 3.653 0 0 0 .806 5.129C.218 7.364.218 12 .218 12s0 4.658.588 6.871a3.579 3.579 0 0 0 2.518 2.517C5.582 22 14.5 22 14.5 22s8.94 0 11.176-.588a3.579 3.579 0 0 0 2.518-2.518c.588-2.236.588-6.87.588-6.87s.024-4.66-.588-6.895z" />
                      </svg>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Help Section */}
          <div className="col-6 col-md-3 col-lg-2">
            <div className="footer__links paragraph-regular">
              <h4 className="footer__links-title">
                Help
              </h4>
              <ul>
                <li className="footer__link-item">
                  <a href="/ar/ae/info/faq" className="footer__link" style={{ direction: "ltr", textAlign: "left" }}>
                    Frequently Asked Questions
                  </a>
                </li>
                <li className="footer__link-item">
                  <a href="/ar/ae/info/faq" className="footer__link" style={{ direction: "ltr", textAlign: "left" }}>
                    Shipping & Returns
                  </a>
                </li>
                <li className="footer__link-item">
                  <a
                    href="https://a.storyblok.com/f/169304/x/bc2a8b4fe1/leem-app-size-guide_v2.pdf"
                    rel="noopener noreferrer"
                    className="footer__link"
                    style={{ direction: "ltr", textAlign: "left" }}
                  >
                    Size Guide
                  </a>
                </li>
               <li className="footer__link-item">
                  <a href="/Privacy" className="footer__link" style={{ direction: "ltr", textAlign: "left" }}>
                    Privacy
                  </a>
                </li> 
                  
              </ul>
            </div>
          </div>
        </div>


        <ul className="contact-section contact-section--grid footer__contact row">
      <li
        className="contact-info col-12 col-md-3 col-lg-2 offset-lg-2"
        data-uid="f998ba27-b711-42d3-abd1-968e66880f15"
      >
        <a
          href="tel:+9668004400099"
          rel="noopener noreferrer"
          title="+966 800 440 0099"
          className="cta"
        >
          <span className="contact-info__icon-wrap">
            <span className="icon icon--flip icon--fill">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.95 3.941a.5.5 0 1 1 .969.251 13.036 13.036 0 0 0 3.399 12.51 13.033 13.033 0 0 0 12.51 3.4c.928-.242 1.245-1.398.57-2.074l-2.127-2.126a1.233 1.233 0 0 0-1.742 0L15.44 16.99a1.978 1.978 0 0 1-2.798 0l-5.613-5.613a1.978 1.978 0 0 1 0-2.798l1.09-1.088a1.234 1.234 0 0 0 0-1.743L5.991 3.622a.5.5 0 0 1 .707-.707l2.127 2.127c.87.872.87 2.284 0 3.157l-1.09 1.088a.978.978 0 0 0 0 1.384l5.613 5.613a.978.978 0 0 0 1.384 0l1.09-1.09a2.233 2.233 0 0 1 3.155 0l2.127 2.127c1.223 1.224.649 3.314-1.027 3.748A14.032 14.032 0 0 1 6.61 17.41 14.036 14.036 0 0 1 2.95 3.942Z"></path>
              </svg>
            </span>
          </span>
          <span
            className="contact-info__label"
            dir="ltr"
            style={{ textAlign: 'left' }}
          >
            +966 800 440 0099
          </span>
        </a>
      </li>
      <li
        className="contact-info col-12 col-md-3 col-lg-2"
        data-uid="7785f145-07e6-4736-9a32-4b693ece2627"
      >
        <a
          href="mailto:customercare@leem.com"
          rel="noopener noreferrer"
          title="customercare@leem.com"
          className="cta"
        >
          <span className="contact-info__icon-wrap">
            <span className="icon icon--flip icon--fill">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 24 24"
              >
                <path d="M21.98 18.519a.361.361 0 0 0 .02-.112V5.465a.36.36 0 0 0-.02-.112l-.004-.015a.363.363 0 0 0-.067-.112l-.004-.007-.004-.003a.366.366 0 0 0-.108-.079l-.009-.005a.36.36 0 0 0-.124-.03h-.013l-.012-.002H1.365l-.012.001-.011.001a.365.365 0 0 0-.126.03l-.007.005a.361.361 0 0 0-.11.08s-.002 0-.003.002l-.004.007a.365.365 0 0 0-.068.112l-.005.015A.359.359 0 0 0 1 5.465v12.943c0 .04.008.078.02.114l.004.014a.365.365 0 0 0 .069.113l.003.006.006.004a.369.369 0 0 0 .038.034l.018.015c.016.011.033.02.051.029.005.001.009.005.013.006.044.02.092.03.143.03h20.27c.05 0 .099-.01.143-.03l.02-.01a.38.38 0 0 0 .044-.025l.02-.018a.337.337 0 0 0 .036-.031l.006-.005.004-.008a.365.365 0 0 0 .067-.111l.006-.016zM1.732 6.294l6.15 5.618-6.15 5.662Zm12.606 5.342c-.026.017-.052.03-.074.054-.008.01-.01.02-.017.03L11.5 14.227 2.307 5.831h18.386zm-5.914.77 2.83 2.586a.364.364 0 0 0 .493 0l2.796-2.553 6.15 5.603H2.301Zm6.66-.462 6.186-5.65V17.58z"></path>
              </svg>
            </span>
          </span>
          <span
            className="contact-info__label contact-info__label--color"
            style={{ direction: 'ltr', textAlign: 'left' }}
          >
            customercare@leem.com
          </span>
        </a>
      </li>
    </ul>

    <div className="footer__lower">
      <span style={{ direction: 'ltr', textAlign: 'left' }}>© Lim 2024</span>
      <div>
        {/* <a
          href="/ar/ae/info/terms-and-conditions"
          className="cta footer__legal-link"
          title="شروط"
          style={{ direction: 'ltr', textAlign: 'left' }}
        >
          Conditions
        </a>
        <a
          href="/"
          className="cta footer__legal-link"
          title="شروط"
          style={{ direction: 'ltr', textAlign: 'left' }}
        >
          Privaccy
        </a> */}


        <ul>
        <li className="cta footer__legal-link">
          <Link to="/conditions">Conditions</Link>
        </li>
        <li className="cta footer__legal-link">
          <Link to="/Privacy">Privacy</Link>
        </li>
      </ul>
      </div>
    </div>

           </div>
      </footer>
  )
}
