 async function formsubmit(event){
  try {
    event.preventDefault();
    var user= {
      Name:document.getElementById('name').value,
      Email:document.getElementById('mail').value,
      Password:document.getElementById('pass').value
    }
    const response= await axios.post("http://localhost:3000/user/post", user)
    
      if(response.status===201){
        window.location.href="./login/login.html"
      }
      else{
        throw new Error('Failed to login')
      }
    
    
  } catch (error) {
    
  }
  document.body.innerHTML+= `<div style="red;">${error}<div>`    
 
}