
import React from 'react'
import Footer from '../Components/Footer'
import HeaderAdmin from '../Components/HeaderAdmin'



const AdminHome = (props) => {
  
  return (
    <div>
      <HeaderAdmin/>
      <main>{props.children} </main>
      <Footer />
    </div>
  )
}

export default AdminHome
