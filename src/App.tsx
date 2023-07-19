import "./App.css";
import img from "./Graphic_Side.jpg";

function App() {
  return (
    <div className="flex w-full">
      <div className="flex justify-center items-center w-1/2">
        <div className="border border-gray-200 rounded w-80 h-96"></div>
      </div>
      <img src={img} className="w-1/2" />
    </div>
  );
}

export default App;
