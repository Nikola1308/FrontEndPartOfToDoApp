import CardDescription from '../descriptionClasses/cardDescription'

class CardGenerator{
    constructor(id,value){
        this._id = id
        this._value = value
        this.card = null 
	}
    createDiv (_id, className) { 
        let div1 = document.createElement('div');
        div1.id = _id;
        div1.className = className
        return div1;
    }
    createParagraph  (value, className)  { 
        let card1 = document.createElement('p')
        card1.textContent = value;
        card1.className = className;
        return card1;
    }
    createButtonOne(textContent,className, onClick){
        let btn1 = document.createElement('button')
        btn1.textContent = textContent
        btn1.className = className
        btn1.onclick = onClick
        return btn1
    }
    createButtonTwo (textContent,className, onClick){
        let btn2 = document.createElement('button')
        btn2.textContent = textContent
        btn2.className = className
        btn2.onclick = onClick 
        return btn2
    }
    createButtonThree (textContent,className, onClick){
        let btn3 = document.createElement('button')
        btn3.textContent = textContent
        btn3.className = className
        btn3.onclick = onClick
        return btn3
    }
    createDivDescription (){
        let divDecriptionn = document.createElement('div')
        divDecriptionn.id = this._id + 'divDescription'
        return divDecriptionn
    }
    createDivDescriptionTwo(){
        let divDecriptions = document.createElement('div')
        divDecriptions.id =this._id + 'divDescriptionOne'
        return divDecriptions
    }
}
export default CardGenerator