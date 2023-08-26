import React, { useState } from 'react';
import axios from 'axios';

function Callback() {
  debugger
  axios.get(`http://localhost:8080/projects`)
  .then(function (response) {
    // handle success
    debugger
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    debugger
    console.log(error);
  })
  .finally(function () {
    // always executed
  });


  return (
    <div>
    Hello
    </div>
  );
}

export default Callback;