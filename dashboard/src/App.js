import "./App.css";
import LineGraph from "./components/AreaGraph/AreaGraph";
import SmallCard from "./components/SmallCard/SmallCard";

function App() {
  const chart = {
    width: 250,
    height: 150,
  };
  return (
    <div className="App">
      <SmallCard
        backgroundColor="red"
        title="Usuarios"
        total="123"
        chart={chart}
      />
      <LineGraph />
    </div>
  );
}

export default App;
