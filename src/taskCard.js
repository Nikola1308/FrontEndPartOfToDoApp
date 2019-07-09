import CardGenerator from './cardGenerator'
import DoneCard from './doneCard'

const cardTask = document.getElementById('card')
const carDone = document.getElementById('carddone')

class TaskCard extends CardGenerator {
    constructor(_id,value){
        super(_id,value)
    }    
    
    generateCard () {
        this.card = this.createDiv(this._id,'cardstyle')
        this.card.appendChild(this.createParagraph(this._value,'paragraphstyle'))
        this.card.appendChild(this.createButtonOne('Done Tasks','buttonstyle',()=>this.reveretToDoneCard()))
        this.card.appendChild(this.createButtonTwo('Delete Tasks','buttonstyle',() => this.deleteTaskCard()))
        this.card.appendChild(this.createButtonThree('Click to chose Description','buttonstyle',()=>this.selectDescription()))
       
        return this.card
    }
    
    reveretToDoneCard(){

        //create new card       
        let cardDone = new DoneCard(this._id,this._value)
        cardDone.generateCard()
        carDone.appendChild(cardDone.card)        
        let a = document.getElementById(this._id)
        cardTask.removeChild(a)  

        const getUpdateToDoneCard = () =>{
            fetch(`http://localhost:3001/todos/tocdone/${this._id}`,{
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
        getUpdateToDoneCard()
    }

    deleteTaskCard(){
            let a = document.getElementById(this._id)
            cardTask.removeChild(a)  
            const deleteTask = ()=>{
                fetch(`http://localhost:3001/todos/${this._id}`,{
                    method:'DELETE',
                    headers: {
                        "Content-type": 'application/json',
                        'Accept': "application/json"
                    },
                    body:JSON.stringify()
                }).then((response)=>{
                    return response.json()
                }).then((data)=>{
                    console.log('DELETET TASK',data)
                })
            }
            deleteTask()
                     
    } 
    selectDescription(){
        const getDescriptions =()=>{
            fetch('http://localhost:3001/todos/description',{
                method:"get"
            }).then((res)=>{
                return res.json()
            }).then((data)=>{
                console.log('DESCRIPTIONS',data)
                data.map((dat)=>{
                    console.log(dat.descriptionValue)
                })
            })
        }
        getDescriptions()
    }

}
export default TaskCard