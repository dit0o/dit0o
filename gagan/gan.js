var form = document.getElementById('form')
form.addEventListener('submit', function (event) {
        event.preventDefault();
        var user={
         Expenseamount:document.getElementById('Expense').value,
         discription:document.getElementById('discription').value,
         categeory:document.getElementById('list').value
        }
       
          axios.post("https://crudcrud.com/api/f975c3d719644018a37266d0142c890c/appi",user)
          .then((response)=>{
            showUsersOnScreen(response.data)
            console.log(response);
          })
          .catch((error)=>{
            console.log(error);
          })
      // console.log(user.Expenseamount,JSON.stringify(user));        
       //showUsersOnScreen(user)
        
        
        
    
        })
        function showUsersOnScreen(user){
          document.getElementById('Expense').value="";
          document.getElementById('discription').value="";
          document.getElementById('list').value="";
           var parentNode=document.getElementById('listOfUsers');
           var childNode=`<li id=${user.Expenseamount}>${user.Expenseamount}-${user.discription}-${user.categeory}
           <button onclick=editUserDetails('${user.Expenseamount}','${user.discription}','${user.categeory}')>Edit User</button>
           <button onclick=DeleteUserDetails('${user.Expenseamount}')>Delete User</li>`
           parentNode.innerHTML=parentNode.innerHTML+childNode;

        }
        function editUserDetails(Expenseamount,discription,categeory){
            document.getElementById('Expense').value=Expenseamount;
            document.getElementById('discription').value=discription;
            document.getElementById('list').value=categeory;
             DeleteUserDetails(Expenseamount);  

        }
        function DeleteUserDetails(Expenseamount){
            console.log(Expenseamount);
            removeUserFromScreen(Expenseamount);

        }
        
        function removeUserFromScreen(Expenseamount){
            const parentNode=document.getElementById('listofUsers');
            const childNodeToBeDeleted=document.getElementById('listItem');
            if(childNodeToBeDeleted){
                parentNode.removeChildNode(parentNode.removeChildNode-childNodeToBeDeleted);
            }
           
        }