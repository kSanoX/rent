import './clientsRating.scss';
import star from "../../../images/icons/star.svg";
import avatar from "./Profile.png";
import FeaturedTitle from '../../FeaturedTitle';
import PageListing from '../../PageListing';

function ClientsRating ( ) {
    return(
        <div className="clients__rating-container">
            <FeaturedTitle title={"What Our Clients Say"} text={"Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs."} showButton={true}></FeaturedTitle>

            <div className="clietns__say-container">
                <div className="clients__say-item">
                    <div className="stars-rating">
                        <img src={star} alt="" /><img src={star} alt="" /><img src={star} alt="" /><img src={star} alt="" /><img src={star} alt="" />
                    </div>
                    <div className="clients__title">
                        <h2>Exceptional Service!</h2>
                        <p>Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!</p>
                    </div>
                    <div className="client__info">
                        <img src={avatar} alt="" />
                        <h3>Wade Warren</h3>
                        <p>USA, California</p>
                    </div>
                </div>
                <div className="clients__say-item">
                    <div className="stars-rating">
                        <img src={star} alt="" /><img src={star} alt="" /><img src={star} alt="" /><img src={star} alt="" /><img src={star} alt="" />
                    </div>
                    <div className="clients__title">
                        <h2>Exceptional Service!</h2>
                        <p>Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!</p>
                    </div>
                    <div className="client__info">
                        <img src={avatar} alt="" />
                        <h3>Wade Warren</h3>
                        <p>USA, California</p>
                    </div>
                </div>
                <div className="clients__say-item">
                    <div className="stars-rating">
                        <img src={star} alt="" /><img src={star} alt="" /><img src={star} alt="" /><img src={star} alt="" /><img src={star} alt="" />
                    </div>
                    <div className="clients__title">
                        <h2>Exceptional Service!</h2>
                        <p>Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!</p>
                    </div>
                    <div className="client__info">
                        <img src={avatar} alt="" />
                        <h3>Wade Warren</h3>
                        <p>USA, California</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientsRating;