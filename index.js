const url="https://basic-todo-api.vercel.app/api/todo";
let root=document.querySelector('.parent');

let input=document.querySelector('input');


let todoArr=[];



function get(url){
    fetch(url)
    .then(res=>res.json())
    .then(data=>data.todos)
    .then(todos=>createUI(todos));
}

function createUI(todos){
    root.innerHTML="";
    todoArr=todos;
    console.log('todoArr',todoArr);
    todos.forEach(todo => {
        let li=document.createElement('li');

        let checkbox=document.createElement('input');
        checkbox.setAttribute("type", "checkbox");
        checkbox.checked=todo.isCompleted;
        checkbox.addEventListener('change',handleCheck);

        let p=document.createElement('p');
        p.innerText=todo.title;
        
        let span=document.createElement('span');
        span.addEventListener('click',handleClose);
        span.innerText="X";

        li.append(checkbox,p,span);
        root.append(li);
    });
}

input.addEventListener('keydown',handleInput);

function handleInput(event){
    if(event.keyCode===13){
        let value=event.target.value;
        console.log(value);
        let obj={
            "todo": {
              "title": value,
              "isCompleted": false
            }
          }
          console.log(obj);
        fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(obj)
            });
            setTimeout(()=>get(url),2000);
    }
    
}
function handleClose(event){
    console.log('Close!');
    let element=event.target;
    let todoTitle=element.previousElementSibling.innerText;
    todoArr.forEach((todo)=>{
        if(todo.title===todoTitle){
            let id=todo._id;
            let delUrl=`${url}/${id}`;
            fetch(delUrl, {
                method: 'DELETE', 
                headers: {
                  'Content-Type': 'application/json'
                },
              });
              setTimeout(()=>get(url),2000);
        }
    });  
}

function handleCheck(event){
    let status=false;
    if(event.target.checked){
        status=true;
        console.log(status);
    }
    let todoTitle=event.target.nextElementSibling.innerText;
    todoArr.forEach((todo)=>{
        if(todo.title===todoTitle){
            let id=todo._id;
            let updUrl=`${url}/${id}`;

            let obj={
                "todo": {
                  "title": todoTitle,
                  "isCompleted": status,
                }
              }

            fetch(updUrl,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(obj)
            });
            setTimeout(()=>get(url),2000);
        }
    })
}



get(url);



console.log('Before setTimeout');
setTimeout(() => {
    console.log('In time out');
}, 3000);
console.log('After Time out');