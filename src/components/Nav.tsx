import { CiSearch } from "react-icons/ci"
import { FaTimes } from "react-icons/fa"
import { CgMenuRight } from "react-icons/cg"
import { ReactNode, useState } from "react"
import { motion, AnimatePresence, useMotionValueEvent, useScroll, useTransform } from "framer-motion"

const Logo = {
  up: {
    y: "-100%"
  },
  down: {
    y: 0
  }
}
const Nav = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [hidden, setHidden] = useState<boolean>(false)
  
  const {scrollY} = useScroll()
  useMotionValueEvent(scrollY, "change", 
    latest => {
        const previous = scrollY.getPrevious() ?? 0;
        if(latest > previous && latest > 150){
            setHidden(true)
          }
          else{
            setHidden(false)
          }
          // console.log(latest);
    })

    const background = useTransform(scrollY, [0, 300], ["transparent", "#0f0f0f"])

   const NavBehaviour = {
    show: {
      y: 0,
      transition: {
        duration: .5,
        ease: "easeInOut"
      }
    },
    hide: {
      y: -100
    }
   }
  
   
  return (
    <motion.nav 
     className="w-full relative h-auto">
      <motion.div 
      variants={NavBehaviour}
      initial="hide"
      animate={hidden ? "hide" : "show"} 
      style={{background}}
      className="w-full z-50 fixed h-[70px] top-0 left-0 flex items-center justify-between py-[10px] px-5">
      <motion.div style={{opacity: toggleMenu ? "0" : "1"}} variants={Logo} initial={"down"} animate={toggleMenu ? "up" : "down"}>
        <a href="/movieHub/" className="text-[2rem] font-bold text-[#ffa32c]">movieHub</a>
      </motion.div >
      <div className="flex items-center justify-center gap-2 md:hidden">
         <a href="/movieHub/" className="text-[1rem] text-white">Home</a>
         <a href="/movieHub/" className="text-[1rem] text-white">Discover</a>
         {/* <a href="/movieHub/" className="text-[1rem] text-white">Movies</a> */}
         <a href="/movieHub/search" className="text-[1.5rem] text-white"><CiSearch/></a>
      </div>
      <div onClick={() => setToggleMenu(!toggleMenu)} className="text-white w-[25px] h-[25px] relative cursor-pointer text-[2rem] hidden md:block">
          <AnimatePresence>
          {toggleMenu ? <motion.div key='one' className="absolute left-0 top-0" initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}}><FaTimes /></motion.div>
          : <motion.div key='two' initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}}><CgMenuRight className=""/></motion.div>}
          </AnimatePresence>
        </div>
      </motion.div>
      <SideMenu toggleMenu={toggleMenu}/>
     </motion.nav>
  )
}

const variants = {
  open: {
    x: 0
  },
  close: {
    x: "-100%"
  }
}


interface ToggleMenu {
  toggleMenu: boolean
}

const SideMenu = ({toggleMenu}: ToggleMenu) => {
   return (
    <motion.div variants={variants}
    initial={"close"}
    animate={toggleMenu ? "open" : "close"}
    transition={{
      duration: .3,
      ease: "easeInOut"
    }}
    className="bg-[#0d0d0d] p-[20px] w-[80%] h-screen fixed z-50 left-0 top-0">
     <motion.div style={{opacity: toggleMenu ? "1" : "0"}} variants={Logo} initial="up" animate={toggleMenu ? "down" : "up"}>
        <a href="/movieHub/" className="text-[2rem] font-bold text-[#ffa32c]">movieHub</a>
      </motion.div>
      <div className="w-full mt-[50px] flex items-start flex-col justify-center gap-2 ">
         <Links href="/movieHub/">Home</Links>
         <Links href="/movieHub/"> Discover</Links>
         <Links href="/movieHub/">Movies</Links>
         <Links href="/movieHub/">Tv</Links>
         <Links href="/movieHub/search"><CiSearch className="text-[1.5rem]"/></Links>
      </div>
    </motion.div>
   )
}

interface Link {
  children: ReactNode
  href: string
}
const Links = ({children, href}: Link) => {
   return(
    <motion.a initial='initial' whileHover="whileHover" href={href} className="text-[1rem] text-[#b6b6b6] hover:text-white w-full hover:border-b-[1px] hover:border-b-[#cccccc] py-[10px]">
      <motion.p variants={{whileHover:{x: 10}}}>{children}</motion.p>
    </motion.a>
   )
}
//6100C2
//7900C2
export default Nav
