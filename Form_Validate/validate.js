function Validator(id) {

    validatorRules = {
        required: function required(inputValue) {
            return inputValue === '' ? 'Vui long nhap truong nay' : undefined 
        },

        email: function email(inputValue) {
            const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            return !re.test(inputValue) ? 'Email khong hop le' : undefined
        },

        min: function min(inputValue, minLength) {

            return inputValue.length < minLength ? `Vui long nhap mat khau it nhat ${minLength} ki tu!` : undefined
        },

        confirmed: function confirmed(inputValue, password) {
            return inputValue !== password ? 'Mat khau khong khop' : undefined
        }   

    }
    
    //Get parrentElement
    function getParentElement(e, name) {
        while (e.parentElement) {
            e = e.parentElement
            if (e.querySelector(name)) break;
        }
        return e;
    }

    //Render UI
    function renderUI(e, value) {
        if (value === undefined) {value = ''}
        getParentElement(e, '.form-message').querySelector('.form-message').innerText = value
    }

    //handle event
   

    function handleEvent(e) {
        
            let inputValue = e.value
            let rulesValues = e.getAttribute('rules').split('|')
            //handleMin
            function handleMin(rulesValue) {
                minRulesArray = rulesValue.split(':')
                rulesValue = minRulesArray[0]
                minLength = + minRulesArray[1]

                if (inputValue !== '') {
                    renderUI(e, validatorRules[rulesValue](inputValue, minLength))
                }
            }   
            //handleConfirmed
            function handleConfirmed(rulesValue) {
                var password = getParentElement(e,'#password').querySelector('#password').value
                renderUI(e, validatorRules[rulesValue](inputValue, password))

            }

            rulesValues.forEach(rulesValue => {

                if (rulesValue.includes(':')) handleMin(rulesValue)
                else{
                    if (rulesValue == 'required') renderUI(e, validatorRules[rulesValue](inputValue))

                    if (rulesValue !== 'required' && inputValue !== '') 
                        {
                            renderUI(e, validatorRules[rulesValue](inputValue))
                            handleConfirmed(rulesValue)
                        }
                }
                
            })


    }

        

    var formElement = document.querySelector(id)
    var inputElements = formElement.querySelectorAll('input[name][rules]')
    var btnSubmit =  formElement.querySelector('.form-submit')
    console.log(btnSubmit)
    inputElements.forEach(inputElement => {
        inputElement.onblur = e => handleEvent(e.target)
    });

    btnSubmit.onclick = function(e) {
        e.preventDefault();
        inputElements.forEach(inputElement=> {
            handleEvent(inputElement)
        });  
    }


    


    
}



//value -> element -> parent element ->

//value --> function validate