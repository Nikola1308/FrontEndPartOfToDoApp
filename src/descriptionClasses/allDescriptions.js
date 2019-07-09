import CardDescription from './cardDescription'

const allDescriptions = document.getElementById('alldescriptions')

class AllCardDescriptions extends CardDescription{
    constructor(_id,descriptionValue){
        super(_id,descriptionValue)
    }

    generateDescriptions(){
        this.card = this.createDiv(this._id,'cardstyle')
        this.card.appendChild(this.createParagraph(this.descriptionValue,'paragraphstyle'))
        this.card.appendChild(this.createButtonDescription('X','buttonstyle',()=>this.deleteOneDescription()))
        
        return this.card
    }
    deleteOneDescription(){
        let a = document.getElementById(this._id)
        allDescriptions.removeChild(a)
        const deleteTask = ()=>{
            fetch(`http://localhost:3001/todos/desctiption/${this._id}`,{
                method:'DELETE',
                headers: {
                    "Content-type": 'application/json',
                    'Accept': "application/json"
                },
                body:JSON.stringify()
            }).then((response)=>{
                return response.json()
            }).then((data)=>{
                console.log('DELETED DESCRIPTION',data)
            })
        }
        deleteTask()    
    }
}

export default AllCardDescriptions