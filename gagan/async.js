async function formsubmit(event){
  try {
    event.preventDefault();
    var user= await{
      Name:document.getElementById('Name').value,
      Email:document.getElementById('Email').value,
      Password:document.getElementById('pass').value
    }
    axios.post("http://localhost:3000/user/post", user)
    .then((response)=>{
      if(response.status===200){
        window.location.href="../login/login.html"
      }
      else{
        throw new Error('Failed to login')
      }
    })
    
  } catch (error) {
    document.body.innerHTML+= `<div style="red;">${error}</div>`
  }
 
}