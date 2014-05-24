function log(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}

var x = "OriginNRG"

function checkDJ() {
    if (!((API.getDJ()["username"]) == x)){
        API.sendChat((new String("New DJ: ")).concat(API.getDJ()["username"]))
        x = String(API.getDJ()["username"])
    }
    log("Ran Function: " + x)
}

function command(data){
    if (data == "/waitlist"){
        w = API.getWaitList()
        str = "Waitlist: "
        for (var i = 0; i < w.length; i++) {
            if (i == 10){
                break
            }
            str = str + w[i]["username"]
            if (!((i == (w.length - 1)) || (i == 9))){
                str = str + ", "
            }
        }
        API.sendChat(str)
    }
}

function chat(data){
    if(data.message == "whereami"){
        pos = API.getWaitListPosition(data.fromID)
        if (pos == -1){
            API.sendChat("@" + data.from + ", you are not in the waitlist.")
        }
        else{
            API.sendChat("@" + data.from + ", you are position " + String(pos + 1) + " in line.")
        }
    }
}
setInterval(checkDJ,3000)
API.on(API.CHAT_COMMAND, command)
API.on(API.CHAT, chat)
