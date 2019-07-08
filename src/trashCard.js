import CardGenerator from './cardGenerator'
import DoneCard from './doneCard'


const cardTrash = document.getElementById('trashcards')
const carDone = document.getElementById('carddone')

class TreshCard extends CardGenerator{
    constructor(_id,value){
        super(_id,value)
    }
    
    generateCard() {
        this.card = this.createDiv(this._id,'cardstyle')
        this.card.appendChild(this.createParagraph(this._value,'paragraphstyle'))
        this.card.appendChild(this.createButtonTwo('Return to Done Card','buttonstyle',()=>this.reveretToTrashCard()))
        this.card.appendChild(this.createButtonOne('Delete Totaly','buttonstyle',()=>this.deleteCardFtomTrash()))

    }
    reveretToTrashCard(){

        let cardDone = new DoneCard(this._id,this._value)
        cardDone.generateCard()
        let a = document.getElementById(this._id) 
        cardTrash.removeChild(a)   
        carDone.appendChild(cardDone.card)    
             
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
    deleteCardFtomTrash(){
       let a  = document.getElementById(this._id)
       cardTrash.removeChild(a)
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
    
}

export default TreshCard