import teamProfilePhoto1 from "../images/teamProfilePhoto.png";
import teamProfilePhoto2 from "../images/teamProfilePhoto2.png";
import teamProfilePhoto3 from "../images/teamProfilePhoto3.png";
import teamProfilePhoto4 from "../images/teamProfilePhoto4.png";
import send from "../images/icons/Send.svg";
import twiter from "../images/icons/twiter.svg"

import FeaturedTitle from "./FeaturedTitle";


function WorkTeamCards () { 
    return (
        <div className="work__team">
                    <FeaturedTitle title={"Meet the Estatein Sellers"} text={"At Estatein, our success is driven by the dedication and expertise of our team. Get to know the people behind our mission to make your real estate dreams a reality."} showButton={false}></FeaturedTitle>
                    <div className="flexible__work-team">
                        <div className="work__team-item"><img src={teamProfilePhoto1} alt="" />
                            <a className="twitter" href="/"><img src={twiter} alt="" /></a>
                            <h2>Michael Mitchel</h2>
                            <p>Seller</p>
                            <div className="say__hello">Say Hello 👋 <button><img src={send} alt="" /></button></div>
                        </div>
                        <div className="work__team-item"><img src={teamProfilePhoto2} alt="" />
                            <a className="twitter" href="/"><img src={twiter} alt="" /></a>
                            <h2>Sarah Johnson</h2>
                            <p>Seller</p>
                            <div className="say__hello">Say Hello 👋 <button><img src={send} alt="" /></button></div>
                        </div>
                        <div className="work__team-item"><img src={teamProfilePhoto3} alt="" />
                            <a className="twitter" href="/"><img src={twiter} alt="" /></a>
                            <h2>David Brown</h2>
                            <p>Seller</p>
                            <div className="say__hello">Say Hello 👋 <button><img src={send} alt="" /></button></div>
                        </div>
                        <div className="work__team-item"><img src={teamProfilePhoto4} alt="" />
                            <a className="twitter" href="/"><img src={twiter} alt="" /></a>
                            <h2>Michael Turner</h2>
                            <p>Seller</p>
                            <div className="say__hello">Say Hello 👋 <button><img src={send} alt="" /></button></div>
                        </div>
                    </div>
                </div>
    )
}

export default WorkTeamCards;