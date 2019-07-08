import CardGenerator from './cardGenerator'
import TreshCard from './trashCard'
import TaskCard from './taskCard'

const cardTrash = document.getElementById('trashcards')
const cardTask = document.getElementById('card')
const carDone = document.getElementById('carddone')

class DoneCard extends CardGenerator {
    constructor(_id,value){
        super(_id,value)
    }
    
    generateCard () {
        this.card = this.createDiv(this._id,'cardstyle')
        this.card.appendChild(this.createParagraph(this._value,'paragraphstyle'))
        this.card.appendChild(this.createButtonOne('Return To Tasks','buttonstyle',()=>this.reveretToTaskCard()))
        this.card.appendChild(this.createButtonTwo('Delete To Trash Tasks','buttonstyle',()=>this.reveretToTrashCard()))

    }
    
    reveretToTaskCard(){
       
       let cardTaskk = new TaskCard(this._id,this._value)
       cardTaskk.generateCard()     
        let a = document.getElementById(this._id)
        carDone.removeChild(a) 
        cardTask.appendChild(cardTaskk.card) 
        const getUpdateToDoTask = ()=>{
            fetch(`http://localhost:3001/todos/toctodo/${this._id}`,{
                method: 'PATCH',
                headers: {
                    "Content-type": 'application/json',
                    'Accept': "application/json"
                },
                body:JSON.stringify()
            }).then((response)=>{
                return response.json()
            }).then((data)=>{
                console.log(data)
            })
        }
        getUpdateToDoTask()
      
    } 
    
    reveretToTrashCard(){

        let cardDeleteTask = new TreshCard(this._id,this._value)
        cardDeleteTask.generateCard()             
        let a = document.getElementById(this._id)
        carddone.removeChild(a)
        cardTrash.appendChild(cardDeleteTask.card)     
        const getUpdateToDeleteCard = ()=>{
            fetch(`http://localhost:3001/todos/tocdel/${this._id}`,{
                method: 'PATCH',
                headers: {
                    "Content-type": 'application/json',
                    'Accept': "application/json"
                },
                body:JSON.stringify()
            }).then((response)=>{
                return response.json()
            }).then((data)=>{
                console.log(data)
            })
        }
        getUpdateToDeleteCard()

    }    
}

export default DoneCard




