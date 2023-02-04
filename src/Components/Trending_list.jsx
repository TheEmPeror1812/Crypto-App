import { Img, Stack, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { server } from '../index';
import ErrorComponent from './ErrorComponent';
import Loader from './Loader';


function Trendinglist() {

    const [trendingCoins, SettrendingCoins] = useState([])
    const [error, SetError] = useState(false)
    const [loading, Setloading] = useState(true)

    useEffect(() => {
        const fetch_trending_list = async () => {
            try {
                const { data } = await axios.get(`${server}/search/trending`)
                console.log(data.coins)
                SettrendingCoins(data.coins);
                Setloading(false);
            }
            catch (error) {
                SetError(true);
                Setloading(false);
            }
        }
        fetch_trending_list();
    }, [])

    if (error)
        return <ErrorComponent message={"Error While Fetching Exchanges"} />;

    return (
        <div>
            {
                loading ? <Loader /> : (
                    <VStack>
                        {
                            trendingCoins.map((i) => (
                                <Card
                                    name={i.item.name}
                                    symbol={i.item.symbol}
                                    rank={i.item.market_cap_rank}
                                    imgSrc={i.item.large}
                                    key={i.item.id}
                                    score={i.item.score}
                                />
                            ))
                        }
                    </VStack>
                )
            }
        </div>
    )
}

export default Trendinglist;


const Card = ({ name, symbol, rank, imgSrc, score }) => (
    <Stack justifyContent={"centre"} alignItems={'center'} width={"80%"}>
        <VStack bgColor={"gray.100"} borderRadius={"20px"} my={"10px"} w={"80%"} color={"black"} >
            <Stack justifyContent={"space-between"} w={"80%"} direction={["column", "row"]}>
                <Img src={imgSrc} alt={"Icon"} h={"89px"} py={"10px"} alignSelf={"center"} w={"65px"}></Img>
                <VStack alignSelf={"center"}>
                    <h2>Symbol = {symbol}</h2>
                    <h1>Name = {name}</h1>
                </VStack>
                <VStack alignSelf={"center"}>
                    <h1>Rank :- {rank}</h1>
                    <h1>Score :- {score}</h1>
                </VStack>
            </Stack>
        </VStack>
    </Stack>
)