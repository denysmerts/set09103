import { ReactComponent as BookShelfSVG } from "../../assets/bookshelf.svg";
import { useNavigate } from "react-router-dom";
import { Slider, Searchbar } from "../../components";
import { books } from "../../mockData/books";
import "./Home.scss";

export const Home = () => {
  const navigate = useNavigate();

  const handleExploreMoreClick = () => {
    navigate("/about");
  };

  return (
    <div>
      <div className="welcome-section">
        <div className="welcome-section__text">
          The Book Lover's Dreamland Awaits!
        </div>
        <div className="welcome-section__subtext">
          Welcome to ultimate book lover's paradise! Join our community and
          contribute to the ever-
          <br />
          evolving library of stories,where every book has a chance to inspire
          someone new{" "}
        </div>
        <Searchbar />
      </div>
      <div className="recommendation-section">
        <div className="recommendation-section__text">Our Best Picks</div>
        <Slider books={books} />
      </div>
      <div className="info-section">
        <BookShelfSVG className="info-section__bookshelf" />
        <div className="info-section__rihgt-side">
          <div className="info-section__right-side__text">
            Your favourite
            <span className="info-section__right-side__text__orange">
              Reads <br /> Are Here!
            </span>
          </div>
          <div className="info-section__right-side__subtext">
            Buy your favouirte books online with ease! Enjoy exclusive offers
            and discounts on selected titles. Dive into our collection and find
            special deals that make reading more affordable.Shop now and unlock
            more savings with every purchase!
          </div>
          <div className="info-section__right-side__numbers">
            <div className="info-section__right-side__numbers__number-wrapping">
              <div className="info-section__right-side__numbers__number-wrapping__num">
                800+
              </div>
              <div className="info-section__right-side__numbers__number-wrapping__text">
                Book Listing
              </div>
            </div>
            <div className="info-section__right-side__numbers__number-wrapping">
              <div className="info-section__right-side__numbers__number-wrapping__num">
                1K+
              </div>
              <div className="info-section__right-side__numbers__number-wrapping__text">
                Registered Members
              </div>
            </div>
            <div className="info-section__right-side__numbers__number-wrapping">
              <div className="info-section__right-side__numbers__number-wrapping__num">
                50+
              </div>
              <div className="info-section__right-side__numbers__number-wrapping__text">
                Branch Count
              </div>
            </div>
          </div>
          <button
            className="info-section__right-side__explore-button"
            onClick={handleExploreMoreClick}
          >
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};
