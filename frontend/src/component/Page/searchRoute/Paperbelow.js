import React from "react";
import Slider from "react-slick";
import "./Paper.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideContent = ({ slides }) => (
  <Slider
    infinite={true}
    slidesToShow={1}
    slidesToScroll={1}
    autoplay={true}
    speed={5000}
    autoplaySpeed={3000}
    cssEase="linear"
  >
    {slides.map((slide, index) => (
      <div key={index}>
        <img
          src={slide.imageUrl}
          alt={`Slide ${index + 1}`}
          style={{ width: "360px", height: "200px" }}
        />
        <div className="slide-content" style={{ marginTop: "10px" }}>
          <h3>{slide.title}</h3>
          <p>{slide.content}</p>
        </div>
      </div>
    ))}
  </Slider>
);

export default function Paperbelow() {
  const slidesData1 = [
    {
      title: "Explore Ho Chi Minh City",
      content:
        "Discover the vibrant culture and rich history of Ho Chi Minh City. From bustling markets to historical landmarks, the city has something for everyone.",
      imageUrl:
        "https://www.tripsavvy.com/thmb/-nPVciXf7-kl-XrW096N_9c-_IA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ho-chi-minh-city-at-night-22c7df816ce4493eb0e86cf54fe03309.jpg",
    },
    {
      title: "Explore Ho Chi Minh City",
      content:
        "Immerse yourself in the charm of Hanoi. Explore ancient temples, stroll through the Old Quarter, and savor delicious Vietnamese cuisine.",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/DJI_0550-HDR-Pano.jpg/800px-DJI_0550-HDR-Pano.jpg",
    },
  ];

  const slidesData2 = [
    {
      title: "Experience Hanoi's Charm",
      content:
        "Immerse yourself in the charm of Hanoi. Explore ancient temples, stroll through the Old Quarter, and savor delicious Vietnamese cuisine.",
      imageUrl:
        "https://a.cdn-hotels.com/gdcs/production64/d444/5252610b-aea3-4ea6-a76e-1ede20547e94.jpg",
    },
    {
      title: "Experience Hanoi's Charm",
      content:
        "Immerse yourself in the charm of Hanoi. Explore ancient temples, stroll through the Old Quarter, and savor delicious Vietnamese cuisine.",
      imageUrl:
        "https://vietnamvisavoa.com/public/uploads/files/hanoi-hoan-kiem-lake.jpg",
    },
  ];

  const slidesData3 = [
    {
      title: "Experience Hue's Rich History",
      content:
        "Discover the historical richness of Hue, the ancient capital of Vietnam. Walk through the imperial citadel, explore ancient pagodas, and delve into the city's royal past.",
      imageUrl:
        "https://localvietnam.com/wp-content/uploads/2021/04/hue-imperial-gate.jpg",
    },
    {
      title: "Savor Hue's Culinary Delights",
      content:
        "Indulge your taste buds in the unique flavors of Hue's cuisine. From iconic dishes like bun bo Hue (spicy beef noodle soup) to imperial-inspired delicacies, the city is a paradise for food lovers.",
      imageUrl:
        "https://huedailytour.net/wp-content/uploads/2023/02/DAI-NOI.jpeg",
    },
  ];

  return (
    <div style={{ paddingTop: "2%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "18rem", marginRight: "10%" }}>
          <SlideContent slides={slidesData1} />
        </div>

        <div style={{ width: "18rem", marginRight: "10%" }}>
          <SlideContent slides={slidesData2} />
        </div>

        <div style={{ width: "18rem" }}>
          <SlideContent slides={slidesData3} />
        </div>
      </div>
    </div>
  );
}
