var db = firebase.firestore();
var user = firebase.auth().currentUser;
function lgnm(){
	document.getElementById("lgnm").style.display = "none";
    document.getElementById("lgn").style.display = "block";
    document.getElementById("sgnp").style.display = "block";
    document.getElementById("sgn").style.display = "none";
    document.getElementById("sgnp").style.top ="70%";
}
console.log("working")
function sgnp(){
	document.getElementById("sgnp").style.display = "none";
    document.getElementById("sgn").style.display = "block";
    document.getElementById("lgnm").style.display = "block";
    document.getElementById("lgn").style.display = "none";
}
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
    document.getElementById("signed_in").style.display = "block";
    document.getElementById("lgnm").style.display = "none";
    document.getElementById("sgn").style.display = "none";
    document.getElementById("sgnp").style.display = "none";
    document.getElementById("lgn").style.display = "none";
      var email_id = user.email;
        document.getElementById("user_para").innerHTML = "<ul><li>Welcome " + email +"</ul>";
        console.log('you are signed in');
    }
    } else {
      document.getElementById("lgnm").style.display = "block";
      document.getElementById("sgnp").style.display = "block";
    }
  });



function signup(){
  var sgnmail = document.getElementById("email_s").value;
  var pass= document.getElementById("pass").value;
  firebase.auth().createUserWithEmailAndPassword(sgnmail, pass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert(errorMessage);
  });
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
      user.updateProfile({
        
        photoURL: "defaultDP.jpg"
      }).then(function() {
        console.log('defaultdp sucessful');
      }).catch(function(error) {
        // An error happened.
      });
  
      if(user != null){
        document.getElementById("signed_in").style.display = "block";
        document.getElementById("lgnm").style.display = "none";
        document.getElementById("sgn").style.display = "none";
        document.getElementById("sgnp").style.display = "none";
        document.getElementById("lgn").style.display = "none";
          var email_id = user.email;
            document.getElementById("user_para").innerHTML = "<h3>Welcome " + email +"</h3>";
            console.log('you are signed in');
            db.collection("users").doc(sgnmail).collection("userdata").add({
              email: sgnmail ,
              password: pass
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
        } else {
          document.getElementById("lgnm").style.display = "block";
          document.getElementById("sgnp").style.display = "block";
        }
    });
}

function login(){
  var email = document.getElementById("email").value;
  var password= document.getElementById("psw").value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert(errorMessage)
  });
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
      document.getElementById("signed_in").style.display = "block";
      document.getElementById("lgnm").style.display = "none";
      document.getElementById("sgn").style.display = "none";
      document.getElementById("sgnp").style.display = "none";
      document.getElementById("lgn").style.display = "none";
        var email_id = user.email;
          document.getElementById("user_para").innerHTML = "<ul><li>Welcome " + email +"</ul>";
          console.log('you are signed in');
      }
      } else {
        document.getElementById("lgnm").style.display = "block";
        document.getElementById("sgnp").style.display = "block";
      }
    });
  }
function logout(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
  document.getElementById("signed_in").style.display = "none";
}
var updateMind = document.getElementById("updatemind");
updateMind.addEventListener('click',addItem);
function addItem(){
  var elementP = document.createElement('p');
  var textNode = document.getElementById("mindItem").value;
  var div = document.getElementById("mindthings");

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
        if (textNode == ""){
          alert("type something");
        }
        else{
          db.collection("users").doc(email).collection("usermind").add({
            onMind : textNode,
            byEmail : email
          })
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });
          elementP.className="posts";
          div.appendChild(elementP);
          elementP.append('"'+textNode+'"      by ');
          elementP.append(email);
          div.insertBefore(elementP,div.childNodes[0]);
        }
      } else {
        // user is signed out
        
      }
    });

}
