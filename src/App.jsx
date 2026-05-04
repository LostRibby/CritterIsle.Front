import { Outlet } from "react-router"; 
import { Footer } from "./layout/components/footer"; 
import { Header } from "./layout/components/header"; 

function App() {
 

  return (
    <>
<Header/>
<main>
  <Outlet/>
</main>

<Footer/>
    </>
  )
}

export default App
