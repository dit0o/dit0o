async function formsubmit(event){
  try {
    event.preventDefault();
    var user= {
      Name:document.getElementById('Name').value,
      Email:document.getElementById('Email').value,
      Password:document.getElementById('pass').value
    }
    const response= await axios.post("http://localhost:3000/user/post", user)
    
      if(response.status===201){
        window.location.href="login/login.html"
      }
      else{
        throw new Error('Failed to login')
      }
    
    
  } catch (err) {
    document.body.innerHTML+= `<div style="red;">${err}</div>`
  }
 
}