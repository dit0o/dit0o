const token=localStorage.getItem('token')
async function formsubmit(event){
    try {
        event.preventDefault();
        let inputObj={
            message:document.getElementById('send-msg').value
        }
        await axios.post('http://localhost:4000/user/postmeg',inputObj, { headers: {'Authorization': token}} )
        if(response===201){
        addNewLineElement( response.data.mesg, response.data.Name );
        }
    }
        
    
     catch (error) {
       console.log(error) 
    }
}
const msgUi=document.getElementById('messages-list');
function addNewLineElement(data,Name){
    const li=document.createElement('h4');
    li.appendChild(
        document.createTextNode(Name + ' : ' + data.message +' ')
    )
}
window.addEventListener('DOMContentLoaded', async()=>{
    try{
        const allM = await axios.get('http://localhost:4000/user/message', { headers: {'Authorization': token}} );
        const Name = allM.data.Name;
        const arr = allM.data.mesg;
        arr.forEach(element => {
            addNewLineElement(element,Name);
        });
    }catch(err){
        console.log(err);
    }
});