
document.querySelector('form').addEventListener('submit',(event)=>{

    event.preventDefault();
    
    let target = event.target.action;
    let action = target.substring(target.lastIndexOf("/") +1)
    if (action == "signin"){
        let data = {
            email    : document.querySelectorAll('input').item(0).value,
            password : document.querySelectorAll('input').item(1).value,
            remember : document.querySelectorAll('input').item(2).checked
        }
       
        axios.post(target,data).then(function (user){
            console.log(user.data)
            alertsweet("success","Connected !")
            window.setTimeout(()=>{
                window.location.href = "/"
            },1500)
            
        }).catch(function (error){
            console.log()
            alertsweet("error",error.response.data.message)
        })

    } 

    if (action == "signup"){
        let data = {
            name :document.querySelectorAll('input').item(0).value,
            username: document.querySelectorAll('input').item(1).value,
            email: document.querySelectorAll('input').item(2).value,
            password: document.querySelectorAll('input').item(3).value
        }
        axios.post(target,data).then((result) => {
            alertsweet("success",result.data.message)
            window.setTimeout(()=>{
                window.location.href="/auth/signin"
            },1500)
        }).catch((error) => {
            alertsweet("error",error.response.data.message)
        })
    }

})

function alertsweet(type,message){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: type,
        title: message
      })
}