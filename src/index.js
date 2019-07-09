import css from './css.css';
import CardGenerator from './cardGenerator'
import TaskCard from './taskCard'
import DoneCard from './doneCard'
import TrashCard from './trashCard'
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


