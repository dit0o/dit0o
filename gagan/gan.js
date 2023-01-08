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
       window.addEventListener("DOMContentLoaded",()=>{
       axios.get("https://crudcrud.com/api/f975c3d719644018a37266d0142c890c/appi")
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
        function editUserDetails(Expenseamount,discription,categeory,userId){
            document.getElementById('Expense').value=Expenseamount;
            document.getElementById('discription').value=discription;
            document.getElementById('list').value=categeory;
            axios.put("https://crudcrud.com/api/f975c3d719644018a37266d0142c890c/appi")
          .then((response)=>{
            editUserDetails(response.data)
            console.log(response);
          })
          .catch((error)=>{
            console.log(error);
          })
             DeleteUser(userId);  

        }
        function DeleteUser(userId){
            axios.delete(`https://crudcrud.com/api/f975c3d719644018a37266d0142c890c/appi/${userId}`)
            .then((response)=>{
                removeUserFromScreen(userId);
            })
            .catch((error)=>{
                console.log(error);
            })
            //console.log(Expenseamount);
            //removeUserFromScreen(Expenseamount);

        }
        
        function removeUserFromScreen(userId){
            const parentNode=document.getElementById('listofUsers');
            const childNodeToBeDeleted=document.getElementById(userId);
            if(childNodeToBeDeleted){
                parentNode.removeChild(childNodeToBeDeleted);
            }
           
        }