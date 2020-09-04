var db = firebase.firestore();
var user = firebase.auth().currentUser;
var uid;
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
      console.log(photoURL);

      if(displayName == null){
          document.getElementById("dispName").innerHTML= "seems like you didnt set up your profile name, you can setup below";
          document.getElementById('edit').style.display = "block";
          document.getElementById("updateDispname").addEventListener("click",updateDisplayName);
      }
      if(photoURL== null){
        alert("seems like you didnt set up your profile pic, you can setup below");
        document.getElementById('edit').style.display = "block";
        
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
        alert("Display name changed");
      }
      
      } else {
        //
      }
});
}


  var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
fileButton.addEventListener('change', function(e){
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
    var file = e.target.files[0];
    file.name = uid+".jpg";
    var storageRef = firebase.storage().ref('img/'+uid+'/'+file.name);
    var task = storageRef.put(file);
  task.on('state_changed', function(snapshot){
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
  uploader.value = percentage;
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: 
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: 
        console.log('Upload is running');
        break;
    }
  }, function(error) {
     errorMsg = error.message;
     console.log(errorMsg);
  }, function() {
    task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
      user.updateProfile({
        photoURL:downloadURL
      }).then(function() {
        alert(' change sucessful');
        document.getElementById("profilepic").src = downloadURL;
      }).catch(function(error) {
        errorMsg = error.message;
        console.log(errorMsg);
      });
      
    }).catch(function(error) {
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;
    
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
    
        case 'storage/canceled':
          // User canceled the upload
          break;
        case 'storage/unknown':
          
          break;
      }
    });
    
  }); } else {
    //
  }
});
});

























/*
<!DOCTYPE html>
<html>
<head>
	<title>Firebase Web Basics</title>

	<link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,700" rel="stylesheet">

	<script src="https://use.fontawesome.com/939e9dd52c.js"></script>

	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>

	<div class="mainDiv" align="right">
		<h1 align="left">Firebase File Upload</h1>
		<progress id="uploader" value="0" max="100">0%</progress>
		<input type="file" id="fileButton" value="upload"/>
	</div>



<script src="https://www.gstatic.com/firebasejs/3.7.4/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "******************************",
    authDomain: "******************************",
    databaseURL: "******************************",
    storageBucket: "******************************",
    messagingSenderId: "******************************"
  };
  firebase.initializeApp(config);
  //-------------------------------------
  
  var uploader = document.getElementById('uploader');
  var fileButton = document.getElementById('fileButton');
  fileButton.addEventListener('change', function(e){
  var file = e.target.files[0];
  var storageRef = firebase.storage().ref('img/'+file.name);
  var task = storageRef.put(file);
  task.on('state_changed', function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    uploader.value = percentage;

  }, function error(err) {


  },function complete() {

  });
});  
  
  
</script>

<script src="fileup.js">
</script>
</body>
</html>




const fileButton = document.querySelector('#fileButton');
var imageURL;

fileButton.addEventListener('change', function(e) {
    //get file 
    var file = e.target.files[0];
    //create a storage reference
    var storageRef = storage.ref('profilePictures/' + userUID + '.jpg');
    //upload file
    var task = storageRef.put(file);
    //update progress bar
    task.on('state_changed',
        function progress(snapshot){

        },
        function error(err) {

        },
        function complete(){
            storageRef.getDownloadURL().then(function(url) {
                console.log(url);
                imageURL = url;
            })
            .catch(function(error) {
                // Handle any errors
                console.log(error);
            });
            // window.location.replace('/profile');
            var user = auth.currentUser;
            user.updateProfile({
                photoURL: imageURL
            })
            .then(function() {
                // Update successful.
                console.log(user);
            })
            .catch(function(error) {
                // An error happened.
                console.log(error);
            });
        }
    );
});*/
