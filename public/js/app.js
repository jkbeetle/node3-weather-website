console.log('Client Side JS file loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const result = document.querySelector('#result')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    result.textContent = 'Loading...'
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then ((response) => {
        response.json().then((data) => {
        result.textContent = data.forecast.summary
         })
    })
})