import data_collection from '../../components/assets/data_collection.jpg'; 
import detect_emotions from '../../components/assets/emotion_detection.png';
import ayesha from '../../components/assets/ayesha.jpeg' 
import laiba from '../../components/assets/laiba5.jpeg'; 
import './HomePage.css'
import InventorCard from "./InventorCard";
import RobotCard from "./RobotCard";
import {React} from 'react';
import Typewriter from 'typewriter-effect';

const HomePage = () =>
{
  const inventors = [
    {
      id: 1,
      name: 'MS. AYESHA ARSHAD',
      role: 'Audio Model Developer',
      image: ayesha,
    },
    {
      id: 2,
      name: 'MS. LAIBA QASIM',
      role: 'Web Developer',
      image: laiba,
    },
    {
        id: 3,
        name: 'DR. ADEEL NISAR',
        role: 'Team Mentor',
        image: data_collection,
      },
      {
        id: 4,
        name: 'MS. FATIMA HABIB',
        role: 'Dataset Curator',
        image: data_collection,
      },
      {
        id: 5,
        name: 'MS. TOOBA ATIF',
        role: 'Dataset Collector',
        image: data_collection,
      },
      {
        id: 5,
        name: 'MS. MUNAZZA SHAHZAD',
        role: 'Video Model Developer',
        image: data_collection,
      },
    // Add more dummy data as needed
  ];
    const cardData = [
        { imageSrc: data_collection, text: "Data Collection", link: "/recorder" },
        { imageSrc: detect_emotions, text: "Emotion Detection", link: "/detector" },
        // Add more cards as needed
      ];
    return (
    <div className="home">
        <div className="home-top">
        {/* Banner Section */}
        <div className="banner transparent-background">
            <div className="banner-image w-100 vh-100 d-flex justify-content-center align-items-center">
                <div className="content text-center">
                    <div className="main-heading">
                        <p>Experience Real-Time</p>
                        <p>Emotion Detection</p>
                    </div>
                    <div className="sub-heading">
                    <p>Wintness the power of Machine Learning by detecting your emotions</p>
                        <p>through audio and video</p>
                    </div>
                    <button className="btn-explore">Explore Now</button>
                </div>
            </div>
        </div>
  
        {/* Main Content */}
        
      </div>
      <div className="modules-heading">
        <h2>Our Modules</h2>
      </div>
      <div className="cards-robot">
      {cardData.map((card, index) => (
        <RobotCard
          key={index}
          imageSrc={card.imageSrc}
          text={card.text}
          link={card.link}
        />
      ))}
    </div>
    <div className="home-info">
      <Typewriter
  options={{
    strings: [
      "With features such as live emotion detection using Machine Learning, emotion recording for machine learning training, and interactive tools, we aim to empower users in gaining deeper insights into the realm of emotions. Join us on this exciting journey to explore, record, and understand the rich tapestry of human emotions."
    ],
    autoStart: true,
    loop: true,
    delay: 10, // Adjust the delay between characters
    deleteSpeed: 100 // Adjust the speed of deleting characters
  }}
/>
      </div>
      <div className="slider">
        <div className="slider-title">
          <h1>Our Team</h1>
        </div>
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">  
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
            <div className="carousel-inner inventor-content">
              <div className="carousel-item active">
              <InventorCard inventors = {inventors} index = {0}></InventorCard>
              </div>
              <div className="carousel-item">
                <InventorCard inventors = {inventors} index = {2}></InventorCard>
              </div>
              <div className="carousel-item">
                <InventorCard inventors = {inventors} index={4}></InventorCard>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
        </div>
        </div>
      </div>
    )
}

export default HomePage;