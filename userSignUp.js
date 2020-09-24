
const signUpForm = document.querySelector('#signUpForm');
console.log(signUpForm);
signUpForm.addEventListener('submit', handleSubmit);



async function handleSubmit (event) {
    event.preventDefault();
    const signUpForm = document.querySelector('#signUpForm');
    const formData = new FormData(signUpForm);
    const userData = {};
    formData.forEach((value, key) => {
        userData[key] = value;
    });
    console.log(userData);
    try {

        let response = await fetch('http://localhost:5000/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userData),
  
        });

        let result = await response.json;
        

    } catch (err){
        console.log(err);
    }
    
    

    

}