class CardGenerator{
    constructor(id,value){
        this._id = id
        this._value = value
        this.card = null  
      
	}
    createDiv (index, className) { 
        let div1 = document.createElement('div');
        div1.id = index;
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
}
export default CardGenerator