const messageList = document.querySelector('ul')
const nickNameForm = document.querySelector('#nick')
const messageForm = document.querySelector('#message')
const socket = new WebSocket(`ws://${window.location.host}`)

//서버와 연결됐을때와 끊겼을때
socket.addEventListener("open", () => {
  console.log("Connected to Server 😀");
})
socket.addEventListener("close", ()=>{
  console.log("Not Connected from Server 😈");
})
function makeMessage(type, payload) {
  const msg = {type, payload}
  return JSON.stringify(msg)
}

//소켓으로 메시지를 받았을경우 li태그로 메시지 보여주기
socket.addEventListener("message", (message)=>{
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li)
})

//메시지 전송
function megSubmit(event) {
  event.preventDefault()
  const input = messageForm.querySelector('input');
  socket.send(makeMessage("new_message", input.value))
  input.value = ""
}
messageForm.addEventListener("submit", megSubmit)

//닉네임 전송
function nickNmaeSubmit(event) {
  event.preventDefault()
  const input = nickNameForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value))
}
nickNameForm.addEventListener("submit", nickNmaeSubmit)