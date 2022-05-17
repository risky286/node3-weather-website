

console.log('client side js')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            messageOne.textContent = data.error
            console.log(data.error)
        } else {
            if (messageOne) {
                messageOne.textContent = 'the temperature is ' + data.fetchData.temp + 'but it feels like' + data.fetchData.feel
                }
            console.log(data)
        }
    })

    console.log()
})