console.log('Client side javascript is loaded!');
const weatherForm = document.querySelector('form')                  // querySelector work on 1st element (1st para, 1st input etc)
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'content on fly'
messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()                                              //prevent default behavior of refreshing a page
    const location = search.value
    // console.log(location)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''                                     // old message gets cleared

    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})