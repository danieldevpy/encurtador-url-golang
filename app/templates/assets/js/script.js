var xhr = new XMLHttpRequest();
var split = String(window.location.href).split('/')
var url = split[0] +"//"+ split[2];
var exist = false;
const regex = /^(http|https):\/\//;

function encurtar(){
    let link = document.getElementById("link")
    let apelido = document.getElementById("apelido")
    var data;

    verific = verific_link(link.value);
    if (!verific[0]){
        add_message(verific[1], 'danger')
        return
    }

    if (apelido.value){
        var data = JSON.stringify({
        "redirect":`${link.value}`,
        "key": `${apelido.value}`
        });
    }else{
        var data = JSON.stringify({
        "redirect":`${link.value}`
        });  
    }
    show_div("s1", false);
    send(data);
}
function verific_link(url){
    if (regex.test(url)) {
        return [true, 'teste'];
    } else {
        return [false, 'Para criar uma url encurtada, o site deverá ter http:// ou https:// '];
    }
}
function show_div(divid, option){
    let div = document.getElementById(divid);
    if (!option){
        div.style.display = "none";
        return
    }
    div.style.display = "flex";
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
                    new_link();
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
    var myurl = json.key;
    let input = document.getElementById("result");
    input.value = url + "/" + myurl;
    show_div("s2", true);
}
function new_link(){
    show_div("s1", true);
    show_div("s2", false);
}
function copiarTexto() {
    let textoCopiado = document.getElementById("result");
    textoCopiado.select();
    textoCopiado.setSelectionRange(0, 99999)
    document.execCommand("copy");
    let button = document.getElementById("copy")
    button.innerHTML = "LINK COPIADO!!"
    setTimeout(function(){
        button.innerHTML = "COPIAR"
    }, 5000);
}
function add_message(message, type){
    if (exist){
        return
    }
    let style = "width: 100%;min-height: 35px;display: flex;align-items: center;justify-content: center;border:none;border-radius: 6px;"
    let div = document.getElementById("messages")
    let newdiv = document.createElement('div');
    let label = document.createElement('label');
    newdiv.id = 'timeout';
    label.innerHTML = message;
    if (type == 'danger'){
        newdiv.style= style + "color: #721c24;background-color: #f8d7da;border-color: #f5c6cb;"
    }else if (type == 'warning'){
        newdiv.style= style + "color: #856404;background-color: #fff3cd;border-color: #ffeeba;"
    }
    newdiv.appendChild(label)
    div.appendChild(newdiv);
    exist = true;
    timeout = setTimeout(function(){
        let div = document.getElementById("timeout");
        div.parentNode.removeChild(div);
        exist = false
    }, 5000);
}