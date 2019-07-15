import css from './css.css';
import CardGenerator from '../src/taskCardClasses/cardGenerator'
import TaskCard from '../src/taskCardClasses/taskCard'
import DoneCard from '../src/taskCardClasses/doneCard'
import TrashCard from '../src/taskCardClasses/trashCard'
import AllCardDescriptions from '../src/descriptionClasses/allDescriptions'


const cardTask = document.getElementById('card')
const carDone = document.getElementById('carddone')
const cardTrash = document.getElementById('trashcards')

const allDescriptions = document.getElementById('alldescriptions')


let cardH3 = document.getElementById('cardh3')
let carddoneh3 = document.getElementById('carddoneh3')




//Getting value from input and setting first card to Card
document.getElementById('input').addEventListener('keypress', function(e) {
	if (e.key === 'Enter') {
        let input = document.getElementById('input')
        let inputValue = input.value
        
        fetch('http://localhost:3001/todos',{
            method:'POST',
            body:JSON.stringify({value:inputValue}),
            headers: {
                "Content-type": 'application/json',
                'Accept': "application/json"
            }
        }).then((response)=>{
            return response.json()
        }).then((task)=>{
            const {_id,value} = task
            const clasTask = new TaskCard(_id,value)
            clasTask.generateCard()
            cardTask.appendChild(clasTask.card)
            input.value = '' 
        })
       } 
});  

//GET Request for Reading ToDoTasks
const getToDoTasks = () =>{
    fetch('http://localhost:3001/todos/tasktodo',{
        method:'GET'
    }).then((response)=>{
        return response.json()
    }).then((tasks)=>{
        tasks.map((task)=>{
            const {_id,value} = task
            const clasTask = new TaskCard(_id,value)
            clasTask.generateCard()
            cardTask.appendChild(clasTask.card)
           
            //console.log(clasTask.generateCard())

            const findallDescriptions = ()=>{ 
                 fetch(`http://localhost:3001/todos/one/${_id}`,{
                 method:'GET'
             }).then((res)=>{
                return res.json()
             }).then((todos)=>{
                todos.forEach((todo)=>{
                   
                    let p = document.createElement('p')
                    p.textContent = todo.descriptionValue

                    let btn = document.createElement('button')
                    btn.textContent = 'Delete Description'
                    btn.id = todo._id

                    let divReadDescription = document.createElement('div')
                    divReadDescription.id = todo._id + 'divReadDescription'
                    
                    divReadDescription.appendChild(p)
                    divReadDescription.appendChild(btn)

                    let div2 = document.getElementById(_id + 'divDescriptionOne')
                    div2.appendChild(divReadDescription)
                    
                    
                    btn.addEventListener('click',()=>{
                        console.log('aa')
                        let a = document.getElementById(todo._id + 'divReadDescription')
                        console.log(a)
                        let deleteDiv = document.getElementById(_id + 'divDescriptionOne' )
                        console.log(deleteDiv)
                        deleteDiv.removeChild(a)
                        const deleteTask = ()=>{
                            fetch(`http://localhost:3001/todos/desctiptiondelete/${_id}`,{
                                method:'PATCH',
                                headers: {
                                    "Content-type": 'application/json',
                                    'Accept': "application/json"
                                },
                                body:JSON.stringify({newDescription:todo._id})
                            }).then((response)=>{
                                return response.json()
                            }).then((data)=>{
                                console.log('DELETED DESCRIPTION',data)
                            })
                        }
                        deleteTask()
                    })
                })
             })
        }
        findallDescriptions()
        })
    })
}
getToDoTasks()


