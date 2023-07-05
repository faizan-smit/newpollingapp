import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, doc, query, orderBy, updateDoc, deleteField } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


 const firebaseConfig = {

   apiKey: "AIzaSyCPc1VMHLkbEFooYuCdxhYr_WfXYhLqDoE",
   authDomain: "pollingapp-faizan.firebaseapp.com",
   projectId: "pollingapp-faizan",
   storageBucket: "pollingapp-faizan.appspot.com",
   messagingSenderId: "444298568482",
   appId: "1:444298568482:web:54b74f8c4cbce934c03b7b",
   measurementId: "G-KKWK8QQFMD"

 };


 // Initialize Firebase

 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);






// on click function
let createPolls = async (e) => {

    e.preventDefault();

    let userPollTitle = document.getElementById('userPollTitle').value;
    let userPollContent1 = document.getElementById('userPollContent1').value;
    let userPollContent2 = document.getElementById('userPollContent2').value;
    let userPollContent3 = document.getElementById('userPollContent3').value;
    let userPollContent4 = document.getElementById('userPollContent4').value;


    try {
        const docRef = await addDoc(collection(db, "Polls"), {
          pollTitle: userPollTitle,
          pollContent1: userPollContent1,
          pollContent1Vote: 0,
          pollContent2: userPollContent2,
          pollContent2Vote: 0,
          pollContent3: userPollContent3,
          pollContent3Vote: 0,
          pollContent4: userPollContent4,
          pollContent4Vote: 0,
          createdAt: serverTimestamp(),
          
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }






}

document.getElementById("createPoll").addEventListener("click", createPolls);


document.addEventListener("readystatechange", () => {
  console.log(`readystate: ${document.readyState}`) 

 const q = query(collection(db, "Polls"), orderBy("createdAt"))
 const unsubscribe = onSnapshot(q, (querySnapshot) => {

                if (querySnapshot.size === 0) {

                    let mainPolls = document.getElementById('mainpolls');
                    mainPolls.innerHTML = `
                        <div class="poll-body">
                            <div class="poll-title">
                                <p>No Polls Yet</p>
                            </div>`
                }

                let mainPolls = document.querySelector("#mainpolls");
                mainPolls.innerHTML = '';

                querySnapshot.forEach((doc) => {

                    let mainPolls = document.querySelector("#mainpolls");

                    let data = doc.data()
                    console.log("doc.data(): ", doc.id);

                    let fistOptionResult = (data.pollContent1Vote*100)/(data.pollContent1Vote + data.pollContent2Vote + data.pollContent3Vote + data.pollContent4Vote);
                    let secondOptionResult = (data.pollContent2Vote*100)/(data.pollContent1Vote + data.pollContent2Vote + data.pollContent3Vote + data.pollContent4Vote);
                    let thirdOptionResult = (data.pollContent3Vote*100)/(data.pollContent1Vote + data.pollContent2Vote + data.pollContent3Vote + data.pollContent4Vote);
                    let fourthOptionResult = (data.pollContent4Vote*100)/(data.pollContent1Vote + data.pollContent2Vote + data.pollContent3Vote + data.pollContent4Vote);


                    if((data.pollContent1Vote + data.pollContent2Vote + data.pollContent3Vote + data.pollContent4Vote) === 0){
                      
                        fistOptionResult = 0;
                        secondOptionResult = 0;
                        thirdOptionResult = 0;
                        fourthOptionResult = 0;
                      
                    }

                    console.log(data.pollContent1Vote)


                    //display polls

                    let first_radio = document.createElement('input');
                    first_radio.type = 'radio';
                    first_radio.name = 'pollContent1';
                    first_radio.value = data.pollContent1;

                    let second_radio = document.createElement('input');
                    second_radio.type = 'radio';
                    second_radio.name = 'pollContent2';
                    second_radio.value = data.pollContent2;

                    let third_radio = document.createElement('input');
                    third_radio.value = data.pollContent3;
                    third_radio.name = 'pollContent3';
                    third_radio.type = 'radio';
                    
                    let fourth_radio = document.createElement('input');
                    fourth_radio.value = data.pollContent4;
                    fourth_radio.name = 'pollContent4';
                    fourth_radio.type = 'radio';



                    let poll_body = document.createElement('div');
                    poll_body.classList.add('poll-body');
                
                    let poll_title = document.createElement('div');
                    poll_title.classList.add('poll-title');
                
                    let poll_title_text = document.createElement('p');
                    poll_title_text.classList.add('poll-title-text');
                    poll_title_text.innerText = data.pollTitle;
                
                    let poll_content1 = document.createElement('div');
                    poll_content1.classList.add('poll-content');
                    let first_text_node = document.createTextNode(data.pollContent1 +  "     "  +  " "  + " "  +  fistOptionResult + "%" );
                
                    let poll_content2 = document.createElement('div');
                    poll_content2.classList.add('poll-content');
                    let second_text_node = document.createTextNode(data.pollContent2 +  " "  +  " "  + " "  + secondOptionResult + "%");
                
                    let poll_content3 = document.createElement('div');
                    poll_content3.classList.add('poll-content');
                    let third_text_node = document.createTextNode(data.pollContent3 +  "     "   +  " "  + " "  + thirdOptionResult + "%");
                
                    let poll_content4 = document.createElement('div');
                    poll_content4.classList.add('poll-content');
                    let fourth_text_node = document.createTextNode(data.pollContent4 +  "     "   +  " "  + " "  + fourthOptionResult + "%");

                    let submit_button = document.createElement('button');
                    submit_button.setAttribute('type', 'submit');
                    submit_button.classList.add('poll-submit-button');
                    submit_button.innerHTML = "Submit";
                    submit_button.id = doc.id;

                    
                    


                    
                
                    poll_title.appendChild(poll_title_text);
                    poll_body.appendChild(poll_title);
                    poll_content1.appendChild(first_radio)
                    poll_content1.appendChild(first_text_node);
                    poll_body.appendChild(poll_content1);
                    poll_content2.appendChild(second_radio);
                    poll_content2.appendChild(second_text_node);
                    poll_body.appendChild(poll_content2);
                    poll_content3.appendChild(third_radio);
                    poll_content3.appendChild(third_text_node);
                    poll_body.appendChild(poll_content3);
                    poll_content4.appendChild(fourth_radio);
                    poll_content4.appendChild(fourth_text_node);
                    poll_body.appendChild(poll_content4);
                    poll_body.appendChild(submit_button);
                    mainPolls.appendChild(poll_body);

                   
                    submit_button.addEventListener('click', (event)=>{

                      

                      let buttonID = event.target.id;
                      let parent_element = event.target.parentNode;
                      let all_inputs = parent_element.querySelectorAll("input[type='radio']")
                      console.log(all_inputs);
                      all_inputs.forEach(async (userSelector, forIndex) => {

                                                if(userSelector.checked){
                                                  console.log(userSelector.value, forIndex);

                                                  const cityRef = doc(db, 'Polls', buttonID);
                                                  console.log(cityRef.pollContent1Vote);

                                                  if(forIndex === 0){
                                                  const cityRef = doc(db, 'Polls', buttonID);
                                                  await updateDoc(cityRef, {
                                                    
                                                });}

                                                if(forIndex === 1){
                                                  const cityRef = doc(db, 'Polls', buttonID);
                                                  await updateDoc(cityRef, {
                                                    
                                                });}

                                                if(forIndex === 2){
                                                  const cityRef = doc(db, 'Polls', buttonID);
                                                  await updateDoc(cityRef, {
                                                    
                                                });}

                                                if(forIndex === 3){
                                                  const cityRef = doc(db, 'Polls', buttonID);
                                                  await updateDoc(cityRef, {
                                                  
                                                    
                                                });}


                    }});


                    })


                });
            });


});


document.querySelectorAll(".poll-submit-button").forEach((poll_button_select)=>{

  poll_button_select.addEventListener("click",(event) => {

  
    console.log(event);
  
  })


}
);



