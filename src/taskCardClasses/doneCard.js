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
        this.card.appendChild(this.createDivDescriptionTwo())
        this.card.appendChild(this.createButtonOne('Return To Tasks','buttonstyle',()=>this.reveretToTaskCard()))
        this.card.appendChild(this.createButtonTwo('Delete To Trash Tasks','buttonstyle',()=>this.reveretToTrashCard()))
        this.card.appendChild(this.createButtonThree('Click to chose Description','buttonstyle',()=>this.selectDescription()))
        this.card.appendChild(this.createDivDescription())

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
        getUpdateToDeleteCard()

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

export default DoneCard




