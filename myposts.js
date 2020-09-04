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
//var linkmyposts = document.getElementById("mindposts");
//linkmyposts.addEventListener('click',getmyposts);

  console.log('works');

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
          // ...
          
          db.collection("users").doc(email).collection("usermind").get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
              console.log(doc.id);
              
                let hr = document.createElement("hr");
                
                let lion = document.createElement('li');
                let tiger = document.createTextNode(doc.data().onMind);
                let fortiger = document.createElement("H3");
                let tigress = document.createTextNode( doc.data().byEmail);
                let fortigeress = document.createElement("H5");
                let deletebtn = document.createTextNode("delete");
                let fordeletebtn = document.createElement("button");
                fordeletebtn.value = doc.id;
                lion.setAttribute("class","forlion");
                fordeletebtn.setAttribute("class","delbtn");
                
                fortiger.append(tiger);
                fortigeress.append(tigress);
                fordeletebtn.append(deletebtn);
                lion.appendChild(hr);
                lion.appendChild(fortiger);
                lion.appendChild(fortigeress);
                lion.appendChild(fordeletebtn);
                lion.appendChild(hr);
                lion.appendChild(document.createElement('br'));
                docID = doc.id;
                lion.setAttribute("id",docID);
                document.getElementById("mindposts").appendChild(lion);
                fordeletebtn.addEventListener("click",deletepost,fordeletebtn);

            });
          });
        } 
        else {
          // User is signed out.
          // ...
        }
  });
  function deletepost(e){
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
        var docRef = db.collection("users").doc(email).collection("usermind");


        var docID = e.path[0].value;
        docRef.doc(docID).delete().then(() => {
          console.log('Document deleted');
          let elem = document.getElementById(docID);
          elem.parentNode.removeChild(elem);

        }).catch( error => {
          console.error("Error removing: ", error);
        });
      } else {
        //
      }
});
}     
        


