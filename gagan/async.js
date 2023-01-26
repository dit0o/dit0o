window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/250718b1a32d4b28ab8dd2f71fe8be58/gun")
      .then((response) => {
        console.log(response)
        for (var i = 0; i < response.data.length; i++) {
          showUsersOnScreen(response.data[i])
        }
      })
      .catch((error) => {
        console.log(error);
      })
    })
    
     function formsubmit(event){
  
    
      event.preventDefault();
      var user = {
        Expenseamount: document.getElementById('Expense').value,
        discription: document.getElementById('discription').value,
        categeory: document.getElementById('list').value
      }
  
      axios.post("https://crudcrud.com/api/250718b1a32d4b28ab8dd2f71fe8be58/gun", user)
        
           showUsersOnScreen(user)
    }
  
  
  
  function DeleteUser(userId){
  
  
    axios.delete(`https://crudcrud.com/api/250718b1a32d4b28ab8dd2f71fe8be58/gun/${userId}`)
      
        
        removeFromScreen(userId)
        
      
      
      
    }
  
  
  
  function removeFromScreen(userId) {
    var parentNode = document.getElementById('listOfUsers');
    var childNodeToBeDeleted = document.getElementById(userId);
  
    parentNode.removeChild(childNodeToBeDeleted);
  
  
  }
  
  
  
  
  
  function editUserDetails(Expenseamount, discription, categeory, userId) {
  
  
    document.getElementById('Expense').value = Expenseamount;
    document.getElementById('discription').value = discription;
    document.getElementById('list').value = categeory;
    DeleteUser(userId)
  
  }
  
  
  
  function showUsersOnScreen(user) {
  
    var parentNode = document.getElementById('listOfUsers');
    var childNode = `<li id=${user._id}>${user.Expenseamount}-${user.discription}-${user.categeory}
         <button id="edit" onclick=editUserDetails('${user.Expenseamount}','${user.discription}','${user.categeory}','${user._id}')>Edit User</button>
         <button id='${user._id}' onclick=DeleteUser('${user._id}')>Delete User</button></li>`
    parentNode.innerHTML = parentNode.innerHTML + childNode;
  
  }
  
  
  
  
  