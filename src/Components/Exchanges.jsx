import React, { useEffect, useState } from 'react'
import axios from "axios"
import { server } from '../index'
import { Container, HStack, VStack, Image, Heading, Text } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from "./ErrorComponent"

function Exchanges() {

  const [exchanges, Setexchanges] = useState([])
  const [loading, Setloading] = useState(true)
  const [error, SetError] = useState(false)

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?&per_page=100`)
        Setexchanges(data);
        Setloading(false);
      } 
      catch (error) {
        SetError(true);
        Setloading(false);
      }
    }
    fetchExchanges();
  }, [])

  if (error)
    return <ErrorComponent message={"Error While Fetching Exchanges"} />;


  return (
    <Container maxW={"container.xl"}>{
      loading ? <Loader /> : (
        <div>
          <HStack wrap={"wrap"} justifyContent={"center"}>
            {
              exchanges.map((item) => (
                <ExchangeCard
                  key={item.id}
                  name={item.name}
                  img={item.image}
                  rank={item.trust_score_rank}
                  url={item.url} />
              ))
            }
          </HStack>
        </div>
      )}
    </Container>
  )
}


const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)"
        }
      }}>
      <Image src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={"1"} >{rank}</Heading>
      <Text noOfLines={"1"}>{name}</Text>
    </VStack>
  </a>
)

export default Exchanges