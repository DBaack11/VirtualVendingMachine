import VendingMachine from "./components/VendingMachine";
import Header from "./components/Header";
import { useState, useEffect } from "react"

function App() {

  // Variable data initialized with the useState() hook used to store and set the sodas data
  const [data, setData] = useState([])

  // useEffect() hook used to retrieve the list of sodas from the API and store the data
  useEffect(() => {
    // if running locally, change url to 'http://localhost:8000/sodas'
    fetch('https://dbaack.pythonanywhere.com/sodas')
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
