import "./App.css";
import Header from "./components/Header";
import Card from "./components/Card";
import Hero from "./components/Hero";

function App() {
  const props = {
    img: "../images/katie-zaferes.png",
    rating: "5.0",
    reviewCount: 6,
    country: "USA",
    title: "Life Lessons with Katie Zaferes",
    price: 136,
  };
  return (
    <div className="App">
      <Header></Header>
      <Hero />
      <Card />

    </div>
  );
}

export default App;
