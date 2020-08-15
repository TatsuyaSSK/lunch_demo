var mapLatLng = new google.maps.LatLng(35.6619, 139.6669); //下北沢駅の座標
var Options = {
    zoom: 15,      //地図の縮尺値
    center: mapLatLng
};

var map = new google.maps.Map(document.getElementById('map'), Options);

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("text/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("./tabelog_shimokita.json", function(text){
    var data = JSON.parse(text);
    console.log(data.length);

    for (let index = 0; index < 30; index++) {

      setMarkerData(index);

    }

    function setMarkerData(n){

        posit = {lat:data[n]["緯度"], lng:data[n]["経度"]};
        var marker = new google.maps.Marker({position: posit,map: map}); 

        var infowindow = new google.maps.InfoWindow({content: data[n]["店名"]});
        marker.addListener("click",function(){
            infowindow.open(map,marker);

            var t_body = document.getElementById("t_body");

            console.log("hoge")

            var row = document.createElement("tr");
            var cell = document.createElement("td");
            var celltext = document.createTextNode(data[n]["店名"]);
            cell.appendChild(celltext);
            row.appendChild(cell);
            var cell = document.createElement("td");
            var celltext = document.createTextNode(data[n]["ジャンル"]);
            cell.appendChild(celltext);
            row.appendChild(cell);
            var cell = document.createElement("td");
            var celltext = document.createTextNode(data[n]["予算（口コミ集計）"]);
            cell.appendChild(celltext);
            row.appendChild(cell);

            console.log("aoge")

            t_body.appendChild(row);
        
        });
    }

document.getElementById("clear-cap").onclick = function(){
    var t_body = document.getElementById("t_body");
    while (t_body.hasChildNodes()){
        t_body.removeChild(t_body.firstChild);
    }
}


});