import "./questions.scss"
import FeaturedTitle from "../../FeaturedTitle";
import PageListing from "../../PageListing.jsx";

function Questions () {
    return (
        <div className="question-cards__container">
        <FeaturedTitle title={"Frequently Asked Questions"} text={"Find answers to common questions about Estatein's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way."}></FeaturedTitle>
        <div className="card-items__questions">
             <div className="question-item"><h3>How do I search for properties on Estatein?</h3><p>Learn how to use our user-friendly search tools to find properties that match your criteria.</p><button>Read More</button></div>
             <div className="question-item"><h3>What documents do I need to sell my property through Estatein?</h3><p>Find out about the necessary documentation for listing your property with us.</p><button>Read More</button></div>
             <div className="question-item"><h3>How can I contact an Estatein agent?</h3><p>Discover the different ways you can get in touch with our experienced agents.</p><button>Read More</button></div>
        </div>
        <PageListing></PageListing>
        </div>
    )
};

export default Questions;