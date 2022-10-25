async function getData(){
    const url = "https://api.portalmec.c3sl.ufpr.br/v1/learning_objects"
    const resp = await fetch(url)
    const red = await resp.json()
    for(var i = 0; i < 15; i++){
        redCreator(red[i])
    }
}
getData()

const reds = document.querySelector("#reds")

function redCreator(red){
    const redCard = document.createElement("div")
    redCard.classList.add("redCard")
    redCard.setAttribute("onclick", "showAll(this)");

    // Tratamento para o caso em que existam muitos autores.
    if(red.author.length > 60){
        var counter = 0
        for(var i = 0; i < red.author.length; i++){
            if(red.author[i] == ','){
                counter++;
            }
            if(counter == 1){
                var author = red.author.substr(0, i+1) + " ..."
            }
        }
    }else{
        var author = red.author
    }

    if(red.description.length > 40){
        for(var i = 0; i < red.description.length; i++){
            if(red.description[i] == '.'){
                var description = red.description.substr(0, i+1)
                i = red.description.length
            }
        }
    }else{
        var description = red.description
    }

    const cardInfo = `
        <div class="redCategory">
            <p>${red.object_type}</p>
        </div>
        <div class="redImage">
            <img src="./resources/redImage.png">
        </div>
        <div class="redName">${red.name}</div>
        <div class="redAuthor">${author}</div>
        <div class="descButton" onmouseover="showDesc(${red.id})" onmouseout="hideDesc(${red.id})">Mostrar Descrição</div>
        <div class="redDescription" id="${red.id}">${description}</div>

        <div class="fullDescription">${red.description}</div>
        <div class="fullAuthor">${red.author}</div>
        <div class="fullLikes">${red.likes_count}</div>
        <div class="fullViews">${red.views_count}</div>
        <div class="fullScore">${(red.score*10).toFixed(1)}</div>
        <div class="fullSubject">${red.subjects[0].name}</div>
    `
    redCard.innerHTML = cardInfo
    reds.appendChild(redCard);
}

function showAll(card){
    document.getElementById("fullRedCategory").innerHTML = card.querySelector(".redCategory").innerText
    document.getElementById("fullRedName").innerHTML = card.querySelector(".redName").innerHTML
    document.getElementById("fullRedAuthor").innerHTML = card.querySelector(".fullAuthor").innerHTML
    document.getElementById("fullRedDescription").innerHTML = card.querySelector(".fullDescription").innerHTML
    document.getElementById("score").innerHTML = card.querySelector(".fullScore").innerHTML
    document.getElementById("likes").innerHTML = card.querySelector(".fullLikes").innerHTML
    document.getElementById("views").innerHTML = card.querySelector(".fullViews").innerHTML
    document.getElementById("subject").innerHTML = card.querySelector(".fullSubject").innerHTML
    
    document.querySelector("#background").style.visibility = "visible"
    document.querySelector("#background").style.opacity = "1"

    document.querySelector("#fullRedPage").style.visibility = "visible"
    document.querySelector("#fullRedPage").style.opacity = "1"
}

function showDesc(id){
    document.querySelector("[id=" + CSS.escape(id) + "]").style.visibility = "visible"
    document.querySelector("[id=" + CSS.escape(id) + "]").style.opacity = "1"
}

function hideDesc(id){
    document.querySelector("[id=" + CSS.escape(id) + "]").style.visibility = "hidden"
    document.querySelector("[id=" + CSS.escape(id) + "]").style.opacity = "0"
}

function switchMode(switcher){
    if(switcher.checked == true){
        const categories = document.getElementsByClassName("redCategory")
        const buttons = document.getElementsByClassName("descButton")

        for (var i = 0; i < categories.length; i++) {
            categories[i].style.backgroundColor = "#2f2f2f";
        }

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = "#2f2f2f";
        }


        document.querySelector("#fullRedCategory").style.backgroundColor = "#2f2f2f";
        document.querySelector("#closeButton").style.backgroundColor = "#2f2f2f";
        document.body.style.backgroundColor = "#404040";
    }else{
        const categories = document.getElementsByClassName("redCategory")
        const buttons = document.getElementsByClassName("descButton")

        for (var i = 0; i < categories.length; i++) {
            categories[i].style.backgroundColor = "#e6ac19";
        }
        
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = "#e6ac19";
        }

        document.body.style.backgroundColor = "white";
   }
}

function closeRed(){
    document.querySelector("#background").style.visibility = "hidden"
    document.querySelector("#background").style.opacity = "0"

    document.querySelector("#fullRedPage").style.visibility = "hidden"
    document.querySelector("#fullRedPage").style.opacity = "0"
}