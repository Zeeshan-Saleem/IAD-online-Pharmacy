var x = document.getElementById("emaila");
var p = document.getElementById("passworda");

document.getElementById("formA").addEventListener("submit",(ee)=>{
    ee.preventDefault();
    if(x.value == "zeeshan@gmail.com" && p.value =="zeeshan" || x.value=="tahsin@gmail.com" && p.value=="tahsin"){
        swal({
            title:'Welcome..',
            text: 'Access Granted',
            type:'success',

        });
        setTimeout(()=>{
            loadPage();
        },3000);
    }
    else{
        swal({
            title:'Error',
            text: 'Access Denied',
            type:'error',

        });

    }
    function loadPage(){
        window.location.href="./admin.html";
    }
});
