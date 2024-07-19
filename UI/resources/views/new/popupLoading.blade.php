
<style>



/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  display: flex;
  background-color: transparent;
  margin: auto;
  padding: 20px;
  color: #ffffff;
  border: none;
  width: 200px;
  text-transform: uppercase;

  font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 23px;

color: #FFFFFF;
top:30%;
}

.modal-content img  {
  width: 50px;
  height: 47.1px;
  margin: auto;
}
/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.loadingsection {
  display: flex;
  margin: auto;
}
.loadingsection span {
    margin-right:4px;
  }

  .imageRolate {
    overflow: hidden;
    transition-duration: 0.8s;
    transition-property: transform;
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
}
</style>

<button style ="display:none" id="myBtn">Open Modal</button>

<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    {{-- <span style ="display:none" class="close">&times;</span> --}}
     <img class="imageRolate" src = "/images/Spin-1s-200px.svg" >
     
  </div>

</div>


<script>
  // Get the modal
  var modal = document.getElementById("myModal");
  
  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");
  
  // Get the <span> element that closes the modal
  // var span = document.getElementsByClassName("close")[0];
  
  // // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
  }
  
  // // When the user clicks on <span> (x), close the modal
  // span.onclick = function() {
  //   modal.style.display = "none";
  // }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    // if (event.target == modal) {
    //   modal.style.display = "none";
    // }
  }
  function openPoupupLoading(open=true) 
  {
    if(open)
    {
      modal.style.display = "block";
    }
    else {
      modal.style.display = "none";
    }
   

  }
  </script>

  