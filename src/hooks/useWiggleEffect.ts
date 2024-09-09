 import { useState } from "react"
 import React from "react"


   const useWiggleEffect = (ref: React.RefObject<HTMLLIElement>) => {
    const [pos, setPos] = useState({x: 0, y: 0})

    const mouseMove = (e: React.MouseEvent) => {
        const {clientX, clientY} = e
        if(ref.current){
        const rect = ref?.current.getBoundingClientRect()
        const { width, height, top, left } = rect
        const x = clientX - (left + width / 2 )
        const y = clientY - (top + height / 2 )
        setPos({x,y})
      }
      }

    const mouseLeave = () => {
        setPos({x: 0, y: 0})
      }

      const { x, y } = pos

     return {mouseMove, mouseLeave, x, y}
}

export default useWiggleEffect
