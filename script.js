console.log('new script loaded ')
var cartShippingOption = function (){
    if(location.pathname !== '/cart'){
        return false
    }
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
    <input type="radio" name="attributes[Store Name]" value="NY1010" {% if cart.attributes["Store Name"] == "NY1010" %} checked{% endif %}> <span>West 143rd Street, NY city</span><br>
    <input type="radio" name="attributes[Store Name]" value="TO1010" {% if cart.attributes["Store Name"] == "TO1010" %} checked{% endif %}> <span>290 Bremner Blvd, Toronto</span><br>
    <input type="radio" name="attributes[Store Name]" value="LA2020"{% if cart.attributes["Store Name"] == "LA2020" %} checked{% endif %}> <span>200 Santa Monica Pier, Santa Monica, CA</span><br>
   </p>
    <p class="cart-attribute__field">
    <label for="choose-pickup-date">Choose Pickup Date</label>
    <input id="choose-pickup-date" type="date" name="attributes[Choose Pickup Date]" value="">
    </p>
    <p class="cart-attribute__field">
    <label for="choose-pickup-time">Choose Pickup Time</label>
    <input id="choose-pickup-time" type="time" min="09:00" max="18:00"  name="attributes[Choose Pickup Time]" value=""> <small>Store hours are 9am to 6pm</small>
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
           

            //console.log(this.value);
            var deliveryType = this.value 
           if(deliveryType === 'Store Pickup'){
              //console.log("I am store pickup div")
              if(localDiv ){
                hyperMain.removeChild(localDiv)
              }
              if(standerdDiv){
                hyperMain.removeChild(standerdDiv)
              }
              
              hyperMain.appendChild(storePickupDiv)
           }
           if(deliveryType === 'Local Delivery'){
            //console.log("I am Local Delivery div")
            if(storeDiv){
                hyperMain.removeChild(storeDiv)
            }
             if(standerdDiv){
              hyperMain.removeChild(standerdDiv)
             }
            
             hyperMain.appendChild(localDeliveryDiv)
           }
           if(deliveryType === 'Standard delivery'){
            //console.log("I am Standard delivery div")
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
          //console.log(event.target.value)
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
 cartShippingOption();
    if(Shopify.Checkout.step == 'thank_you'){
        // Please add your thanks you page code here
        console.log("I am on thank you page")
        !function(){function e(e,t){switch(e.operator){case"is":return t===e.value;case"is_not":return t!==e.value;case"starts_with":return t.startsWith(e.value);case"ends_with":return t.endsWith(e.value);case"contains":return t.indexOf(e.value)>=0;case"does_not_contain":return-1===t.indexOf(e.value);case"*":return!0;default:return!1}}function t(t){var i=location.href.substring(location.protocol.length+2);if(e(t,i))return!0;if(("is"===t.operator||"starts_with"===t.operator)&&i.startsWith("www.")&&e(t,i.substring(4)))return!0;return!1}function n(e){if(t(e))return!0;if(("is"===e.operator||"is_not"===e.operator||"ends_with"===e.operator)&&-1===e.value.indexOf("/")&&t({operator:e.operator,value:e.value+"/"}))return!0;return!1}function o(e){if(!e.conditions)return!0;if(e.hide_mobile&&l)return!1;if(e.hide_desktop&&!l)return!1;if(e.hide_for_existing_visitors&&!h)return!1;if(e.hide_for_new_visitors&&h)return!1;for(var t of e.conditions.rules)if(n(t)){if("any"===e.conditions.rule_mode)return!0}else if("all"===e.conditions.rule_mode)return!1;return"any"!==e.conditions.rule_mode}var r={is:0,starts_with:1,ends_with:2,contains:3,does_not_contain:4,is_not:5,"*":6},s=[],a=Object.keys(r).map(function(){return[]});s.push(function(){var e,t=document.querySelectorAll(".mobilemonkey-checkbox[ref='44e0d2b88529e001a2672034d1916574594163d79c3c503f3f']");if(t)for(i=0;i<t.length;i++)e="mobile-monkey_"+Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2),t[i].className="fb-messenger-checkbox",t[i].setAttribute("user_ref",e),t[i].setAttribute("origin",window.location.href),t[i].setAttribute("page_id",0x66d5513dae54),t[i].setAttribute("messenger_app_id","2015199145383303"),t[i].setAttribute("prechecked","true"),t[i].setAttribute("allow_login","true"),t[i].setAttribute("size","large"),window.confirmOptIn=function(){FB.AppEvents.logEvent("MessengerCheckboxUserConfirmation",null,{app_id:"2015199145383303",page_id:"113066377064020",ref:"44e0d2b88529e001a2672034d1916574594163d79c3c503f3f",user_ref:e})}}),function(){var e={search_token:"f7b1eaeecb12fe4316c3d432d422f1dbdc5b169fa5b6a05779",logged_in_greeting:null,logged_out_greeting:null,color:null,greeting_dialog_display:null,greeting_dialog_delay:null,hide_mobile:null,hide_desktop:null,conditions:null,greeting_dialog_display_mobile:null,hide_for_new_visitors:null,hide_for_existing_visitors:null,hide_during_off_hours:null,shape:"square",shadow:null,position:"bottom_right",disable_animation:null,wordpress:!1,no_match_response:"default_page",remote_id:"113066377064020"};if(e.conditions){var t=e.conditions.rules.map(function(e){return r[e.operator]||5});"all"===e.conditions.rule_mode?a[Math.min(...t)].push(e):t.forEach(function(t){a[t].push(e)})}else a[6].push(e)}(),window.mmAsyncInits=window.mmAsyncInits||[];var d=function(){var e=document.getElementsByTagName("script")[0];window.mmAsyncSdkInit||(window.mmAsyncSdkInit=function(){MMWebchat.initSdk({pow:"y",fb_app_id:"2015199145383303",fb_page_id:"113066377064020"})},js=document.createElement("script"),js.src="https://webchat.mobilemonkey.com/webchat-bootstrap.js",e.parentNode.insertBefore(js,e))},g=function(){d()},l=!1,c=!1;try{var u=navigator.userAgent,_={iphone:/\b(iPhone|iP[ao]d)/.test(u),ipad:/\b(iP[ao]d)/.test(u),android:/Android/i.test(u)},f=/Mobile/i.test(u);l=_.iphone||_.ipad||_.android||f,c=/MobileMonkeyChatWidgetTest/i.test(u)}catch(w){}var h=!0;try{if(!!!sessionStorage.getItem("MobileMonkeySessionActive")){sessionStorage.setItem("MobileMonkeySessionActive",1);var p=Number(localStorage.getItem("MobileMonkeyVisitCount"));0===p&&sessionStorage.setItem("MobileMonkeyNewVisitor",1),localStorage.setItem("MobileMonkeyVisitCount",p+1)}h=!!sessionStorage.getItem("MobileMonkeyNewVisitor")}catch(w){}var m=null;if(a.reduce(function(e,t){return e.concat(t)},[]).find(function(e){return!!o(e)&&(m=e,!0)}),c&&(m=null),m&&m.first)try{fetch("https://api.mobilemonkey.com/incoming_global_js_notifications",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({promoter:m.search_token})})}catch(w){}var b=function(e){if(m){var t=document.createElement("div");if(t.className="fb-customerchat",t.setAttribute("page_id",m.remote_id),t.setAttribute("ref",m.search_token),m.logged_in_greeting&&t.setAttribute("logged_in_greeting",m.logged_in_greeting),m.greeting_widget){var i=m.greeting_widget.text||m.greeting_widget.attachment&&m.greeting_widget.attachment.payload&&m.greeting_widget.attachment.payload.text;i&&t.setAttribute("logged_out_greeting",i)}else m.logged_out_greeting&&t.setAttribute("logged_out_greeting",m.logged_out_greeting);!l&&m.greeting_dialog_display&&t.setAttribute("greeting_dialog_display",m.greeting_dialog_display),l&&(m.greeting_dialog_display_mobile?t.setAttribute("greeting_dialog_display",m.greeting_dialog_display_mobile):m.wordpress&&m.greeting_dialog_display&&t.setAttribute("greeting_dialog_display",m.greeting_dialog_display)),m.greeting_dialog_delay&&t.setAttribute("greeting_dialog_delay",m.greeting_dialog_delay),m.color&&t.setAttribute("theme_color",m.color),document.body.appendChild(t),e&&FB.XFBML.parse()}},y=function(){m&&MMWebchat.bootstrap("wc_a73322213e91729c303d076f690fcb",{greeting:m.logged_out_greeting||(m.logged_out_greeting===undefined?"":"Hi! We're here to answer any questions you may have"),buttons:m.buttons||[],greetingWidget:m.greeting_widget,color:m.color,searchToken:m.search_token,greetingDialogDisplay:m.greeting_dialog_display||"show",greetingDialogDisplayMobile:m.greeting_dialog_display_mobile||"show",greetingDialogDelay:m.greeting_dialog_delay||0,shape:m.shape||"square",shadow:m.shadow||!1,position:m.position||"bottom_right",disableAnimation:m.disable_animation||!1,noMatchResponse:m.no_match_response})};window.mmAsyncInits.push(function(e){window.FB&&window.FB.CustomerChat&&e.fb?b(!0):MMWebchat.runFbLoginDetection().then(function(e){e?b(!0):y()})}),window.fbAsyncInit=function(){d(),s&&s.forEach(function(e){e()}),FB.init({appId:"2015199145383303",autoLogAppEvents:!0,xfbml:!0,version:"v4.0"})},function(e,t,i){for(var n,o=e.getElementsByTagName(t),r=o[0],s=0;s<o.length;s++){var a=o[s],d=a.getAttribute("src");if(d&&d.indexOf("connect.facebook.net")>0&&-1===d.indexOf("customerchat")){console.warn("MobileMonkey Warning \ud83d\ude4a: Customer Chat Widget may not load correctly.  The Facebook SDK installed on this page is referencing an outdated URL that does not support the required Customer Chat SDK. Please update this element to the correct URL:",a);break}}e.getElementById(i)||((n=e.createElement(t)).id=i,n.src="https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js",n.onerror=function(){try{g()}catch(w){}},r.parentNode.insertBefore(n,r))}(document,"script","facebook-jssdk")}();
    }
// window.addEventListener("load", function() {
//     console.log('window loaded')
//     cartShippingOption();
//     if(Shopify.Checkout.step == 'thank_you'){
//         // Please add your thanks you page code here
//         console.log("I am on thank you page")
//     }
//   }, false);
