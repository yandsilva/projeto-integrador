import Navbar from "../components/Navbar";
import hero from "../assets/hero.png";
import CarouselItemDisplay from "../components/CarouselItemDisplay";
import ItemDisplay from "../components/ItemDisplay";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <img src={hero} alt="" />
      <CarouselItemDisplay />
      <ItemDisplay />
      <Footer />
    </div>
  );
}
