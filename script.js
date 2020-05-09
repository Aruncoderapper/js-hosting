console.log("script I am working start");
function cartShippingOption(){

  var values = ["Same day", "Next day", "Standard delivery"];

  var select = document.createElement("select");
  select.name = "attributes[Delivery time]";
  select.id = "delivery-time"

  for (const val of values) {
    var option = document.createElement("option");
    option.value = val;
    option.text = val.charAt(0).toUpperCase() + val.slice(1);
    select.appendChild(option);
  }

  var label = document.createElement("label");
  label.innerHTML = "Delivery Options: "
  label.htmlFor = "attributes[Delivery time]";
  // append the select box in form ('form[action~="/cart"]')
  document.querySelector('form[action~="/cart"]').appendChild(label).appendChild(select);
  //document.getElementsByClassName("container")[0].appendChild(label).appendChild(select);

  document.getElementById('delivery-time').onchange = function(){
    console.log(this.value);
  }

}
window.addEventListener("load", cartShippingOption, false);

//window.onload =  cartShippingOption;

  console.log("script I am working  end");

// console.log("script start");
// window.onload = function() {

//     var values = ["Same day", "Next day", "Standard delivery"];
  
//     var select = document.createElement("select");
//     select.name = "attributes[Delivery time]";
//     select.id = "delivery-time"
  
//     for (const val of values) {
//       var option = document.createElement("option");
//       option.value = val;
//       option.text = val.charAt(0).toUpperCase() + val.slice(1);
//       select.appendChild(option);
//     }
  
//     var label = document.createElement("label");
//     label.innerHTML = "Delivery Options: "
//     label.htmlFor = "attributes[Delivery time]";
//     // append the select box in form ('form[action~="/cart"]')
//     document.querySelector('form[action~="/cart"]').appendChild(label).appendChild(select);
//     //document.getElementsByClassName("container")[0].appendChild(label).appendChild(select);

//     document.getElementById('delivery-time').onchange = function(){
//       console.log(this.value);
//     }

//   }
// window.onload();
// console.log("i am stilll running");
  
