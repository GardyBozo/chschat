//Splash Screen
let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', ()=>{
    //text and background code
    logoSpan.forEach((span, idx)=>{
      setTimeout(()=>{
        span.classList.add('active');
      }, (idx+1)*400)
    });
      
    setTimeout(()=>{
        logoSpan.forEach((span, idx)=>{
          
          setTimeout(()=>{
            span.classList.remove('active');
            span.classList.add('fade');
          },(idx+1)*50)
        })
      },2000);
      
      setTimeout(()=>{
        intro.style.top = '-100vh';
      }, 2300)
})

  
  
  //Local Vars
  src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"
  src="https://unpkg.com/peerjs@1.4.7/dist/peerjs.min.js"
  var localuser = null
  var confirm = document.getElementById("confirm");
  var display = document.getElementById("display");
  var input = document.getElementById("yourCode");
  var display2 = document.getElementById("display2");
  var chatlog = document.getElementById("chatlog");
  var sendbox = document.getElementById("message");
  var vcbutton = document.getElementById("VCbutton");
  
    var remoteAudio = document.getElementById('audio1');
 
  //Connection Vars
  var peer = document.getElementById("fid");
  var connectSub = document.getElementById("connectSub");
  var isConnected = false
  var connection = null
  var vcstream = null
  var constraints = {audio: true, video: true}
  
 
  function getLocalStream() {
    navigator.mediaDevices.getUserMedia({video: false, audio: true}).then((stream) => {
        window.localStream = stream; // A
        vcstream = stream;
        window.alert("mediastream loaded")
    }).catch((err) => {
        window.alert(`you got an error: ${err}`)
    });
}
    
 
        getLocalStream();
 
 
 
 
  //Creates User ID and listens for connection------------------------------------------------------------
  confirm.onclick = function(){
    if(localuser == null && input.value != ""){
    localuser = new Peer(input.value);
    window.alert("Your user id is: " + localuser.id)
    display.value = localuser.id
    // connection listener
    localuser.on('connection', function(conn){
    connection = conn //sets connection equal to temp variable
    display2.value = connection.peer // updates display2
    connection.on('open', function(){
    window.alert("Connected!") //logs a received connection
    connection.on('data',function(data){ 
    chatlog.value += connection.peer + ": " + data + "\n"
    });
    });
    });
    localuser.on('call',function(thecall){
          window.alert("received the call")
 
        thecall.answer(vcstream);
    thecall.on('stream',function(stream){
      window.alert("!!!RECEIVER!!! stream created, received audio element")
            remoteAudio.srcObject = stream;
    });
    });
    localuser.on('error', function(err){
    window.alert(err.type);
    if(err.type == 'peer-unavailable'){
    window.alert("The peer you are trying to connect to is unavailable! Please retry.")
    }})
      
    }
    else if(localuser != null){
    window.alert("Peer already created! Your user id is: " + localuser.id) 
    }
    else{
    window.alert("Please input a code into the field on the left!") 
    }
    }
  //Connection----------------------------------------------------------------------------
  connectSub.onclick = function(){
    if(localuser != null && connection == null){
      connection = localuser.connect(peer.value)
      connection.on('open', function(){
            connection.on('data',function(data){ 
        chatlog.value += connection.peer + ": " + data + "\n"// adds chat to textbox
        chatlog.scrollTop = chatlog.scrollHeight // 
            });
        connection.send("Connection Made! " + localuser.id + " says hi!")
        chatlog.value += "Connection Made! " + localuser.id + " says hi!" + "\n"
        display2.value = connection.peer
      });
    }
      else if(connection != null){
        window.alert("You are already connected to a peer!")
      }
    else{
     window.alert("Please input a ChatApp id first!")
    }
  }
  
  // chat------------------------------ damian please fix this, it works on every key press instead enter
  function chat(event){
    if(event == null || event.keyCode == 13){
        if(localuser != null && connection != null){
        connection.send(sendbox.value)
        chatlog.value += localuser.id + ": " + sendbox.value + "\n"
        sendbox.value = ""
        chatlog.scrollTop = chatlog.scrollHeight
      }
    }
   }    
  
  vcbutton.onclick = function(){
    if(localuser != null && connection != null){
    const call = localuser.call(connection.peer, vcstream);
      alert("call sent")
     call.on('stream',(stream) => {
             alert("!!! SENDER !!! stream created, creating audio element")
            remoteAudio.srcObject = stream;
     });  
    }
    
  }
  

 
function bgC() {
   var element = document.body;
   element.classList.toggle("dark-mode");
}


