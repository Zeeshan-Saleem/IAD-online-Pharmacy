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
  

//   Global var
var d = new Date();
var t = d.getTime();
var counter = t;

// form coding
document.getElementById("form").addEventListener("submit",(e)=>{
     var order = document.getElementById("order").nodeValue;
     var total = document.getElementById("total").nodeValue;
     e.preventDefault();
     createOrder(order,total);
     form.reset();
});

// to create neworder
function createOrder(order,total){
    counter+=1;
    var newOrder={
        id:counter,
        order:order,
        total:total
    }
    let db =  firebase.database().ref("order/"+counter);
    db.set(newOrder);
    document.getElementById("cardSection").innerHTML='';
    readOrder();



}

// To read order
function readOrder(){
    var order = firebase.database().ref("order/");
    order.on("child_added",function(data){
        var orderValue = data.val();
        document.getElementById("cardSection").innerHTML +=`
        <div class = "card mb-3">
        <div class = "card-body">
        <h5 class="card-title">Order:${orderValue.order}</h5>
        <p class="card-text"> Total:${orderValue.total}</p>
        <button type="submit" style="color:white;" class="btn btn-warning" onclick = "updateOrder(${orderValue.id},'${orderValue.order}','${orderValue.total}')">
        <i class="fa fa-edit"></i> Edit Order </button>

        <button type="submit" class="btn btn-danger" onclick = "deleteOrder(${orderValue.id})">
        <i class="fa fa-trash-alt"></i> Delete Order </button>
        </div>
        </div>
        `;
    });

}


function reset(){
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-4 mb-4" id="form">
    <div class="form-group">
        <label > Order</label>
        <input type="text" class="form-control" id="order" placeholder="order">
    </div>
    <div class="form-group">
        <label > Total</label>
        <input type="text" class="form-control" id="total" placeholder="total">
    </div>

    <button type="submit" id="button1" class="btn btn-primary">
        <i class="fa fa-plus"></i>Add Order
    </button>

    <button style="display:none ;" class="btn btn-success" id="button2">
    </button>

    <button style="display:none ;" class="btn btn-danger" id="button3">
    </button>

</form>

    `;
    document.getElementById("form").addEventListener("submit",(e)=>{
        var order = document.getElementById("order").value;
        var total = document.getElementById("total").value;
        e.preventDefault();
        createOrder(order,total);
        form.reset();

    });
}


function updateOrder(id,order,total){
    document.getElementById("firstSection").innerHTML=`
        <form class="border p-4 mb-4" id="form2">
        <div class="form-group">
        <label > Order</label>
        <input type="text" class="form-control" id="order" placeholder="order">
    </div>
    <div class="form-group">
        <label > Total</label>
        <input type="text" class="form-control" id="total" placeholder="total">
    </div>

    <button type="submit" id="button1" class="btn btn-primary">
        <i class="fa fa-plus"></i>Add Order
    </button>

    <button  class="btn btn-success" id="button2">  Update Order
    </button>

    <button  class="btn btn-danger" id="button3"> Cancel
    </button>

</form>
    `;
    document.getElementById("form2").addEventListener("submit",(e)=>{
        e.preventDefault();
    });

    document.getElementById("button3").addEventListener("click",(e)=>{
        reset();
    });

    document.getElementById("button2").addEventListener("click",(e)=>{
        updateOrder2(id,document.getElementById("order").value,document.getElementById("total").value,);
    });
    document.getElementById("order").value=order;
    document.getElementById("total").value=total;

}


function updateOrder2(id,order,total){
    var orderUpdated={
        id:id,
        order:order,
        total:total
    }
let db = firebase.database().ref("order/"+id);
db.set(orderUpdated);
document.getElementById("cardSection").innerHTML="";
readOrder();
reset();

}


function deleteOrder(id){
     var order = firebase.database().ref("order/"+id);
     order.remove();
     reset();
     document.getElementById("cardSection").innerHTML="";
     readOrder();

}