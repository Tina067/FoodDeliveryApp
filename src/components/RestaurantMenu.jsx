import React from 'react';
import {useState, useEffect } from 'react';
import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import { MENU_API } from '../utils/constants';


const RestaurantMenu = () => {
    const [resInfo, setRestInfo] = useState(null);

    const {resId} = useParams();
    console.log(resId);

   useEffect(()=>{
    fetchMenu()
   },[]);

    async function fetchMenu() {
        const data = await fetch(MENU_API + resId);
        const json = await data.json();
        setRestInfo(json.data);
    }
     if(resInfo === null) return <Shimmer />;

    // console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards);
    const {name, cuisines, costForTwoMessage} = resInfo?.cards[2]?.card?.card?.info;
    const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

   return(
    <div className="menu">
    <h1>{name}</h1>
    <p>{cuisines.join(", ")} - {costForTwoMessage}</p>
    <h2>Menu</h2>
    <ul>
        {itemCards.map(item => 
        <li key={item?.card?.info?.id}>{item?.card?.info?.name} - Rs.{item?.card?.info?.price/100}
        </li>)}
    </ul>
   </div>
   )
}

export default RestaurantMenu;