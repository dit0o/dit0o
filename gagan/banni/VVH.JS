console.log('person1:shows ticket');
console.log('person2:shows ticket');
const preMovie= async()=>{
const promiseWifeBringTickets=new Promise((resolve, reject) => {
    setTimeout(()=>{
     resolve('ticket');
    },3000);
    
});
const getPopcorn= new Promise((resolve, reject) =>resolve(` Popcorn`));
const getButter= new Promise((resolve, reject) =>resolve(` Butter`));
const getColddrinks=new Promise((resolve,reject)=>resolve(`Colddrinks`));
let ticket=await promiseWifeBringTickets;
    console.log(`wife:i bought ${ticket}`);
    console.log('husband:lets get in');
    console.log('wife:no im hungry');


    let popcorn=await getPopcorn;
    console.log(`husband:i bought ${popcorn}`);
    console.log('husband:lets get in');
    console.log('wife:no i need butter on popcorn');


    let butter=await getButter;
    console.log(`husband:i bought ${butter}`);
    console.log('husband:lets get in');
    console.log('wife: no i need colddrinks');
    let colddrinks=await getColddrinks;
    console.log(`husband:i bought ${colddrinks}`);
    console.log('husband:lets get in');
    console.log('wife: yeah go');




return ticket;
}
preMovie().then ((m)=> console.log(`person3: shows ${m}`));


console.log('person1:shows ticket');
console.log('person2:shows ticket');  