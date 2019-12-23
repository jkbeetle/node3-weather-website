console.log('Client Side JS file loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const result = document.querySelector('#result')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    result.textContent = 'Loading...'
    const location = search.value
    fetch('/weather?address='+location).then ((response) => {
        response.json().then((data) => {
        console.log(data)
        result.textContent = data.forecast
         })
    })
})