import React, { useReducer } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const locationInitState = {
  lonlat : {
      longitude : null,
      latitude : null,
  },
  csc : {
    country : null,
    state : null,
    city : null
  },
  flag : ''
};

const locationReducer = (state, action) => {
  switch(action.type){
    case 'LONLAT_HANDLER' : {
      return {
        lonlat : {
          longitude: action.lonlat.longitude,
          latitude: action.lonlat.latitude
        },
        csc : {...state.csc}
      }
    }
    break;

    case 'CSC_HANDLER' : {
      return {
        lonlat: {...state.lonlat},
        csc: {
          country: action.csc.country,
          state: action.csc.state,
          city: action.csc.city
        }
      }
    }
    break;

    case 'FLAG_HANDLER' : {
      return {
        lonlat: {...state.lonlat},
        csc: {...state.csc},
        flag: action.flag 
      }
    }
    default : 
    return locationInitState;

  } 
}

const LocationContext = React.createContext({
    lonlat : {
        longitude : null,
        latitude : null,
    },
    csc : {
      country : null,
      state : null,
      city : null
    },
    flag: '',
    flagHandler : () => {},
    changeLonlat : (lonlat) => {},
    changeCsc : (csc) => {}
});




export const LocationContextProvider = (props) => {

    const [locationState, dispatchLocationAction] = useReducer(locationReducer, locationInitState);

    const changeLonlat = (lonlat) => {
      dispatchLocationAction({
        type : 'LONLAT_HANDLER',
        lonlat
      })
    }

    const changeCsc = (csc) => {
      dispatchLocationAction({
        type : 'CSC_HANDLER',
        csc
      })
    }

    const flagHandler = (flag) => {
      dispatchLocationAction({
        type : 'FLAG_HANDLER',
        flag
      })
    }

    useEffect(() => {
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position => {
          changeLonlat({
            longitude : position.coords.longitude,
            latitude : position.coords.latitude
          });
           findCityAndCountryNamesBasedOnLocation(position.coords.latitude, position.coords.longitude);

        }))
      }
    }, []);


    function findCityAndCountryNamesBasedOnLocation(latitude,longitude){
      return axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=8970391d0b6c440db05cccfde2c25424`)
      .then (res => {
        changeCsc({
          country : res.data.results[0].country,
          state : res.data.results[0].state,
          city : res.data.results[0].city
        });
        
          axios.get(`https://itravel-yymm.herokuapp.com/countries/getGeneralInformations/${res.data.results[0].country}`)
                .then (result => {
                  flagHandler(result.data.flag);
                })
                .catch (err => {  
                })
      
        

      })
  }
    

    const contextValue = {
      lonlat : locationState.lonlat,
      csc : locationState.csc,
      changeCsc,
      changeLonlat,
      flag : locationState.flag,
      flagHandler
    }
    return (
        <LocationContext.Provider value={contextValue}>
            {props.children}
        </LocationContext.Provider>
    )
}

export default LocationContext;