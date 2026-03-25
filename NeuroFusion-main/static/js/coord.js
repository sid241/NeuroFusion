var mriCoord = [];
var ctCoord = [];
var points = window.points || 5;

function FindPosition(oElement) {
    if (typeof (oElement.offsetParent) != "undefined") {
        for (var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
            posX += oElement.offsetLeft;
            posY += oElement.offsetTop;
        }
        return [posX, posY];
    }
    else {
        return [oElement.x, oElement.y];
    }
}

function GetCoordinatesMri(e) {
    if (mriCoord.length < points) {
        var PosX = 0;
        var PosY = 0;
        var ImgPos;
        ImgPos = FindPosition(myImgMri);
        if (!e) var e = window.event;
        if (e.pageX || e.pageY) {
            PosX = e.pageX;
            PosY = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            PosX = e.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
            PosY = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
        }
        PosX = PosX - ImgPos[0];
        PosY = PosY - ImgPos[1];
        
        mriCoord.push([PosX, PosY]);
        document.getElementById("mriX").innerHTML = PosX;
        document.getElementById("mriY").innerHTML = PosY;

        alert("MRI Point " + mriCoord.length + " selected: (" + PosX + ", " + PosY + ")");
    } else {
        alert("Can't exceed number of points (" + points + ")");
    }
}

function GetCoordinatesCt(e) {
    if (ctCoord.length < points) {
        var PosX = 0;
        var PosY = 0;
        var ImgPos;
        ImgPos = FindPosition(myImgCt);
        if (!e) var e = window.event;
        if (e.pageX || e.pageY) {
            PosX = e.pageX;
            PosY = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            PosX = e.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
            PosY = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
        }
        PosX = PosX - ImgPos[0];
        PosY = PosY - ImgPos[1];

        ctCoord.push([PosX, PosY]);
        document.getElementById("ctX").innerHTML = PosX;
        document.getElementById("ctY").innerHTML = PosY;

        alert("CT Point " + ctCoord.length + " selected: (" + PosX + ", " + PosY + ")");
    } else {
        alert("Can't exceed number of points (" + points + ")");
    }
}

function sendParameters() {
    if (mriCoord.length < points || ctCoord.length < points) {
        alert("Please select all " + points + " points on both images before submitting.");
        return;
    }

    console.log("Submitting coordinates...");

    $.post('/register', {
        mriCoord: JSON.stringify(mriCoord),
        ctCoord: JSON.stringify(ctCoord)
    }).done(function (res) {
        location.href = '/registerimage';
    }).fail(function (err) {
        console.error("Error during registration:", err);
        alert("An error occurred during registration. Check terminal for details.");
    });
}