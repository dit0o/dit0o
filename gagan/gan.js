window.addEventListener("DOMContentLoaded",()=>{
  axios.get("https://crudcrud.com/api/53bcdb8ad4c2479199d03884b744092a/appa")
  .then((response)=>{
   console.log(response)
   for(var i=0; i<response.data.length; i++)
   {
       showUsersOnScreen(response.data[i])
   }
  })
  .catch((error)=>{
   console.log(error);
 })
var form = document.getElementById('form')
form.addEventListener('submit', function (event) {
        event.preventDefault();
        var user={
         Expenseamount:document.getElementById('Expense').value,
         discription:document.getElementById('discription').value,
         categeory:document.getElementById('list').value
        }
       
          axios.post("https://crudcrud.com/api/53bcdb8ad4c2479199d03884b744092a/appa",user)
          .then((response)=>{
            showUsersOnScreen(response.data)
            console.log(response);
          })
          .catch((error)=>{
            console.log(error);
          })
        
      
       
        
    })
        
    
        })
      
       
       
        function showUsersOnScreen(user){
          document.getElementById('Expense').value="";
          document.getElementById('discription').value="";
          document.getElementById('list').value="";
           var parentNode=document.getElementById('listOfUsers');
           var childNode=`<li id=${user._id}>${user.Expenseamount}-${user.discription}-${user.categeory}
           <button onclick=editUserDetails('${user.Expenseamount},'${user.discription}','${user.categeory}','${user._id}')>Edit User</button>
           <button onclick=DeleteUser('${user._id}')>Delete User</li>`
           parentNode.innerHTML=parentNode.innerHTML+childNode;

        }
        axios.put("https://crudcrud.com/api/53bcdb8ad4c2479199d03884b744092a/appa")
        .then((response)=>{
          editUserDetails(response.data)
          console.log(response)
        })
        .catch((error)=>{
          console.log(error)
        })
        function editUserDetails(Expenseamount,discription,categeory,userId){
         
             
          document.getElementById('Expense').value=Expenseamount;
          document.getElementById('discription').value=discription;
          document.getElementById('list').value=categeory;
          DeleteUser(userId)

      }
      function DeleteUser(userId){
        
        axios.delete(`https://crudcrud.com/api/53bcdb8ad4c2479199d03884b744092a/appa/${userId}`)
      .then((response)=>{
          removeUserFromScreen(userId);
          console.log(response)
        
      })
      .catch((error)=>{
          console.log(error);
      })
    }
       
        
        function removeUserFromScreen(userId){
            const parentNode=document.getElementById('listofUsers');
            const childNodeToBeDeleted=document.getElementById(userId);
            if(childNodeToBeDeleted){
                parentNode.removeChild(childNodeToBeDeleted);
            }
           
        }