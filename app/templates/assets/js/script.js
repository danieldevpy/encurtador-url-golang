
function option(){
    document.querySelector("#option1").style.display = 'none';
    document.querySelector("#option2").style.display = 'inline';
}
function canceloption(){
    document.querySelector("#option2").style.display = 'none';
    document.querySelector("#option1").style.display = 'inline';
}
var xhr = new XMLHttpRequest();

var split = String(window.location.href).split('/')
var url = split[0] +"//"+ split[2];
var exist = false;

function encurtar(){
    var compare = document.getElementById("option2");
    var input = document.querySelector("#link");
    var link = input.value;
    var customy = document.querySelector("#custom").value;
    var verific = link.substr(0, 4).toLowerCase()
    if(verific == ""){
        alert("Insira um link!")
        return
    }

    if(verific == "http"){
        var data;
        if(compare.style.display !== "none") {
            var data = JSON.stringify({
                "redirect":`${link}`,
                "key": `${customy}`
                });

        }else{
            var data = JSON.stringify({
                "redirect":`${link}`
                });  
        }
        send(data);
    }else{
        alert("o link deve conter http!")
    }
}


function send(data){
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            set_message(json);
        }else{
            if (xhr.status == 400 && xhr.responseText){
                if (xhr.responseText){
                    let string = xhr.responseText.replace('"', '').replace('"', '')
                    add_message(string, 'danger');
                }
            }
            if (xhr.status == 202 && xhr.responseText){
                var json = JSON.parse(xhr.responseText);
                set_message(json);
                add_message("Essa url já está cadastrada, o link curto foi mostrado abaixo!", 'warning')
            }
            
        }
    };
    xhr.send(data);
}

function set_message(json){
    var myurl = json.key
    var myclicks = json.clicks
    var myadmin = json.secret_key

    document.getElementById("awnser").style.visibility = "visible";
    document.getElementById("idurl").innerText=`${url}/${myurl}`;
    document.getElementById("idclicks").innerText=`${myclicks}`;
    document.getElementById("idadmin").innerText=`${url}/${myadmin}`;
}

function add_message(message, type){
    if (exist){
        return
    }
    let div = document.getElementById("messages")
    let newdiv = document.createElement('div');
    let label = document.createElement('label');
    newdiv.id = 'timeout';
    label.innerHTML = message;
    if (type == 'danger'){
        newdiv.style="width: 100%;min-height: 35px;display: flex;align-items: center;justify-content: center;border:none;border-radius: 6px;color:white;margin-top:20px;color: #721c24;background-color: #f8d7da;border-color: #f5c6cb;"
    }else if (type == 'warning'){
        newdiv.style="width: 100%;min-height: 35px;display: flex;align-items: center;justify-content: center;border:none;border-radius: 6px;color:white;margin-top:20px;color: #856404;background-color: #fff3cd;border-color: #ffeeba;"
    }
    newdiv.appendChild(label)
    div.appendChild(newdiv);
    timeout = setTimeout(delete_message, 3000);
    exist = true;


function delete_message(){
    let div = document.getElementById("timeout");
    div.parentNode.removeChild(div);
    exist = false
}
}


function MediaQuery(x) {
    // if (x.matches) { // If media query matches
    //   null
    // } else {

    // let container = document.createElement('div');
    // container.id = "ctn";
    // let section1 = document.getElementById('sessao1')
    

    // var pai = document.getElementById("sessao1");
    // console.log(pai.children.length)
    
    // for(var i = 0; i < pai.children.length; i++){
    //     container.appendChild(pai.children[i])
    // }

    // section1.appendChild(container)
    // }
  }
  