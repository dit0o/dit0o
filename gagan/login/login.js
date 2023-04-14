async function formsubmit(event){
    try {
      event.preventDefault();
      var login= {
        Email:document.getElementById('mail').value,
        Password:document.getElementById('pass').value
      }
      const response= await axios.post("http://localhost:3000/user/login", login)
      
        if(response.status===201){
         alert(response.data.message)
        }
        else{
          throw new Error(response.data.message)
        }
      
      
    } catch (error) {
        document.body.innerHTML+= `<div style="color:red;">${error}<div>`    
    }
   
  }