import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://krds-assignment.github.io/aoc/api-assets/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 900);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <div className="slick-arrow slick-prev"></div>,
    nextArrow: <div className="slick-arrow slick-next"></div>,
  };

  return (
    <div className="app-container">
      {data && (
        <div>
          {isMobileView ? (
            <div className="mobile-carousel">
              <Slider {...settings}>
                {data.features &&
                  data.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      {index === 0 && <img src={data.logo} alt="Main Logo" className="main-logo" />}
                      <div className="content">
                        <img src={feature.logo} alt={`Logo for ${feature.title}`} className="feature-logo" />
                        <p>{feature.title}</p>
                        <hr></hr>
                        <p>{feature.desc}</p>
                      </div>
                      <img src={feature.image} alt={`Image for ${feature.title}`} className="feature-image" />
                    </div>
                  ))}
              </Slider>
            </div>
          ) : (
            <div className="features-container">
              {data.features &&
                data.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    {index === 0 && <img src={data.logo} alt="Main Logo" className="main-logo" />}
                    <div className="content">
                      <img src={feature.logo} alt={`Logo for ${feature.title}`} className="feature-logo" />
                      <p>{feature.title}</p>
                      <hr></hr>
                      <p>{feature.desc}</p>
                    </div>
                    <img src={feature.image} alt={`Image for ${feature.title}`} className="feature-image" />
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
