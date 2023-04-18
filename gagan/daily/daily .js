window.addEventListener("DOMContentLoaded", async() => {try{

    await axios.get("http://localhost:3000/expense/get")
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
        categeory: document.getElementById('list').value
       }
       await axios.post("http://localhost:3000/expense/post", expense)
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
      await axios.delete(`http://localhost:3000/expense/deleteexp/${expenseid}`)
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