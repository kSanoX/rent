import FeaturedTitle from "../FeaturedTitle";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer"
import "./aboutUs.scss";

import purpleStar from "../../images/icons/purpleStar.svg";
import bakalavr from "../../images/icons/bakalavr.svg";
import group from "../../images/icons/group.svg";

import aboutUsImg from "../../images/about_us_title.png";
import WorkTeamCards from "../WorkTeamCards";

function AboutAsPage() {
    return (
        <>
            <Header></Header>
            <div className="about__us">
                <div className="our__journey">
                    <div>
                        <FeaturedTitle title={"Our Journey"} text={"Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary. Over the years, we've expanded our reach, forged valuable partnerships, and gained the trust of countless clients."} showButton={false}></FeaturedTitle>
                        <div className="promo_info">
                            <div className="promo_info-card"><h2>200+</h2> <p>Happy Customers</p></div>
                            <div className="promo_info-card"><h2>10k+</h2> <p>Properties For Clients</p></div>
                            <div className="promo_info-card"><h2>16+</h2> <p>Years of Experience</p></div>
                        </div>
                    </div>
                    <div>
                        <img className="abstruction" src={aboutUsImg} alt="aboutUs" />
                    </div>
                </div>

                <div className="our__values">
                    <div className="our__title">
                    <FeaturedTitle title={"Our Values"} text={"Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."} showButton={false}></FeaturedTitle>
                    </div>
                    <div className="border">
                        <div className="grid">
                            <div className="grid-item right"><div className="radial"><img src={purpleStar} alt="" />Trust</div> <br />  <p>Trust is the cornerstone of every successful real estate transaction.</p></div>
                            <div className="grid-item"><div className="radial"><img src={bakalavr} alt="" />Excellence</div> <br /> <p>Trust is the cornerstone of every successful real estate transaction.</p></div>
                            <div className="grid-item right"><div className="radial"><img src={group} alt="" />Client-Centric</div> <br /> <p>Trust is the cornerstone of every successful real estate transaction.</p></div>
                            <div className="grid-item"><div className="radial"><img src={purpleStar} alt="" />   Our Commitment </div><br /> <p>Trust is the cornerstone of every successful real estate transaction.</p></div>
                        </div>
                    </div>
                </div>

                <div className="our__achievements">
                    <FeaturedTitle title={"Our Achievements"} text={"Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."} showButton={false}></FeaturedTitle>
                    <div className="cards__achievements">
                        <div className="border"><div className="cards__achievements-item"><h2>3+ Years of Excellence</h2><br /> <p>With over 3 years in the industry, we've amassed a wealth of knowledge and experience, becoming a go-to resource for all things real estate.</p></div></div>
                        <div className="border"><div className="cards__achievements-item"><h2>Happy Clients</h2> <br /><p>Our greatest achievement is the satisfaction of our clients. Their success stories fuel our passion for what we do.</p></div></div>
                        <div className="border"><div className="cards__achievements-item"><h2>Industry Recognition</h2><br /> <p>We've earned the respect of our peers and industry leaders, with accolades and awards that reflect our commitment to excellence.</p></div></div>
                    </div>
                </div>

                <div className="navigation">
                    <FeaturedTitle
                        title={"Our Achievements"}
                        text={
                            "Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary."
                        }
                        showButton={false}
                    ></FeaturedTitle>
                    <div className="navigation__grid">
                        <div className="navigation-item">
                            <h2>Step 01</h2>
                            <div className="gradient">
                                <div className="contentt">
                                    <h3>Discover a World of Possibilities</h3>
                                    <br />
                                    <p>
                                        Your journey begins with exploring our carefully curated property
                                        listings. Use our intuitive search tools to filter properties based
                                        on your preferences, including location, type, size, and budget.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="navigation-item">
                            <h2>Step 02</h2>
                            <div className="gradient">
                                <div className="contentt">
                                    <h3>Discover a World of Possibilities</h3>
                                    <br />
                                    <p>
                                        Your journey begins with exploring our carefully curated property
                                        listings. Use our intuitive search tools to filter properties based
                                        on your preferences, including location, type, size, and budget.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="navigation-item">
                            <h2>Step 03</h2>
                            <div className="gradient">
                                <div className="contentt">
                                    <h3>Discover a World of Possibilities</h3>
                                    <br />
                                    <p>
                                        Your journey begins with exploring our carefully curated property
                                        listings. Use our intuitive search tools to filter properties based
                                        on your preferences, including location, type, size, and budget.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="navigation-item">
                            <h2>Step 04</h2>
                            <div className="gradient">
                                <div className="contentt">
                                    <h3>Discover a World of Possibilities</h3>
                                    <br />
                                    <p>
                                        Your journey begins with exploring our carefully curated property
                                        listings. Use our intuitive search tools to filter properties based
                                        on your preferences, including location, type, size, and budget.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="navigation-item">
                            <h2>Step 05</h2>
                            <div className="gradient">
                                <div className="contentt">
                                    <h3>Discover a World of Possibilities</h3>
                                    <br />
                                    <p>
                                        Your journey begins with exploring our carefully curated property
                                        listings. Use our intuitive search tools to filter properties based
                                        on your preferences, including location, type, size, and budget.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="navigation-item">
                            <h2>Step 06</h2>
                            <div className="gradient">
                                <div className="contentt">
                                    <h3>Discover a World of Possibilities</h3>
                                    <br />
                                    <p>
                                        Your journey begins with exploring our carefully curated property
                                        listings. Use our intuitive search tools to filter properties based
                                        on your preferences, including location, type, size, and budget.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <WorkTeamCards></WorkTeamCards>
                <div className="reviews">
                    <FeaturedTitle title={"Our Valued Clients"} text={"At Estatein, we have had the privilege of working with a diverse range of clients across various industries. Here are some of the clients we've had the pleasure of serving"} showButton={false}></FeaturedTitle>
                    <div className="reviews__content">
                    <div className="border">
                            <div className="reviews-item">
                                <div className="corp-info"><p>Since 2024</p> <br /> <h2>ABC Corporation</h2> <button>Visit WebSite</button></div>
                                <div className="domain">
                                <p>Domain</p> <br />
                                    Commercial Real Estate
                                </div>
                                <div className="category">
                                <p>Category</p> <br />
                                    Luxury Home Development
                                </div>
                                <div className="what__they-said">
                                    <h2>What They Said 🤗</h2>
                                    <p>Estatein's expertise in finding the perfect office space for our expanding operations was invaluable. They truly understand our business needs.</p>
                                </div>
                            </div>
                            </div>
                            <div className="border">
                            <div className="reviews-item">
                                <div className="corp-info"><p>Since 2024</p> <br /> <h2>ABC Corporation</h2> <button>Visit WebSite</button></div>
                                <div className="domain">
                                    <p>Domain</p> <br />
                                    Commercial Real Estate
                                </div>
                                <div className="category">
                                <p>Category</p> <br />
                                    Luxury Home Development
                                </div>
                                <div className="what__they-said">
                                    <h2>What They Said 🤗</h2>
                                    <p>Estatein's expertise in finding the perfect office space for our expanding operations was invaluable. They truly understand our business needs.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default AboutAsPage;