import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import { server } from '../index'
import { Container, HStack, VStack, Image, Heading, Text, Button, RadioGroup, Radio } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from "./ErrorComponent"

function Coins() {

  const [coins, Setcoins] = useState([])
  const [loading, Setloading] = useState(true)
  const [error, SetError] = useState(false)
  const [page, Setpage] = useState(1)
  const [currency, Setcurrency] = useState("inr")

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"

  const Changepage = (page) => {
    Setpage(page);
    Setloading(true);
  }

  const btns = new Array(132).fill(1)

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
        Setcoins(data);
        Setloading(false);
      }
      catch (error) {
        SetError(true);
        Setloading(false);
      }
    }
    fetchCoins();
  }, [currency, page])

  if (error)
    return <ErrorComponent message={"Error While Fetching Coins"} />;


  return (
    <Container maxW={"container.xl"}>{
      loading ? <Loader /> : (
        <div>

          <RadioGroup value={currency} onChange={Setcurrency} p={"8"}>
            <HStack spacing={"4"} justifyContent={"center"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"eur"}>EUR</Radio>
              <Radio value={"usd"}>USD</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"center"}>
            {
              coins.map((item) => (
                <CoinsCard
                  id={item.id}
                  price={item.current_price}
                  key={item.id}
                  name={item.name}
                  img={item.image}
                  symbol={item.symbol}
                  url={item.url}
                  currencySymbol={currencySymbol}
                />
              ))
            }
          </HStack>
          <HStack width={"full"} overflowX={"auto"} p={"8"}>
            {
              btns.map((item, index) => (
                <Button bgColor={"blackAlpha.900"} color={"white"} key={index} onClick={() => Changepage(index+1)}>
                  {index + 1}
                </Button>
              ))
            }
          </HStack>
        </div>
      )}
    </Container>
  )
}


const CoinsCard = ({ id, name, img, symbol, price, url, currencySymbol = "₹" }) => (
  <Link to={`/coin/${id}`}>
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
      <Heading size={"md"} noOfLines={"1"} >{symbol}</Heading>
      <Text noOfLines={"1"}>{name}</Text>
      <Text noOfLines={"1"}>{price ? `${currencySymbol} ${price}` : "NA"}</Text>
    </VStack>
  </Link>
)

export default Coins;