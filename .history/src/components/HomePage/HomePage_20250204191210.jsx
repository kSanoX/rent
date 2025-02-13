
import ClientsRating from './ClientsRating/ClientsRating';
import ExploreProperties from './ExploreProperties/ExploreProperties';
import Footer from './Footer/Footer.jsx';
import Header from './Header/Header';
import Promo from './Main/Promo.jsx';
import Questions from './Questions/Questions.jsx';
import "../../App.scss";
import ApartmensCards from '../ApartmentsCards/ApartmentsCards.jsx';
import FeaturedTitle from '../FeaturedTitle';

function HomePage() {
    return (
        <div>
            <Header></Header>
            <Promo></Promo>
            <div className='content__wrapper'>
                <FeaturedTitle title={"Featured Properties"} text={"Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein."}></FeaturedTitle>
                <ApartmensCards></ApartmensCards>
                <ClientsRating></ClientsRating>
                <Questions></Questions>
            </div>
            <ExploreProperties></ExploreProperties>
            <Footer></Footer>
        </div>
    )
}

export default HomePage;