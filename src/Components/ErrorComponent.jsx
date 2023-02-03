import { HStack } from '@chakra-ui/react'
import React from 'react'

function ErrorComponent({message}) {
  return (
    <HStack justifyContent={"center"} height={"80vh"} alignItems={"center"} fontFamily={"sans-serif"} fontSize={"45px"}>
      <div>
        {message}
      </div>
    </HStack>
  )
}

export default ErrorComponent