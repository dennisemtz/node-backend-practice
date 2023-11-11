document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const userName = document.querySelector("#userName").value;//grabbing value from the input box
  const res = await fetch(`/api?student=${userName}`)//hitting an api that we are constructing on the server
  const data = await res.json()//data from the fetch

  console.log(data);
  //writing data from the fetch to the dom
  document.querySelector("#personName").textContent = data.name
  document.querySelector("#personStatus").textContent = data.status
  document.querySelector("#personOccupation").textContent = data.currentOccupation
}