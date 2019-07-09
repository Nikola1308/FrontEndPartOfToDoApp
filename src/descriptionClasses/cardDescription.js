class CardDescription {
    constructor (id,descriptionValue){
        this._id = id
        this.descriptionValue = descriptionValue
        this.card = null
    }
    createDiv(id,className){
        let divDiscription = document.createElement('div');
        divDiscription.id = id;
        divDiscription.className = className
        return divDiscription;
    }
    createParagraph (descriptionValue, className)  { 
        let pDescription = document.createElement('p')
        pDescription.textContent = descriptionValue;
        pDescription.className = className;
        return pDescription;
    }
    createButtonDescription(textContent,className, onClick){
        let btnDescriptio = document.createElement('button')
        btnDescriptio.textContent = textContent
        btnDescriptio.className = className
        btnDescriptio.onclick = onClick
        return btnDescriptio;
    }
}
export default CardDescription
