import '../server'

function getData(data) {
    var x = document.getElementById("LeftBox");
    x.style.color = data;
}

module.exports(getData())
