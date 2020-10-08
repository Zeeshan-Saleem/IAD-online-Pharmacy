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


//   REnder function
function renderTable(){
    var order = firebase.database().ref("order/");
    order.on("child_added",function(data){
        var orderValue = data.val();
        document.getElementById("table").innerHTML+=` 
            <tr>
                <td>${orderValue.id}</td>
                <td>${orderValue.order}</td>
                <td>${orderValue.total}</td>


             </tr>
        `;    
    });
};
