import Veggie from '../components/veggie'
import Popular from '../components/popular'
import React from 'react'
import All from '../components/All';
// import { motion } from 'framer-motion'

export default function Home({toggle}) {

  return (
    // <motion.div animate={{opacity: 1}} initial={{opacity: 0}}
    // exit={{opacity: 0}} transition={{duration: 0.5}}>
    <div>
        <Popular />
        <Veggie />
        <All toggle={toggle}/>
    </div>
        
    // </motion.div>
  )
}
