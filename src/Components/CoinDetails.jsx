import { Container, RadioGroup, HStack, Radio, VStack, Text, Box, Image, StatLabel, StatNumber, Stat, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { server } from '../index'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import Chart from './Chart'

function CoinDetails() {
  const params = useParams()
  const [coin, Setcoin] = useState({})
  const [loading, Setloading] = useState(true)
  const [error, SetError] = useState(false)
  const [currency, Setcurrency] = useState("inr")
  const [days, Setdays] = useState("24h")
  const [ChartArray, SetChartArray] = useState([])

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"

  const btns = ["24h","7d","14d","30d","60d","200d","365d","max"]

  const switchChartStat = (val) => {
    switch (val) {
      case "24h":
        Setdays("24h")
        Setloading(true)
        break;

      case "7d":
        Setdays("7d")
        Setloading(true)
        break;

      case "14d":
        Setdays("14d")
        Setloading(true)
        break;

      case "30d":
        Setdays("30d")
        Setloading(true)
        break;

      case "60d":
        Setdays("60d")
        Setloading(true)
        break;

      case "200d":
        Setdays("200d")
        Setloading(true)
        break;

      case "365d":
        Setdays("365d")
        Setloading(true)
        break;

      case "max":
        Setdays("max")
        Setloading(true)
        break;

      default:
        Setdays("24h")
        Setloading(true)
        break;
    }
  }

  

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`)
        const { data:chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
        
        Setcoin(data);
        SetChartArray(chartData.prices)
        Setloading(false);
      }
      catch (error) {
        SetError(true);
        Setloading(false);
      }
    }
    fetchCoin();
  }, [params.id,currency,days])

  if (error)
    return <ErrorComponent message={"Error While Fetching Coins"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? <Loader /> : (
        <>
          <Box width={"full"} borderWidth={1}>
            <Chart currency={currencySymbol} arr={ChartArray} days={days}/>
          </Box>

          <HStack p={"4"} overflowX={"auto"}>
            {
              btns.map((item,i) => (
                <Button key={i} onClick={()=>switchChartStat(item)}>{item}</Button>
              ))
            }
          </HStack>




          <RadioGroup value={currency} onChange={Setcurrency} p={"8"}>
            <HStack spacing={"4"} justifyContent={"center"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"eur"}>EUR</Radio>
              <Radio value={"usd"}>USD</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} alignItems="flex-start" p={"16"}>
            <Text fontSize={"small"} alignSelf="center" opacity={"0.7"}>
              Last Updated On {" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image src={coin.image.large} width={"16"} h={"16"} objectFit={"contain"}></Image>

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color={"white"}>
              {`#${coin.market_cap_rank}`}
            </Badge>

            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />

            <Box width={"full"} p={4}>
              <Item title={"Max Supply"} value={coin.market_data.max_supply}/>
              <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply}/>
              <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>
              <Item title={"All Time low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
              <Item title={"All Time low"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>
            </Box>
          </VStack>
        </>
      )}
    </Container>
  )
}

const Item = ({title,value}) => (
  <HStack justifyContent={"space-between"} width={"full"} my={"4"} fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
    <Text>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)

const CustomBar = ({ high, low }) => (
  <VStack width={"full"} >
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"red"} />
    </HStack>
  </VStack>
)

export default CoinDetails