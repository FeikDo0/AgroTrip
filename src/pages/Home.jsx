import HeroSection from "../components/home/HeroSection";
import BenefitsSection from "../components/home/BenefitsSection";
import PopularLocations from "../components/home/PopularLocations";
import BookingInfoSection from "../components/home/BookingInfoSection";

import { useLocations } from "../contexts/LocationsContext";

function Home() {
  const { locations } = useLocations();

  return (
    <>
      <HeroSection locations={locations} />
      <BenefitsSection />
      <BookingInfoSection />
      <PopularLocations locations={locations} />
    </>
  );
}

export default Home;