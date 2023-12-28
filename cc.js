const base_url =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const result = document.querySelector(".msg")

for (let select of dropdown) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);
    if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected" 
    } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected" 
    }
  }

  select.addEventListener("change", (e) => {
  updateFlag(e.target)
})
}

let updateFlag = (element)=> {
    let currCode = element.value
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = newSrc
}

btn.addEventListener("click", async(e)=>{
    e.preventDefault()
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value
    if (amountVal === "" || amountVal < 1){
        amountVal = 1;
        amount.value = 1
    }
    const URL = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL)
    let data = await response.json()
    let rate = await data[toCurr.value.toLowerCase()]
    let finalResult = amountVal * rate;
    result.innerText = `${amountVal} ${fromCurr.value} = ${finalResult} ${toCurr.value}`
    
})

 