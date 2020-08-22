var db = firebase.firestore();
var user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      var user = firebase.auth().currentUser;
      

      if(displayName == null){
          document.getElementById("dispName").innerHTML= "seems like you didnt set up your profile name, you can setup below";
          document.getElementById('edit').style.display = "block";
          document.getElementById("updateDispname").addEventListener("click",updateDisplayName);
      }
      if(photoURL== null){
        user.updateProfile({
            
          photoURL: "defaultDP.jpg"
        }).then(function() {
          console.log('defaultdp sucessful');
        }).catch(function(error) {
          // An error happened.
        });
      }
      else{
        document.getElementById("dispName").innerHTML= ""+ displayName;
        document.getElementById("profilepic").setAttribute("src",photoURL);
      }
      
      
      
      } else {
        //
      }
});
function logout(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
    location.replace("index.html");
}
function done(){
  document.getElementById("edit").style.display="none";
}
function edit(){
  document.getElementById("edit").style.display="block";
}
document.getElementById("updateDispname").addEventListener("click",updateDisplayName);
function updateDisplayName(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      var user = firebase.auth().currentUser;
      
      var newDname = document.getElementById("updatedisplayname").value;
      if(newDname == ""){
        alert("enter a name");
      }
      else{
        user.updateProfile({
      
          displayName: newDname
        }).then(function() {
          console.log('name change sucessful');
        }).catch(function(error) {
          // An error happened.
        });
        document.getElementById("dispName").innerHTML= ""+ newDname;
      }
      
      } else {
        //
      }
});
}