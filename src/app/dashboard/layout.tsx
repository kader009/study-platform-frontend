import  { ReactNode } from 'react'
import Sidebar from './_components/SideBar'

const Dashbooardlayout = ({children} : {children: ReactNode}) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar/>
      <main className="flex-1 p-6">

      {children}
      </main>
    
    </div>
  )
}

export default Dashbooardlayout