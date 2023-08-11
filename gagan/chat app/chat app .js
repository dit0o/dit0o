const inputObj=document.getElementById('input-send')
const token=localStorage.getItem('token')
const sendMsg=document.getElementById('send-msg')
let totalMsg=null;
const box11=document.getElementById('box11')
let activeGroup=null;
let setIntId=null;


inputObj.addEventListener('submit',(e)=>{
    e.preventDefault();
    let sendObj={message:sendMsg.value}
    axios.post(`http://localhost:4000/user/message?gId=${activeGroup}`,sendObj, { headers: {'Authorization': token}} )
    .then((response)=>{
        addNewLineElement( response.data.mesg, response.data.Name );
    
    })
    .catch((err) => {
        console.log(err);
    });
})


const msgUl=document.getElementById('messages-list');

function addNewLineElement(data,Name,id){
    const li=document.createElement('h4');
    loginId=localStorage.getItem('userId')
    if(id==loginId){
        li.className = 'msg-right';
    } else {
        li.className = 'msg-left';
    }
    li.appendChild(
        document.createTextNode(Name + ' : ' + data.message +' ')
    )
    msgUl.appendChild(li)
}

async function getAllMsg(){
try {
    
    const allM=await axios.get(`http://localhost:4000/user/message?lastId=${totalMsg}&gId=${activeGroup}`, { headers: {'Authorization': token}} );
    const arr = allM.data.mesg;
    if(arr.length>0){
        totalMsg = totalMsg + arr.length;
        arr.forEach(element=>{
            addNewLineElement(element,element.user.Name,element.userId);
        })
    }

   


} catch (error) {
    console.log(error)
}
}
window.addEventListener('DOMContentLoaded', async()=>{
    try{
        const allM = await axios.get(`http://localhost:4000/user/message`, { headers: {'Authorization': token}} );
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

const groupBtn=document.getElementById('create-group-btn')
const invitBtn=document.getElementById('invite-btn')
const groupFormDiv=document.getElementById("create-Group-Div")
const groupForm=document.getElementById("create-Group-Form")

groupBtn.onclick=function(){
groupFormDiv.removeAttribute('hidden')
}
groupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const gName = document.getElementById('new-Group-Name');
    let gNameObj={gName:gName.value}
    axios.post('http://localhost:4000/user/message/creategroup', gNameObj, { headers: {'Authorization': token}})
    .then((response) => {
        console.log(response);
        window.location.reload();
    }).catch((err) => {
        console.log(err);
    });
});

