import React from "react";

import { FaLinkedin } from "react-icons/fa";

import Navbar from "../components/Navbar";

import "../styles/pages/AboutUs.scss";

function AboutUsPage() {
    return (
        <div className="AboutUs">
            <Navbar />
            <div className="AboutUs-container">
                <div className="AboutUs-team">
                    <h1 className="AboutUs-title">A team of 7 developers</h1>
                    <div className="AboutUs-contacts">
                        <section className="AboutUs-card">
                            <div className="AboutUs-card-picture-container">
                                <img src="/assets/aboutus-page/austin.jpg" alt="austin-picture" />
                            </div>
                            <div className="AboutUs-card-content">
                                <h1>
                                    <a href="https://www.linkedin.com/in/austin-william-lo-2a75271a1/" target="blank">
                                        Austin-William Lo
                                    </a>
                                    <FaLinkedin />
                                </h1>
                                <p>Fullstack developer</p>
                            </div>
                        </section>
                        <section className="AboutUs-card">
                            <div className="AboutUs-card-picture-container">
                                <img src="/assets/aboutus-page/emma.jpg" alt="emma-picture" />
                            </div>
                            <div className="AboutUs-card-content">
                                <h1>
                                    <a href="https://www.linkedin.com/in/emma-rulliere/" target="blank">
                                        Emma Rulliere
                                    </a>
                                    <FaLinkedin />
                                </h1>
                                <p>Fullstack developer</p>
                            </div>
                        </section>
                        <section className="AboutUs-card">
                            <div className="AboutUs-card-picture-container">
                                <img src="/assets/aboutus-page/dylan.png" alt="dylan-picture" />
                            </div>
                            <div className="AboutUs-card-content">
                                <h1>
                                    <a href="https://www.linkedin.com/in/dylan-faure/" target="blank">
                                        Dylan Faure
                                    </a>
                                    <FaLinkedin />
                                </h1>
                                <p>Frontend developer</p>
                            </div>
                        </section>
                        <section className="AboutUs-card">
                            <div className="AboutUs-card-picture-container">
                                <img src="/assets/aboutus-page/luca.png" alt="luca-picture" />
                            </div>
                            <div className="AboutUs-card-content">
                                <h1>
                                    <a href="https://www.linkedin.com/in/luca-banyols/" target="blank">
                                        Luca Banyols
                                    </a>
                                    <FaLinkedin />
                                </h1>
                                <p>Frontend developer</p>
                            </div>
                        </section>
                        <section className="AboutUs-card">
                            <div className="AboutUs-card-picture-container">
                                <img src="/assets/aboutus-page/vincent.png" alt="vincent-picture" />
                            </div>
                            <div className="AboutUs-card-content">
                                <h1>
                                    <a href="https://www.linkedin.com/in/vincent-pichot-5324111ab/" target="blank">
                                        Vincent Pichot
                                    </a>
                                    <FaLinkedin />
                                </h1>
                                <p>Mobile developer</p>
                            </div>
                        </section>
                        <section className="AboutUs-card">
                            <div className="AboutUs-card-picture-container">
                                <img src="/assets/aboutus-page/annaig.png" alt="annaig-picture" />
                            </div>
                            <div className="AboutUs-card-content">
                                <h1>
                                    <a href="https://www.linkedin.com/in/annaig-leizour/" target="blank">
                                        Annaïg Leizour
                                    </a>
                                    <FaLinkedin />
                                </h1>
                                <p>Devops/Mobile developer</p>
                            </div>
                        </section>
                        <section className="AboutUs-card">
                            <div className="AboutUs-card-picture-container">
                                <img src="/assets/aboutus-page/victor.png" alt="victor-picture" />
                            </div>
                            <div className="AboutUs-card-content">
                                <h1>
                                    <a href="https://www.linkedin.com/in/annaig-leizour/" target="blank">
                                        Victor Thouvenin
                                    </a>
                                    <FaLinkedin />
                                </h1>
                                <p>Backend developer</p>
                            </div>
                        </section>
                    </div>
                </div>
                <div className="AboutUs-timeline">
                    {/* Mettre timeline truc */}
                </div>
                <div className="AboutUs-footer">
                    <h1>How to contact us</h1>
                    <p>You can send us an email with this address</p>
                    <div className="separator"></div>
                    <a href="mailto:paperwork_2024@labeip.epitech.eu">paperwork_2024@labeip.epitech.eu</a>
                </div>
            </div>
        </div>
    )
}

export default AboutUsPage;