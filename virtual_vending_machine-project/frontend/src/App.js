import Header from "./components/Header";
import VendingMachine from "./components/VendingMachine";
import { useState, useEffect } from "react"

function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/sodas')
      .then(response => response.json())
      .then(data => setData(data))
  }, [])

  return (
    <div>
      <Header />
      <VendingMachine data={data} />
    </div>
  );
}

export default App;
