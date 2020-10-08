// making connection to firebase

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
// firebase.analytics();


  // products coding starts here

  var products=[]
  var cartItems=[]
  var cart_n = document.getElementById("cart_n")

  // declaring variable
  var medicineDiv = document.getElementById("medicineDiv")
  var promotionDiv = document.getElementById("promotionDiv")
  var boxDiv =document.getElementById("boxDiv")
  
  // creating objects

  var MEDICINE =[
    {name:'Delta Cotril' ,price:1},
    {name:'Lacolit' ,price:2},
    {name:'Lerace' ,price:3},
    {name:'Panadol' ,price:4},
    {name:'Eye testing' ,price:300},
    {name:'Nasal' ,price:40}
    
  ];

  var PROMO = [
    {name:'optical instruement',price:10}
  ]

  var BOX = [
    {name:'eyetest',price:10}

  ]

  // html dom
  function HTMLmedicineProduct(con){
    
    let URL =  `images/med${con}.jpg`;
    let btn = `btn MEDICINE${con}`;
    return `
    <div class="col-md-6">
    <div class="card mb-4 shadow-sm">
    <div class = "cardImg">
    <img class="card-img-top" style="height:19rem;" src="${URL}" alt="card image">
    </div>
    <div class = "card-body">
    <i style="color:orange;" class="fa fa-star-o"></i>
    <i style="color:orange;" class="fa fa-star-o"></i>
    <i style="color:orange;" class="fa fa-star-o"></i>
    <i style="color:orange;" class="fa fa-star-o"></i>
    <i style="color:orange;" class="fa fa-star-o"></i>

    <p class="card-text">${MEDICINE[con-1].name}</p>
    <p class="card-text">Price:${MEDICINE[con-1].price}.00</p>
    <div class="d-flex justify-content-between align-items-center">
      <div class="btn-group">
      <button type="button" onclick="cart2('${MEDICINE[con-1].name}',
      '${MEDICINE[con-1].price}','${URL}','$[con]','${btn}')" class="btn btn-sm btn-outline-secondary">
      <a style="color:inherit;" href = "cart.html">BUY</a>
      </button>
      <button id="${btn}" type="button" onclick="cart('${MEDICINE[con-1].name}','${MEDICINE[con-1].price}',
      '${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary"> Add to cart </button>
      </div>
      <small class="text-muted"> Free Shipping </small>
      </div>
    </div>
  </div>
</div> 

       `
  }


  function HTMLpromotionProduct(){
    let URL= `images/opticalinstruement.jpg`;
    let btn ="btnpromotion"
    return `
      <div class="row featurette">
      <div class="col-md-7 order-md-1">
      <h2 id="promotions" class="promotionheading"  style="padding-top:70px;">Promotions</h2>
      <p class= "lead">
      
      we’re excited to announce we’ve launched a new! Be the first to get it and save $20.
    </p>
    <h3 style="color:black";>$${PROMO[0].price}.00</h3>
    <button type="button" onclick="cart2('${PROMO[0].name}','${PROMO[0].price}',
    '${URL}','0','   ${btn}')" class="btn btn-sm btn-outline-secondary"> <a style="color:inherit;"
    href="cart.html">Buy
    </a>
    </button>

    <button type="button" onclick="cart('${PROMO[0].name}','${PROMO[0].price}',
    '${URL}','0','${btn}')" class="btn btn-sm btn-outline-secondary"> Add to cart
    </button>
    </div>
    <div class="col-md-5 order-md-2">
    <img src="images/optical instruement.jpg" width="300" height="400">
    </div>
    </div>

 `
  }

  function HTMLmedicineboxProduct(){
    let URL= `images/eyetest.jpg`;
    let btn ="btnBox"
    return `
      <div class="row featurette">
      <div class="col-md-7 order-md-2">
      <h2 id="BOX" class="promotionheading" style="padding-top:70px;">Trending</h2>
      <p class= "lead">
      
        Our most selling product.Purchase it from here and save $10.
    </p>
    <h3 style="color:black";>$${BOX[0].price}.00<h3>
    <button type="button" onclick="cart2('${BOX[0].name}','${BOX[0].price}',
    '${URL}','0','${btn}')" class="btn btn-sm btn-outline-secondary"> <a style="color:inherit;"
    href="cart.html">Buy
    </a>
    </button>

    <button type="button" onclick="cart('${BOX[0].name}','${BOX[0].price}',
    '${URL}','0','${btn}')" class="btn btn-sm btn-outline-secondary"> Add to cart
    </button>
    </div>
    <div class="col-md-5 order-md-1">
    <img src="images/eyetest.jpg" width="300" height="400">
    </div>
    </div>


      `
  }
  // Giving Animation
  
  function animation(){
    
    swal({
      
      text: "Added to cart",
      icon: "success",
      position:'top-left'
      
    });
    
  } ;    

  //  cart Functionss
  function cart(name,price,url,con,btncart){
      var item = {
        name:name,
        price:price,
        url:url
      }
      cartItems.push(item);
      let storage = JSON.parse(localStorage.getItem("cart"));
      if (storage==null){
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));

      }
      else{
        products=JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
      }

      products= JSON.parse(localStorage.getItem("cart"));
      cart_n.innerHTML= `[${products.length}]`;
      document.getElementById(btncart).style.display="none";
      animation();

  }


  function cart2(name,price,url,con,btncart){
    var item ={
      name:name,
        price:price,
        url:url
    }

    cartItems.push(item);
    let storage = JSON.parse(localStorage.getItem("cart"));
    if (storage == null) {
      products.push(item);
      localStorage.setItem("cart",JSON.stringify(products));
    }
    else{
      products=JSON.parse(localStorage.getItem("cart"));
      products.push(item);
      localStorage.setItem("cart",JSON.stringify(products));
    }
    products = JSON.parse(localStorage.getItem("cart"))
    cart_n.innerHTML = `[${products.length}]`;
    document.getElementById(btncart).style.display="none";
    

  }






  function render(){
for (let index = 1; index <=  6; index++) {
  
  medicineDiv.innerHTML+=`${HTMLmedicineProduct(index)}`;
  
}


promotionDiv.innerHTML += `${HTMLpromotionProduct()}`;
boxDiv.innerHTML+=`${HTMLmedicineboxProduct()}`
  if (localStorage.getItem("cart")==null) {

    
  }
else{
  products = JSON.parse(localStorage.getItem("cart"));
  cart_n.innerHTML = `[${products.length}]`;

}

  };




