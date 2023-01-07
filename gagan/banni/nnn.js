const posts=[

    {title:'post one',body:'This is post one ', createdAt:new Date().getTime()},

    {title:'post two',body:'This is post two ',createdAt:new Date().getTime()}

];

let intervalId=0;

function getposts(){

    clearInterval(intervalId);

    intervalId=setInterval(()=>{

        let output='';

        posts.forEach((post)=>{

            output+=`<li>${post.title}- last updated ${(new Date().getTime() - post.createdAt)/1000}seconds ago</li>`



        });

     document.body.innerHTML=output;

    },1000);

    

}
async function fun1(){
const createPosts=await

     new Promise((resolve, reject) => {

        setTimeout(()=>{

            posts.push({...post ,createdAt:new Date().getTime()});

            const error=false;

            if(!error){

                resolve();

            }else{

                reject('error:something went wrong');

            }

           

        },2000);

       

        

    });

   

}

const  DeletPosts=await

    new Promise((resolve, reject) => {

        setTimeout(()=>{

            posts.pop({...post ,createdAt:new Date().getTime()});

            const error=false;

            if(!error){

                resolve();

            }else{

                reject('error:something went wrong');

            }

           

        },2000);

       

        

    });

   









    

    createPosts({title:'post three',body:'This is post three '})



.then(()=>{

    getposts();

    DeletPosts();

    updateLastUserActivityTime();



}

)

createPosts({title:'post four',body:'This is post four '})



.then(()=>{

    getposts();

    DeletPosts();

   


}

)

    







