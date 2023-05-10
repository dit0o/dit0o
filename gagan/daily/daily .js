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
  const currentPage=1;
    const token=localStorage.getItem('token')
  const decodetoken=parseJwt(token)
  ispremium=decodetoken.ispremiumuser
  if(ispremium){
    Showpremiumuser()
    Showleaderbord()
  }
    await axios.get(`http://localhost:3000/expense/get/${currentPage}`,{headers:{'Authorization':token}})
      .then((response) => {
        console.log(response)
        for (var i = 0; i < response.data.allExp.length; i++) {
          showUsersOnScreen(response.data.allExp[i])
          showPagination(response.data.info)
          
        }
      })
  
    }
    catch(error) {
      console.log(error);
    }
  
  })
  function showPagination({currentPage,hasNextPage,hasPreviousPage,nextPage,previousPage,lastPage}){
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    if(hasPreviousPage){
        const btn2 = document.createElement('button');
        btn2.innerHTML = previousPage ;
        btn2.addEventListener('click' , ()=>getPageExpenses(previousPage));
        pagination.appendChild(btn2);
    }

    const btn1 = document.createElement('button');
    btn1.innerHTML = currentPage ;
    btn1.addEventListener('click' , ()=>getPageExpenses(currentPage));
    pagination.appendChild(btn1);

    if(hasNextPage){
        const button3 = document.createElement('button');
        button3.innerHTML = nextPage ;
        button3.addEventListener('click' , ()=>getPageExpenses(nextPage));
        pagination.appendChild(button3);
    }

    if( currentPage!=lastPage && nextPage!=lastPage && lastPage != 0){
        const button3 = document.createElement('button');
        button3.innerHTML = lastPage ;
        button3.addEventListener('click' , ()=>getPageExpenses(page));
        pagination.appendChild(button3);
    }
}
async function getPageExpenses(page){
  currentPage=page;
  const lii=document.getElementById('listOfUsers')
  const token = localStorage.getItem('token');
  await axios.get(`http://localhost:3000/expense/get/${page}`,{headers:{'Authorization':token}})
  .then((response) => {
    console.log(response)
    lii.innerHTML=''
    for (var i = 0; i < response.data.allExp.length; i++) {
      showUsersOnScreen(response.data.allExp[i])
      showPagination(response.data.info)
    }
  })

}
  
async function formsubmit(event){
    try {
       event.preventDefault();
       var expense={
        Expenseamount: document.getElementById('Expense').value,
        discription: document.getElementById('discription').value,
        categeory: document.getElementById('list').value,
        
       }
       const token=localStorage.getItem('token')
       await axios.post("http://localhost:3000/expense/post",expense,{headers:{'Authorization':token}})
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
      var childNode = `<li id=${expense.id}>${expense.Expenseamount}-${expense.discription}-${expense.categeory}
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
  try {
    const inputElement=document.createElement("input");
    inputElement.type="button";
    inputElement.value="Show";
    inputElement.onclick=async()=>{
      const token=localStorage.getItem('token')
      const userLeaderBoard=await axios.get("http://localhost:3000/pre/showfeatures",{headers:{'Authorization':token}})
      const LeaderBord=document.getElementById('leadboard')
      LeaderBord.innerHTML =LeaderBord.innerHTML+'<h1> Leader Board</h1>'
      userLeaderBoard.data.forEach((userDetails)=>{
        LeaderBord.innerHTML +=`<li>Name-${userDetails.Name} Total Expense-${userDetails.totalExpense }</li>`
      })
    }
    document.getElementById('message').appendChild(inputElement);
   
  
    
  } catch (error) {
    console.log(error);
  }
}
async function download(){
  try {
    const token=localStorage.getItem('token')
    await axios.get('http://localhost:3000/expense/download', { headers: {"Authorization" : token} })
    if(response.status=== 200){
      var a = document.createElement("a");
            a.href = response.data.fileURL;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }
    }
   catch (error) {
    console.log(error)
  }
}