import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import btcSrc from "../Assets/btc.png"
import { motion } from "framer-motion"

function Home() {
  return (
    <Box w={"full"} h={"85vh"}>
      <motion.div style={{
        height:"80vh",
      }}
      animate={{
        translateY:"20px"
      }}

      transition={{
        duration:"1.5",
        repeatType:"reverse",
        repeat:Infinity
      }}
      >
        <Image w={"full"} h={"full"} objectFit={"contain"} src={btcSrc} filter={"grayscale(1)"}></Image>
      </motion.div>

      <Text fontSize={"6xl"} fontFamily={"sans-serif"} textAlign={"center"} fontWeight={"thin"} my={"-40px"} >
        Crypto info
      </Text>
    </Box>
  )
}

export default Home