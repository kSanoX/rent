import './clientsRating.scss';
import star from "../../../images/icons/star.svg";
import avatar from "./Profile.png";
import FeaturedTitle from '../../FeaturedTitle';
import PageListing from '../../PageListing';

function ClientsRating ( ) {
    return(
        <div className="clients__rating-container">
            <FeaturedTitle title={"What Our Clients Say"} text={}></FeaturedTitle>

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
            <PageListing></PageListing>
        </div>
    )
}

export default ClientsRating;