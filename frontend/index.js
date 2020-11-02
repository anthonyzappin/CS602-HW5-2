"use strict";

const readButton = document.getElementById('readButton')
const readLayer = document.getElementById('readLayer')
const add = document.getElementById('addButton')
const search = document.getElementById('searchButton')
const deleted = document.getElementById('deleteButton')

const addPanel = document.getElementById('addPanel')
const deletePanel = document.getElementById('deletePanel')

const submit = document.getElementById('submit')
const deleteButton = document.getElementById('deleteButton')
const deleteSubmit = document.getElementById('deleteSubmit')
const deleteInput = document.getElementById('deleteInput')
const searchInput = document.getElementById('searchInput')
const boroughInput = document.getElementById('boroughInput')
const searchSubmit = document.getElementById('searchSubmit')
const boroughSubmit = document.getElementById('boroughSubmit')

const searchGrid = document.getElementById('searchGrid')
let searchGridP = document.createElement('p');

const searchResultList = document.getElementById('searchResultList')
const li = {}
if(searchResultList) {
    li = searchResultList.getElementsByTagName('li');
}

let deleteFullInputValue = ""

let create = {}

function mapToJson(map) {
    return JSON.stringify([...map]);
}

let response = {'foo': 'bar'}
let jsonResult = {}

const config = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

const makeRequest = async () => {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    }

  response = await fetch('https://us-central1-cs602-hw5.cloudfunctions.net/read', config);
  jsonResult = await response.json();
  console.log("read data was " + JSON.stringify(jsonResult));
  console.log('restaurant request attempt made');
}

const submitRequest = async () => {
     create = {
        "name"  :  document.getElementById('name').value,
        "building"  :  document.getElementById('building').value,
        "coordinate"  :  document.getElementById('coordinate').value,
        "street"  : document.getElementById('street').value,
        "zip"  :  document.getElementById('zip').value,
        "borough"  :  document.getElementById('borough').value,
        "cuisine"  :  document.getElementById('cuisine').value,
        "grade"  :  document.getElementById('grade').value,
      }
    const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(create)
    }

  console.log("form object is " + JSON.stringify(create));
  const response = await fetch('https://us-central1-cs602-hw5.cloudfunctions.net/create', config);
  jsonResult = await response.json();
  console.log("create response is " + JSON.stringify(jsonResult));
  console.log('made the request to the create API');
}

const deleteRequest = async () => {
   const config = {
       method: 'GET',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
   }

 const response = await fetch('https://us-central1-cs602-hw5.cloudfunctions.net/deleteById?restaurantId=' + deleteInput.value, config);
 jsonResult = await response.json();
 console.log("delete response is " + JSON.stringify(jsonResult));
 console.log('made the request to the delete API');
}

const searchRequest = async () => {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
 
  const response = await fetch('https://us-central1-cs602-hw5.cloudfunctions.net/getByName?name=' + searchInput.value, config);
  jsonResult = await response.json();
  console.log("search response is " + JSON.stringify(jsonResult));
  console.log('made the request to the search API');
 }

 const boroughRequest = async () => {
    const config = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
 
  const response = await fetch('https://us-central1-cs602-hw5.cloudfunctions.net/getByBorough?borough=' + boroughInput.value, config);
  jsonResult = await response.json();
  console.log("borough search response is " + JSON.stringify(jsonResult));
  console.log('made the borough request to the search API');
 }

 function confirmDelete() {
    let x = confirm("Are you sure you want to delete?");
        if (x) {
            console.log("deleting data")
            deleteRequest()
            deleteInput.value = ""
        }
}

window.addEventListener('DOMContentLoaded', (event) => {
    
    search.addEventListener('click', event => {
        searchPanel.classList.toggle('hidden');
     })
    
     deleted.addEventListener('click', event => {
        deletePanel.classList.toggle('hidden');
     })
    
    add.addEventListener('click', event => {
        addPanel.classList.toggle('hidden');
     })
    
     submit.addEventListener('click', event => {
        console.log("adding data")
        submitRequest()
    })

    if(jsonResult) {
        searchSubmit.addEventListener('click', event => {
            console.log("searching data")
            searchRequest()
            readLayer.innerText = JSON.stringify(jsonResult)
            searchInput.value = ""
            readLayer.classList.toggle('hidden');
        })
    
        boroughSubmit.addEventListener('click', event => {
            console.log("searching boroughs data")
            boroughRequest()
            readLayer.innerText = JSON.stringify(jsonResult)
            boroughInput.value = ""
        })
    }
});


  
  
  


