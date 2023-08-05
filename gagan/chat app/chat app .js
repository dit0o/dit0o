const inputObj=document.getElementById('input-send')
const token=localStorage.getItem('token')
const sendMsg=document.getElementById('send-msg')

inputObj.addEventListener('submit',(e)=>{
    e.preventDefault();
    let sendObj={message:sendMsg.value}
    axios.post('http://localhost:4000/user/message',sendObj, { headers: {'Authorization': token}} )
    .then((response)=>{
        sendMsg.value='';
        addNewLineElement( response.data.mesg, response.data.Name );
    })
    .catch((err) => {
        console.log(err);
    });
})


const msgUl=document.getElementById('messages-list');

function addNewLineElement(data,Name){
    const li=document.createElement('h4');
    li.appendChild(
        document.createTextNode(Name + ' : ' + data.message +' ')
    )
    msgUl.appendChild(li)
}
let totalMsg=null;
async function getAllMsg(){
try {
    const allM=await axios.get('http://localhost:4000/user/message', { headers: {'Authorization': token}} );
    const arr = allM.data.mesg;
    if(totalMsg!==arr.length){
        msgUl.innerHTML="";
        arr.forEach(element=>{
            addNewLineElement(element,element.user.Name);
        })
    }
    totalMsg=arr.length;
   


} catch (error) {
    console.log(error)
}
}
window.addEventListener('DOMContentLoaded', async()=>{
    try{
        const allM = await axios.get('http://localhost:4000/user/message', { headers: {'Authorization': token}} );
        const arr = allM.data.mesg;
        totalMsg=arr.length
        arr.forEach(element => {
            addNewLineElement(element,element.user.Name);
        });
        setInterval(getAllMsg,1000)
    }catch(err){
        console.log(err);
    }
});