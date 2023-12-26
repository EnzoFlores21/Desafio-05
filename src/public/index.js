const userName = document.querySelector('.userName')
const socket = io()

Swal.fire({
    title: "Ingrese su nombre",
    input: "text",
    inputAttributes: {
        autocapitalize: "on"
    },
    showCancelButton: false,
    confirmButtonText: "Ingresar",
}).then((result) => {
    userName.textContent = result.value
    socket.emit("userConnection", {
        user: result.value
    })
});

const chatMessage = document.querySelector('.chat_message')

socket.on("userConnection", (data) => {
    chatMessage.innerHTML = `<p>${data[0].message}</p>`
})

const inputMessage = document.getElementById('inputMessage')
const btnMessage = document.getElementById('btnMessage')

btnMessage.addEventListener("click", (e) => {
    e.preventDefault()
    socket.emit("userMessage", {
        message: inputMessage.value
    })
})

socket.on("userMessage", (data) => {
    chatMessage.innerHTML = `<p>${data[0].message}</p>`
})