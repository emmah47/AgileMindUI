import React from 'react';
import axios from 'axios';

function MessageDisplay() {
  debugger
  axios.get(`http://localhost:8080/greeting`)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
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

export default MessageDisplay;