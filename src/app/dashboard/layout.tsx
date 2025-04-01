import  { ReactNode } from 'react'
import Sidebar from './_components/SideBar'

const Dashbooardlayout = ({children} : {children: ReactNode}) => {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <main className="flex-1">

      {children}
      </main>
    
    </div>
  )
}

export default Dashbooardlayout