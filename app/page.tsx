import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UploadCard from "./components/UploadCard";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <UploadCard />
    </main>
  );
}