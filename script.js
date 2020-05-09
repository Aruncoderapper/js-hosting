var cartShippingOption = function (){
    // main Delivery Select options
    var template = `
    <div id='hyperDeliverContainer'>
    <p class="cart-attribute__field">
        <label>Delivery Options</label><br>
        <select id="delivery-options" name="attributes[Delivery Options]">
        <option selected value="Select Option" disabled>Select Option</option>
        <option  value="Store Pickup"{% if cart.attributes["Delivery Options"] == "Store Pickup" %} selected{% endif %}>Store Pickup</option>
        <option value="Local Delivery"{% if cart.attributes["Delivery Options"] == "Local Delivery" %} selected{% endif %}>Local Delivery</option>
        <option value="Standard delivery"{% if cart.attributes["Delivery Options"] == "Standard delivery" %} selected{% endif %}>Standard delivery</option>
        </select>
    </p>
    </div>
    `;
   // Div will get created for the HyperDelivery 
    var formDiv = document.createElement("div");
    formDiv.className = "HyperDelivery"
    formDiv.innerHTML = template

   // Here we will inject inside form
   document.querySelector('form[action~="/cart"]').appendChild(formDiv)

    // Cart Attribute for the store pickup
    var storePickup = `
    <p class="cart-attribute__field">
    <label>Store Name</label><br>
    <input type="radio" name="attributes[Store Name]" value="Store Name 1"{% if cart.attributes["Store Name"] == "Store Name 1" %} checked{% endif %}> <span>Store Name 1</span><br>
    <input type="radio" name="attributes[Store Name]" value="Store Name 2"{% if cart.attributes["Store Name"] == "Store Name 2" %} checked{% endif %}> <span>Store Name 2</span><br>
    <input type="radio" name="attributes[Store Name]" value="Store Name 3"{% if cart.attributes["Store Name"] == "Store Name 3" %} checked{% endif %}> <span>Store Name 3</span><br>
   </p>
    <p class="cart-attribute__field">
    <label for="choose-pickup-date">Choose Pickup Date</label>
    <input id="choose-pickup-date" type="date" name="attributes[Choose Pickup Date]" value="">
    </p>
    <p class="cart-attribute__field">
    <label for="choose-pickup-time">Choose Pickup Time</label>
    <input id="choose-pickup-time" type="time" min="09:00" max="18:00"  name="attributes[Choose Pickup Time]" value=""> <small>Office hours are 9am to 6pm</small>
    </p
    <p class="cart-attribute__field">
    <label for="store-pick-note">Store Pick Note</label>
    <textarea id="store-pick-note" name="attributes[Store Pick Note]"></textarea>
    </p>
  `
  
    var storePickupDiv = document.createElement("div");
    storePickupDiv.id = "storePickup"
    storePickupDiv.innerHTML = storePickup

    // Cart Attribute for the Local Delivery
    var localDelivery = `
        <p class="cart-attribute__field">
        <label for="zipcode">Zipcode</label>
        <input  required class="required" id="zipcode" type="number" name="attributes[Zipcode]" value="" Placeholder="Verify your Zipcode">
        <small id="zipcode-error"></small>
       </p>
       <p class="cart-attribute__field">
        <label for="choose-delivery-date">Choose Delivery Date</label>
        <input   id="choose-delivery-date" type="date" name="attributes[Choose Delivery Date]" value="">
        </p>
    `
    var localDeliveryDiv = document.createElement("div");
    localDeliveryDiv.id = 'localDelivery'
    localDeliveryDiv.innerHTML = localDelivery
   // Normal html for standerd Option
    var standerdDelivery = `
        We will deliver You order within 3 to 5 working date
    `
    var standerdDeliveryDiv = document.createElement("div");
    standerdDeliveryDiv.id = 'standerdDelivery'
    standerdDeliveryDiv.innerHTML = standerdDelivery

    var hyperMain = document.getElementById('hyperDeliverContainer')
    


    var radios = document.querySelector('form[action~="/cart"]').elements["attributes[Delivery Options]"];

        
        radios.onchange = function() {
            var storeDiv = document.getElementById('storePickup')
            var localDiv = document.getElementById('localDelivery')
            var standerdDiv = document.getElementById('standerdDelivery')
           

            console.log(this.value);
            var deliveryType = this.value 
           if(deliveryType === 'Store Pickup'){
              console.log("I am store pickup div")
              if(localDiv ){
                hyperMain.removeChild(localDiv)
              }
              if(standerdDiv){
                hyperMain.removeChild(standerdDiv)
              }
              
              hyperMain.appendChild(storePickupDiv)
           }
           if(deliveryType === 'Local Delivery'){
            console.log("I am Local Delivery div")
            if(storeDiv){
                hyperMain.removeChild(storeDiv)
            }
             if(standerdDiv){
              hyperMain.removeChild(standerdDiv)
             }
            
             hyperMain.appendChild(localDeliveryDiv)
           }
           if(deliveryType === 'Standard delivery'){
            console.log("I am Standard delivery div")
            if(storeDiv) {
                hyperMain.removeChild(storeDiv)
            }
           if(localDiv){
            hyperMain.removeChild(localDiv)
           }
            
            hyperMain.appendChild(standerdDeliveryDiv)
           }
        }
    
    
   
    document.querySelector('body #hyperDeliverContainer').addEventListener('change', function(event) {
        if (event.target.id.toLowerCase() === 'zipcode') {
          // do your action on your Zipcode validation
          console.log(event.target.value)
          var ziperr = document.getElementById('zipcode-error')
          
          var zipval = event.target.value
          if(zipval == ''){
            //alert('your Zipcode cant be blank')
            ziperr.innerHTML = ''
            ziperr.innerHTML = "<span style='color:red'>your Zipcode cant be blank</span>"
            return false
          }
          if(zipval.length < 6){
              //alert("your Zipcode looks invalid")
              ziperr.innerHTML = ''
              ziperr.innerHTML = `<span style='color:red'>your Zipcode looks invalid  ${zipval} </span>`
              return false
          }
          if(zipval == '123456'){
            //alert("your Zipcode is Valid for Local Delivery")
            ziperr.innerHTML = ''
            ziperr.innerHTML = `<span style='color:green'> Great! Local Delivery is avaialble for ${zipval} </span>`
            return false
         }
         else{
            //alert("Local Delivery in not avaialble for", zipval )
            ziperr.innerHTML = ''
            ziperr.innerHTML = `<span style='color:red'> Zipcode ${zipval} is not avaialble for Local Delivery</span>`
         }
        }
      });
}
window.addEventListener("load", function() {
    cartShippingOption();
    if(Shopify.Checkout.step == 'thank_you'){
        // Please add your thanks you page code here
        console.log("I am on thank you page")
    }
  }, false);
