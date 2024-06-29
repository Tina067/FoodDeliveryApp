import React from 'react'
import RestaurantCard from './RestaurantCard';
import { useState, useEffect } from 'react';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';


const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
   
  useEffect(()=>{
   fetchData();
  },[]);

  const fetchData = async () =>{
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.2471526&lng=78.1760576&collection=83631&tags=layout_CCS_Pizza&sortBy=&filters=&type=rcv2&offset=0&page_type=null");
    
      const json = await data.json();
      // console.log(json);
      const selectedjson = json?.data?.cards.slice(3);
      // console.log(selectedjson);
      setListOfRestaurants(selectedjson);
      setFilteredRestaurant(selectedjson);
    }

    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false){
      return (
        <h1>Looks like you're offline!! Please check your internet connection;</h1>
      )
    }

    return listOfRestaurants.length === 0 ? (
    <Shimmer/>
  ): (
      <div className="body">
        <div className="filter">
        <div className='search'>
          <input type="text" className='search-box' value={searchText} 
            onChange={(e)=>{setSearchText(e.target.value)}}
          />
          <button 
          onClick={()=> {
            console.log(searchText)
            const filteredRestaurant = listOfRestaurants.filter((res) => res.card.card.info.name.toLowerCase().includes(searchText.toLowerCase()))
            setFilteredRestaurant(filteredRestaurant);
          }}
          >Search</button>
        </div>
          <button 
          className="filter-btn" 
          onClick={()=>{
          console.log("clicked")
          const filteredList = listOfRestaurants.filter((res) => res.card.card.info.avgRating > 4);
          setListOfRestaurants(filteredList);
          }}
          > Top Rated Restaurants</button>
        </div>
        <div className="res-container">
          {filteredRestaurant.map((restaurant) => (
            <Link key={restaurant.card.card.info.id} 
            to= {"/restaurants/"+restaurant.card.card.info.id}>
            <RestaurantCard resData={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    );
    };

export default Body