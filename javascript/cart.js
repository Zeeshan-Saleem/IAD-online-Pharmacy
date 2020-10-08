// making connection to firebase

// Your web app's Firebase configuration

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCq_EuyhOCMSdokwnQyvuj2oXZ_NpkndbA",
    authDomain: "online-pharmacy-iad-435df.firebaseapp.com",
    databaseURL: "https://online-pharmacy-iad-435df.firebaseio.com",
    projectId: "online-pharmacy-iad-435df",
    storageBucket: "online-pharmacy-iad-435df.appspot.com",
    messagingSenderId: "966575739766",
    appId: "1:966575739766:web:279e0a5db198ec7d632057",
    measurementId: "G-T9Q77GSTXT"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();



//   Global variables
var products = JSON.parse(localStorage.getItem('cart'));
var cartItems= [];
var cart_n=document.getElementById('cart_n');
var table = document.getElementById('table');
var total = 0

// Html dom


function tableHtml(i){
    return `
        <tr>
        <th scope="row" >${i+1}</th>
        <td><img style="width:90px;" src = "${products[i].url}"></td>
        <td>${products[i].name}</td>
        <td>1</td>
        <td>${products[i].price}</td>
        </tr>`;

}


// buy coding
function buy(){
    var d =new Date();
    var t = d.getTime();
    var counter = t;
    counter+=1;
    let db = firebase.database().ref("order/"+counter);
    let itemdb = {
        id:counter,
        order:counter-895,
        total:total
    }
    db.set(itemdb);
    swal({
        position:'center',
        type:'success',
        title:'Purchase made successfully',
        text: `Your purchase order is : ${itemdb.order}`,
        showConfirmButton: false ,
        timer: 5000
        
    });
   clean();
    
}
function clean(){
    localStorage.clear();
    for (let index = 0; index < products.length; index++) {
        table.innerHTML+=tableHtml(index);
        total = total+parseInt(products[index].price)
        
    }
    total=0;
    table.innerHTML=`
        <tr>
        <th></th>
        <th></th>
        <th></th>
        </tr>
    
    `;
    
    cart_n,innerHTML='';
    document.getElementById("btnBuy").style.display="none";
    document.getElementById("btnClean").style.display="none";

}



// For render

function render(){
    for (let index = 0; index < products.length; index++) {
        table.innerHTML+=tableHtml(index);
        total = total+parseInt(products[index].price);

        
    }

    table.innerHTML +=`
    <tr>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col">Total : $${total}.00</th>
    </tr>
    <tr>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col">
    <button id="btnClean" onclick="clean()" class = "btn text-white btn-warning">
     Clean Shopping Cart
    </button>
    </th>

    <th scope = "col">
    <button id = "btnBuy" onclick="buy()" class="btn btn-success"> 
    Buy
    </button> 
    </th>
    </tr>
    `;
    products=JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML=`[${products.length}]`;

}
