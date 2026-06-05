const chat = document.getElementById("chat");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");
const historyBox = document.getElementById("history");

let chatHistory = JSON.parse(
localStorage.getItem("xyz_history")
) || [];

renderHistory();

/* TAMBAH PESAN */

function addMessage(text,type){

const div = document.createElement("div");

div.className = "message " + type;

div.innerHTML = text;

chat.appendChild(div);

chat.scrollTop = chat.scrollHeight;

}

/* SIMPAN HISTORY */

function saveHistory(question){

chatHistory.unshift(question);

if(chatHistory.length > 30){
chatHistory.pop();
}

localStorage.setItem(
"xyz_history",
JSON.stringify(chatHistory)
);

renderHistory();

}

/* TAMPILKAN HISTORY */

function renderHistory(){

historyBox.innerHTML = "";

chatHistory.forEach(item=>{

const div = document.createElement("div");

div.className = "history-item";

div.innerText = item;

div.onclick = ()=>{

messageInput.value = item;

};

historyBox.appendChild(div);

});

}

/* KIRIM KE AI */

async function sendMessage(){

const text = messageInput.value.trim();

if(!text) return;

addMessage(text,"user");

saveHistory(text);

messageInput.value="";

addMessage("⏳ AI sedang mengetik...","ai");

try{

const response = await fetch("/api/chat",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

model:"google/gemma-3n-e4b-it:free",

messages:[
{
role:"user",
content:text
}
]

})

});

const data = await response.json();

chat.lastChild.remove();

const reply =
data.choices?.[0]?.message?.content
||
"❌ Tidak ada jawaban";

addMessage(reply,"ai");

}catch(err){

chat.lastChild.remove();

addMessage(
"❌ Error: " + err.message,
"ai"
);

}

}

sendBtn.addEventListener(
"click",
sendMessage
);

messageInput.addEventListener(
"keypress",
e=>{
if(e.key==="Enter"){
sendMessage();
}
}
);

/* CHAT BARU */

document
.getElementById("newChat")
.addEventListener("click",()=>{

chat.innerHTML="";

});

/* UPLOAD GAMBAR */

document
.getElementById("imageInput")
.addEventListener("change",e=>{

const file = e.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(ev){

addMessage(
`<img src="${ev.target.result}">`,
"user"
);

}

reader.readAsDataURL(file);

});

/* UPLOAD FILE */

document
.getElementById("fileInput")
.addEventListener("change",e=>{

const file = e.target.files[0];

if(!file) return;

addMessage(
`📁 ${file.name}`,
"user"
);

});
