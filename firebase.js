// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwn7DocnYHOVSDEzCa_8QQX1I9ROm91y0",
  authDomain: "eat-discounts.firebaseapp.com",
  projectId: "eat-discounts",
  storageBucket: "eat-discounts.appspot.com",
  messagingSenderId: "744510669902",
  appId: "1:744510669902:web:3f29888656a3b8562a6f1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


console.log(firebase);

chrome.runtime.onMessage.addListener((msg, sender, response) => {

    if(msg.command == "fetch"){
      var domain = msg.data.domain;
      var enc_domain = btoa(domain);
      firebase.database().ref('/domain/'+enc_domain).once('value').then(function(snapshot){
        response({type: "result", status: "success", data: snapshot.val(), request: msg});
      });
  
    }
  
    //submit coupon data..
    if(msg.command == "post"){
  
      var domain = msg.data.domain;
      var enc_domain = btoa(domain);
      var code = msg.data.code;
      var desc = msg.data.desc;
  
      try{
  
        var newPost = firebase.database().ref('/domain/'+enc_domain).push().set({
          code: code,
          description: desc
        });
  
        var postId = newPost.key;
        response({type: "result", status: "success", data: postId, request: msg});
  
      }catch(e){
        console.log("error:", e);
        response({type: "result", status: "error", data: e, request: msg});
  
      }
    }
  
    return true;
  
  
  })
