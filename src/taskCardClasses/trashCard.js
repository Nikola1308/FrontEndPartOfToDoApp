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
        this.card.appendChild(this.createDivDescriptionTwo())
        this.card.appendChild(this.createButtonTwo('Return to Done Card','buttonstyle',()=>this.reveretToTrashCard()))
        this.card.appendChild(this.createButtonOne('Delete Totaly','buttonstyle',()=>this.deleteCardFtomTrash()))
        this.card.appendChild(this.createButtonThree('Click to chose Description','buttonstyle',()=>this.selectDescription()))
        this.card.appendChild(this.createDivDescription())

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
                const findallDescriptions = ()=>{ 
                    fetch(`http://localhost:3001/todos/one/${this._id}`,{
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
    
                       let div2 = document.getElementById(this._id + 'divDescriptionOne')
                       div2.appendChild(divReadDescription)
                       
                       
                       btn.addEventListener('click',()=>{
                           let a = document.getElementById(todo._id + 'divReadDescription')
                           let deleteDiv = document.getElementById(this._id + 'divDescriptionOne' )
                           deleteDiv.removeChild(a)
                           const deleteTask = ()=>{
                               fetch(`http://localhost:3001/todos/desctiptiondelete/${this._id}`,{
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
    selectDescription(){
        const getDescriptions =()=>{
            fetch('http://localhost:3001/todos/description',{
                method:"get"
            }).then((res)=>{
                return res.json()
            }).then((data)=>{
                data.map((dat)=>{
                    
                    let divDecriptionsofTasks = document.createElement('div')
                    divDecriptionsofTasks.id = dat._id+'divDecriptionsofTasks'
                   //paragraph
                    let parag = document.createElement('p')
                    parag.textContent = dat.descriptionValue
                    //button
                    let btnId = document.createElement('button')
                    btnId.id = dat._id
                    btnId.textContent = 'Append'

                    divDecriptionsofTasks.appendChild(parag)
                    divDecriptionsofTasks.appendChild(btnId)

                    let divDescriptionAdd = document.getElementById(this._id+'divDescription') 
                    divDescriptionAdd.appendChild(divDecriptionsofTasks)                        
                    //d.appendChild(parag)
                   // d.appendChild(btnId)     
                    
                    btnId.addEventListener('click',()=>{
                        //Value and button for One Descriptio on Added on Task
                        let divValue = document.createElement('div')
                        divValue.id = dat._id + 'divReadDescription'

                        let pValue = document.createElement('p')
                        pValue.textContent = dat.descriptionValue
                        //divDescriptionOne.appendChild(pValue)

                        let bDeleteDiscription = document.createElement('button')
                        bDeleteDiscription.id = dat._id
                        bDeleteDiscription.textContent = 'Delete Description'

                        //napraviti novi div ovde 

                        divValue.appendChild(pValue)
                        divValue.appendChild(bDeleteDiscription)

                        let divDescriptionOneForAppande = document.getElementById(this._id + 'divDescriptionOne' )
                        divDescriptionOneForAppande.appendChild(divValue)

                        
                            bDeleteDiscription.addEventListener('click',()=>{
                                let a = document.getElementById(dat._id + 'divReadDescription')
                               // console.log(a)
                                let delDesc = document.getElementById(this._id + 'divDescriptionOne' )
                                delDesc.removeChild(a)
                                
                                this.deleteTask(dat)    
                            })                    
                       
                        this.addDescription(dat)                        
                    })       
                                  
                })
                
            })
        }
        getDescriptions()
    }
     deleteTask = (dat)=>{
        fetch(`http://localhost:3001/todos/desctiptiondelete/${this._id}`,{
            method:'PATCH',
            headers: {
                "Content-type": 'application/json',
                'Accept': "application/json"
            },
            body:JSON.stringify({newDescription:dat._id})
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            console.log('DELETED DESCRIPTION',data)
        })
    }
    addDescription = (dat)=>{
        fetch(`http://localhost:3001/todos/tocdone/descirption/${this._id}`,{
        method: 'PATCH',
        body:JSON.stringify({descriptionValue:dat._id}),
        headers: {
           "Content-type": 'application/json',
           'Accept': "application/json"
          }
          }).then((response)=>{
          return response.json()
         }).then((datas)=>{
          console.log(datas)
          })
      }
   
    
}

export default TreshCard