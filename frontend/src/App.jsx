import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './componets/Footer'
import Navbar from './componets/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Navbar />
   <Outlet />
   <Footer/>
 
   </>
  )
}

export default App
