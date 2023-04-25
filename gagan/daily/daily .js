function Showpremiumuser(){
  document.getElementById('rzp-button1').style.visibility="hidden";
  document.getElementById('message').innerHTML="you are premium user"
}
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
window.addEventListener("DOMContentLoaded", async() => {try{
  const token=localStorage.getItem('token')
  const decodetoken=parseJwt(token)
  ispremium=decodetoken.ispremiumuser
  if(ispremium){
    Showpremiumuser()
    Showleaderbord()
  }
    await axios.get("http://localhost:3000/expense/get",{headers:{'Authorization':token}})
      .then((response) => {
        console.log(response)
        for (var i = 0; i < response.data.allExp.length; i++) {
          showUsersOnScreen(response.data.allExp[i])
        }
      })
  
  
      .catch((error)=>{
        console.log(error);
      })
    }
    catch(error) {
      console.log(error);
    }
  
  })
  
async function formsubmit(event){
    try {
       event.preventDefault();
       var expense={
        Expenseamount: document.getElementById('Expense').value,
        discription: document.getElementById('discription').value,
        categeory: document.getElementById('list').value,
        
       }
       const token=localStorage.getItem('token')
       await axios.post("http://localhost:3000/expense/post", expense,{headers:{'Authorization':token}})
       .then((response) => {
         console.log(response)
   
         showUsersOnScreen(expense) 
         
       })
   
        
    } 
    catch (error) {
    console.log(error)    
    }
}
async function DeleteExp(expenseid) {
    try {
      const token=localStorage.getItem('token')
      await axios.delete(`http://localhost:3000/expense/deleteexp/${expenseid}`,{headers:{'Authorization':token}})
      .then((response) => {
        console.log(response)
  
        removeFromScreen(expenseid)
      })
    }
    catch (error) {
        console.log(error)
    }
}
async function removeFromScreen(expenseid) {
    try {
      var parentNode =  document.getElementById('listOfUsers');
      var childNodeToBeDeleted =  document.getElementById(expenseid);
  
      parentNode.removeChild(childNodeToBeDeleted);
  
  
    } catch (error) {
      console.log(error)
    }
  
  
  }
async function showUsersOnScreen(expense) {
    try {
      var parentNode =await document.getElementById('listOfUsers');
      var childNode = await `<li id=${expense.id}>${expense.Expenseamount}-${expense.discription}-${expense.categeory}
             <button id='${expense.id}' onclick=DeleteExp('${expense.id}')>Delete Exp</button></li>`
      parentNode.innerHTML = parentNode.innerHTML + childNode;
  
    } catch (error) {
      console.log(error)
    }
}
document.getElementById("rzp-button1").onclick=async function(e){
  const token=localStorage.getItem('token')
  const response=await axios.get("http://localhost:3000/premium/member",{headers:{'Authorization':token}})
var options={
  "key":response.data.key_id,
  "order_id":response.data.order.id,
  "handler":async function(response){
    await axios.post("http://localhost:3000/premium/updatestatus",{
    order_id:options.order_id,
    payment_id:response.razorpay_payment_id,
    },{headers:{'Authorization':token}})
    alert('you are a premium User now')
    document.getElementById('rzp-button1').style.visibility="hidden";
    document.getElementById('message').innerHTML="you are premium user";
    localStorage.setItem('token',res.data.token)
    Showleaderbord()
  },
};
const rzp1=new Razorpay(options);
rzp1.open();
e.preventDefault();
rzp1.on('payment.failed',function(response){
  console.log(response)
  alert('something went wrong')
})

}
function Showleaderbord(){
  const inputElement=document.createElement('input');
  inputElement.type="button";
  inputElement.value="SHOW";
  inputElement.onclick=async()=>{
    const token=localStorage.getItem('token')
    const userLeaderBoard=await axios.get("http://localhost:3000/premium/member",{headers:{'Authorization':token}})
    const LeaderBord=document.getElementById('leadboard')
    LeaderBord.innerHTML +='<h1> Leader Board</h1>'
    userLeaderBoard.data.forEach((userDetailes)=>{
      LeaderBord.innerHTML +=`<li>Name-${userDetailes.name} Total Expense-${userDetailes.total_cost }</li>`
    })
  }
  document.getElementById('message').appendChild(inputElement);
 
}