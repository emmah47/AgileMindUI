import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import axios from 'axios';

function Callback() {
  const location = useLocation()
  const accessToken = new URLSearchParams(location.search).get("token")
  const url = `/projects`
  debugger;
  let response = axios.create({
    baseURL: "http://localhost:8080"
  }).get(url, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })
  console.log(response)

  // const location = useLocation()
  // debugger;
  // useEffect(() => {
  //   const accessToken = extractUrlParameter('token')
  //   if (accessToken) {
  //     handleLogin(accessToken)
  //     const redirect = '/'
  //     setRedirectTo(redirect)
  //   }
  // }, [])


}


export default Callback;