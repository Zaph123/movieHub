import { FaPhone, FaBriefcase } from 'react-icons/fa'
// import { motion } from 'framer-motion'
// import { ReactNode, useRef} from 'react'
// import useWiggleEffect from '../hooks/useWiggleEffect'


const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden flex mt-[50px] bg-[#0d0d0d] flex-col items-center justify-center py-[10px] px-[20px] gap-[30px]">
      {/* <img src={img1} alt="" className="absolute opacity-50 w-[400px] left-0 -z-1 top-0" /> */}
      <div className="w-full py-[10px] relative bg-transparent z-10 flex items-start justify-evenly flex-wrap gap-[20px]">
          <div className='relative w-auto flex flex-col items-center justify-start'>
               <a href="/movieHub/" className="text-[2rem] font-bold text-[#ffa32c]">movieHub</a>
              <span className='text-[.8rem] self-center my-2 text-white'>@2024 e-invest. All rights reserved.</span>
           </div>
        <div className="w-full max-w-[400px] flex flex-col items-start justify-center">
          <ul className='w-full flex items-center flex-wrap justify-evenly'> 
            <li className='text-[.9rem] my-2 text-[#c1c1c1] hover:text-[#fff]'><a href="#">About Us</a></li>
            <li className='text-[.9rem] my-2 text-[#c1c1c1] hover:text-[#fff]'><a href="#">FAQs</a></li>
            <li className='text-[.9rem] my-2 text-[#c1c1c1] hover:text-[#fff]'><a href="#">Trending</a></li>
            <li className='text-[.9rem] my-2 text-[#c1c1c1] hover:text-[#fff]'><a href="#">Movies</a></li>
            <li className='text-[.9rem] my-2 text-[#c1c1c1] hover:text-[#fff]'><a href="#">Tv</a></li>
          </ul>
          <ul className='w-full flex items-center flex-wrap justify-evenly'>
            <li className='text-[.9rem] my-2 flex-shrink-0 text-[#c1c1c1] hover:text-[#fff] flex items-center justify-start gap-[10px]'><FaPhone className='text-[#c1c1c1]'/> +234902-112-1104</li>
            <li className='text-[.9rem] my-2 text-[#c1c1c1] flex-shrink-0 hover:text-[#fff] flex items-center justify-start gap-[10px]'><FaBriefcase className='text-[#c1c1c1]'/> bassey2108@gmail.com</li>
          </ul>
        </div>

        {/* <div className="w-full max-w-[200px] flex flex-col gap-1 items-start justify-center">
          <h2 className="text-white font-bold">Company</h2>
           <ul>
            <li className='text-[.9rem] my-2 text-[#c1c1c1] hover:text-[#fff]'><a href="#">About Us</a></li>
            <li className='text-[.9rem] my-2 text-[#c1c1c1] hover:text-[#fff]'><a href="#">Contact</a></li> 
            <li className='text-[.9rem] my-2 text-[#c1c1c1] hover:text-[#fff]'><a href="#">Career</a></li>
            <li className='text-[.9rem] my-2 text-[#c1c1c1] hover:text-[#fff]'><a href="#">Blog</a></li>
          </ul>
        </div> */}


        {/* <div className="w-full max-w-[200px] flex flex-col gap-1 items-start justify-center">
          <h2 className='text-white font-bold'>Support</h2>
          <ul>
            <li className='text-[.9rem] my-2 text-[#c1c1c1] hover:text-[#fff]'><a href="#">FAQs</a></li>
            <li className='text-[.9rem] my-2 text-[#c1c1c1] hover:text-[#fff]'><a href="#">Contact</a></li>
            <li className='text-[.9rem] my-2 text-[#c1c1c1] hover:text-[#fff]'><a href="#">Features</a></li>
            <li className='text-[.9rem] my-2 text-[#c1c1c1] hover:text-[#fff]'><a href="#">Help Centers</a></li>
          </ul>
        </div> */}

        {/* <div className="w-full max-w-[200px] flex flex-col gap-1 items-start justify-center">
          <h2 className='text-white font-bold'>Contact Us</h2>
          <ul>
            <li className='text-[.9rem] my-2 text-[#c1c1c1] hover:text-[#fff] flex items-center justify-start gap-10'><FaPhone className='text-[#c1c1c1]'/> +234902-112-1104</li>
            <li className='text-[.9rem] my-2 text-[#c1c1c1] hover:text-[#fff] flex items-center justify-start gap-10'><FaBriefcase className='text-[#c1c1c1]'/> bassey2108@gmail.com</li>
          </ul>
           <ul className='flex items-center justify-start gap-[20px] w-full mt-[30px]'>
            <SocialIcons><a href="#"><FaFacebook /></a></SocialIcons>
            <SocialIcons><a href="#"><FaInstagram /></a></SocialIcons>
            <SocialIcons><a href="#"><FaWhatsapp /></a></SocialIcons>
            <SocialIcons><a href="#"><FaTwitter /></a></SocialIcons>
          </ul>
        </div> */}

      </div>
     
    </footer>
  )
}

// interface Social {
//   children: ReactNode
// }
//  const SocialIcons = ({children}: Social) => {
//   const ref = useRef<HTMLLIElement>(null)
//   const {mouseMove, mouseLeave, x, y} = useWiggleEffect(ref)

//   return (
//     <motion.li
//     ref={ref}
//     onMouseMove={mouseMove}
//     onMouseLeave={mouseLeave}
//     animate={{x, y}}
//     transition={{
//       type: "spring",
//       stiffness: 150,
//       damping: 5
//     }}
//     className='text-[1.5rem] text-[#c1c1c1]'>{children}</motion.li>
//   )
//  }
export default Footer
