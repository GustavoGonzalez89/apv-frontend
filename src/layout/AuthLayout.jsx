import {Outlet } from 'react-router-dom'

const AuthLayour = () => {
  return (
    <>
      <main className='container mx-auto md:grid md:grid-cols-2 mt-12 gap-9 p-8 items-center'>
          <Outlet/>
      </main>
        
    </>
  )
}

export default AuthLayour