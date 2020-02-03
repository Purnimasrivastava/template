fetch('/weather?address=bosten').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    });
});
const weather = document.querySelector('form');
const search = document.querySelector('input');
const message = document.querySelector('#message1');
const message2 = document.querySelector('#message2');
message.textContent="";
message2.textContent="";
weather.addEventListener('submit',(e)=>{
    e.preventDefault();
    const address = search.value;
    message.textContent = 'loading';
    fetch('/weather?address='+address).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message.textContent = data.error;
                message2.textContent="";
            }else{
                message2.textContent = "";
                message.textContent = 'you are looking for '+data.place+'. Geocoading info. for '+data.place+' is '+data.forcast+', and lat :'+data.lat+', lng '+data.lng+'.';
            }
            
        })
    });
})
