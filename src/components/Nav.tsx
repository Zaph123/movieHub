import { CiSearch } from "react-icons/ci"

const Nav = () => {
  return (
    <nav className="w-full z-50 bg-[#0f0f0f] fixed h-[70px] top-0 left-0 flex items-center justify-between py-[10px] px-5">
      <div>
        <a href="/movieHub/" className="text-[2rem] font-bold text-[#158af1]">movieHub</a></div>
        <div className="flex items-center justify-center gap-2">
         <a href="/movieHub/" className="text-[1rem] text-white">Home</a>
         <a href="/movieHub/search" className="text-[1.5rem] text-white"><CiSearch/></a>
        </div>
     </nav>
  )
}
//6100C2
//7900C2
export default Nav
