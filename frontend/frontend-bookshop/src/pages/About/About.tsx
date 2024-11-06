import "./About.scss";

export const About = () => {
  return (
    <>
      <div className="top-section"> </div>
      <div className="content">
        <div className="about-section">
          <div className="about-section__title">About us</div>
          <div className="about-section__text">
            Welcome to Neth BookPoint, your trusted source for a diverse range
            of books catering to every reader's taste. Established with the
            mission to foster a love for reading in our community, we pride
            ourselves on providing excellent service and a wide selection of
            books. Our journey began in 2021, and since then, we have grown to
            become a beloved destination for book lovers. Below, you'll find
            information about our four branches, their locations, and contact
            numbers.
          </div>
        </div>
        <div className="branches-section">
          <div className="branches-section__title">Our Branches</div>
          <div className="branches-section__wrapper">
            <div className="branches-section__wrapper__branch-wrapper">
              <div className="branches-section__wrapper__branch-wrapper__city">
                Edinburgh
              </div>
              <div className="branches-section__wrapper__branch-wrapper__street">
                Main Street, City Center
              </div>
              <div>Contact: 123-456-7890</div>
              <div>
                Operating Hours: Monday to Saturday, 9 AM - 7 PM; Sunday, 10 AM
                - 5 PM
              </div>
              <div>
                In-store shopping, Special discounts for students, Workshops,
                Study spaces
              </div>
            </div>
            <div className="branches-section__wrapper__branch-wrapper">
              <div className="branches-section__wrapper__branch-wrapper__city">
                London
              </div>
              <div className="branches-section__wrapper__branch-wrapper__street">
                Main Street, City Center
              </div>
              <div>Contact: 123-456-7890</div>
              <div>
                Operating Hours: Monday to Saturday, 9 AM - 7 PM; Sunday, 10 AM
                - 5 PM
              </div>
              <div>
                In-store shopping, Special discounts for students, Workshops,
                Study spaces
              </div>
            </div>
            <div className="branches-section__wrapper__branch-wrapper">
              <div className="branches-section__wrapper__branch-wrapper__city">
                York
              </div>
              <div className="branches-section__wrapper__branch-wrapper__street">
                Main Street, City Center
              </div>
              <div>Contact: 123-456-7890</div>
              <div>
                Operating Hours: Monday to Saturday, 9 AM - 7 PM; Sunday, 10 AM
                - 5 PM
              </div>
              <div>
                In-store shopping, Special discounts for students, Workshops,
                Study spaces
              </div>
            </div>
          </div>
        </div>
        <div className="commitment-section">
          <div className="commitment-section__title">Our Commitment</div>
          <div className="commitment-section__text">
            At Neth BookPoint, we are committed to providing a welcoming and
            inspiring environment for all book enthusiasts. Each of our branches
            is staffed with knowledgeable and friendly team members ready to
            assist you in finding the perfect book. Whether you're looking for
            the latest bestseller, a rare find, or a cozy place to read, Neth
            BookPoint is your destination. We believe in the power of reading to
            transform lives and build community. Join us at one of our branches
            or explore our offerings online. We're here to support your reading
            journey and make your book shopping experience enjoyable and
            fulfilling.
          </div>
        </div>
      </div>
    </>
  );
};
