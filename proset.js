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
  
      if(user != null){
      
        var email_id = user.email;
          
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
