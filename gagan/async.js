window.addEventListener("DOMContentLoaded", async() => {try{
  
  await axios.get("https://crudcrud.com/api/8d1572b7d4ce4589aa81bbf46ffb62cb/gun")
    .then((response) => {
      console.log(response)
      for (var i = 0; i < response.data.length; i++) {
        showUsersOnScreen(response.data[i])
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


async function formsubmit(event) {
  try {
    event.preventDefault();
    var user = await {
      Expenseamount: document.getElementById('Expense').value,
      discription: document.getElementById('discription').value,
      categeory: document.getElementById('list').value
    }
  
  
    await axios.post("https://crudcrud.com/api/8d1572b7d4ce4589aa81bbf46ffb62cb/gun", user)
    .then((response) => {
      console.log(response)
     
      showUsersOnScreen(user) 
    })
    
  } catch (error) {
    console.log(error);
  }
 


}




async function DeleteUser(userId) {
  try {
    await axios.delete(`https://crudcrud.com/api/8d1572b7d4ce4589aa81bbf46ffb62cb/gun/${userId}`)
    .then((response) => {
      console.log(response)
     
      removeFromScreen(userId)
      
    })
    
    
  } catch (error) {
    console.log(error)
  }


}



 async function removeFromScreen(userId) {
  try {
    var parentNode =  document.getElementById('listOfUsers');
    var childNodeToBeDeleted =  document.getElementById(userId);
  
    parentNode.removeChild(childNodeToBeDeleted);
  
    
  } catch (error) {
    console.log(error)
  }
 

}





 function editUserDetails(Expenseamount, discription, categeory, userId) {
  try {
    document.getElementById('Expense').value = Expenseamount;
  document.getElementById('discription').value = discription;
  document.getElementById('list').value = categeory;
  DeleteUser(userId)
    
  } catch (error) {
    console.log(error)
  }


  

}



 async function showUsersOnScreen(user) {
  try {
    var parentNode =await document.getElementById('listOfUsers');
    var childNode = await `<li id=${user._id}>${user.Expenseamount}-${user.discription}-${user.categeory}
           <button id="edit" onclick=editUserDetails('${user.Expenseamount}','${user.discription}','${user.categeory}','${user._id}')>Edit User</button>
           <button id='${user._id}' onclick=DeleteUser('${user._id}')>Delete User</button></li>`
    parentNode.innerHTML = parentNode.innerHTML + childNode;
    
  } catch (error) {
    console.log(error)
  }
   
  
 
  }