//GET Request for Reading DoneTasks
const getDoneTasks = () =>{
    fetch('http://localhost:3001/todos/taskdone',{
        method:'GET'
    }).then((response)=>{
        return response.json()
    }).then((tasks)=>{
        tasks.map((task)=>{
            const {_id,value} = task
            const clasTask = new DoneCard(_id,value)
            clasTask.generateCard()
            carDone.appendChild(clasTask.card)

            const findallDescriptions = ()=>{ 
                fetch(`http://localhost:3001/todos/one/${_id}`,{
                method:'GET'
            }).then((res)=>{
               return res.json()
            }).then((todos)=>{
               todos.forEach((todo)=>{
                  
                   let p = document.createElement('p')
                   p.textContent = todo.descriptionValue

                   let btn = document.createElement('button')
                   btn.textContent = 'Delete Description'
                   btn.id = todo._id

                   let divReadDescription = document.createElement('div')
                   divReadDescription.id = todo._id + 'divReadDescription'
                   
                   divReadDescription.appendChild(p)
                   divReadDescription.appendChild(btn)

                   let div2 = document.getElementById(_id + 'divDescriptionOne')
                   div2.appendChild(divReadDescription)
                   
                   
                   btn.addEventListener('click',()=>{
                       let a = document.getElementById(todo._id + 'divReadDescription')
                       let deleteDiv = document.getElementById(_id + 'divDescriptionOne' )
                       deleteDiv.removeChild(a)
                       const deleteTask = ()=>{
                           fetch(`http://localhost:3001/todos/desctiptiondelete/${_id}`,{
                               method:'PATCH',
                               headers: {
                                   "Content-type": 'application/json',
                                   'Accept': "application/json"
                               },
                               body:JSON.stringify({newDescription:todo._id})
                           }).then((response)=>{
                               return response.json()
                           }).then((data)=>{
                               console.log('DELETED DESCRIPTION',data)
                           })
                       }
                       deleteTask()
                   })
               })
            })
       }
       findallDescriptions()
        })
    })
}
getDoneTasks()


////Button for showing cards in Trash
 let retriveCards = document.getElementById('retrevecards')
    retriveCards.addEventListener('click',function(){
    const getTaskDeleted = ()=>{
        fetch('http://localhost:3001/todos/taskdeleted',{
            method:'GET'
        }).then((response)=>{
            return response.json()
        }).then((tasks)=>{
            tasks.map((task)=>{
                const {_id,value} = task
                const clasTask = new TrashCard(_id,value)
                clasTask.generateCard()
                cardTrash.appendChild(clasTask.card)

                const findallDescriptions = ()=>{ 
                    fetch(`http://localhost:3001/todos/one/${_id}`,{
                    method:'GET'
                }).then((res)=>{
                   return res.json()
                }).then((todos)=>{
                   todos.forEach((todo)=>{
                      
                       let p = document.createElement('p')
                       p.textContent = todo.descriptionValue
   
                       let btn = document.createElement('button')
                       btn.textContent = 'Delete Description'
                       btn.id = todo._id
   
                       let divReadDescription = document.createElement('div')
                       divReadDescription.id = todo._id + 'divReadDescription'
                       
                       divReadDescription.appendChild(p)
                       divReadDescription.appendChild(btn)
   
                       let div2 = document.getElementById(_id + 'divDescriptionOne')
                       div2.appendChild(divReadDescription)
                       
                       
                       btn.addEventListener('click',()=>{
                           console.log('aa')
                           let a = document.getElementById(todo._id + 'divReadDescription')
                           console.log(a)
                           let deleteDiv = document.getElementById(_id + 'divDescriptionOne' )
                           console.log(deleteDiv)
                           deleteDiv.removeChild(a)
                           const deleteTask = ()=>{
                               fetch(`http://localhost:3001/todos/desctiptiondelete/${_id}`,{
                                   method:'PATCH',
                                   headers: {
                                       "Content-type": 'application/json',
                                       'Accept': "application/json"
                                   },
                                   body:JSON.stringify({newDescription:todo._id})
                               }).then((response)=>{
                                   return response.json()
                               }).then((data)=>{
                                   console.log('DELETED DESCRIPTION',data)
                               })
                           }
                           deleteTask()
                       })
                   })
                })
           }
           findallDescriptions()
            })
        })
    }
    getTaskDeleted()
 })


 //========Posting Descriptions for Tasks==========//
 document.getElementById('inputdescription').addEventListener('keypress',function(e){
    if (e.key === 'Enter') {
        let input = document.getElementById('inputdescription')
        let inputValue = input.value

        fetch('http://localhost:3001/todos/desctiption',{
            method:'POST',
            body:JSON.stringify({descriptionValue:inputValue}),
            headers: {
                "Content-type": 'application/json',
                'Accept': "application/json"
            }
        }).then((response)=>{
            return response.json()
        }).then((tasks)=>{
            console.log(tasks)
            input.value = ''
        })
    }
 })
//===========Reading all Request===============//


document.getElementById('descriptionload').addEventListener('click',()=>{
    const getDescriptions =()=>{
        fetch('http://localhost:3001/todos/description',{
            method:"get"
        }).then((res)=>{
            return res.json()
        }).then((descriptions)=>{
           descriptions.map((description)=>{
            const {_id,descriptionValue}= description
            const discriptionClass = new AllCardDescriptions(_id,descriptionValue)
            discriptionClass.generateDescriptions()
            allDescriptions.appendChild(discriptionClass.card)
           })
           
           
        })
    }
    getDescriptions()
})


