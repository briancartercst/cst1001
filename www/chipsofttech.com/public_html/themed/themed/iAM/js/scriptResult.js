$(document).ready(function () {
    getLocation();
    execRead();

    var selectedPic;
    var selectedCountry;
    var selectedRegion;

    // Executed once all the page elements are loaded
    var preventClick = false;

    $(".reload").bind("click", function (e) {
        //alert('clicked');
        execRead();
        //alert('after clicked');
    });

    $(".pic a").bind("click", function (e) {
        /* This function stops the drag from firing a click event and showing the lightbox */
        if (preventClick) {
            e.stopImmediatePropagation();
            e.preventDefault();
        }
    });

    $(".pic").draggable({
        /* Converting the images into draggable objects */
        containment: 'parent',
        start: function (e, ui) {
            /* This will stop clicks from occuring while dragging */
            preventClick = true;
        },

        stop: function (e, ui) {
            /* Wait for 250 milliseconds before re-enabling the clicks */
            setTimeout(function () { preventClick = false; }, 250);
        }
    });

    $('.pic').mousedown(function (e) {

        /* Executed on image click */
        var maxZ = 0;

        /* Find the max z-index property: */
        $('.pic').each(function () {
            var thisZ = parseInt($(this).css('zIndex'))
            if (thisZ > maxZ) maxZ = thisZ;
        });

        /* Clicks can occur in the picture container (with class pic) and in the link inside it */
        if ($(e.target).hasClass("pic")) {
            /* Show the clicked image on top of all the others: */
            $(e.target).css({ zIndex: maxZ + 1 });
        }
        else $(e.target).closest('.pic').css({ zIndex: maxZ + 1 });
    });

    /* Converting all the links to a fancybox gallery */
    $("a.fancybox").fancybox({
        zoomSpeedIn: 300,
        zoomSpeedOut: 300,
        overlayShow: false
    });

    /* Converting the share box into a droppable: */
    $('.drop-box').droppable({
        hoverClass: 'active',
        drop: function (event, ui) {
            selectedPic = ui.draggable.attr('id').replace(/_/g, ' ');
            $('.selectedPic').html(selectedPic);
            $('#modal').dialog('open');
        }
    });

    /* Converts the div with id="modal" into a modal window  */
    $("#modal").dialog({
        bgiframe: true,
        modal: true,
        autoOpen: false,
        buttons: {
            Ok: function () {
                execWrite();
                $(this).dialog('close');
            }
        }
    });

    if (location.hash.indexOf('#pic-') != -1) {
        /* Checks whether a hash is present in the URL */
        /* and shows the respective image */
        $(location.hash + ' a.fancybox').click();
    }

    function getLocation() {
        //GeoLocation
        var location = 'Unable to determine your location.';
        if (google.loader.ClientLocation) {
            var loc = google.loader.ClientLocation;
            var cookieName = "Country"; // Cookie Name
            var nDays = 5; // Num of Days before cookie expires
            var today = new Date();
            var expire = new Date();
            if (nDays == null || nDays == 0) nDays = 1;
            expire.setTime(today.getTime() + 3600000 * 24 * nDays);
            document.cookie = cookieName + "=" + loc.address.country_code + ";expires=" + expire.toGMTString();
        }

        if (google.loader.ClientLocation) {
            var loc = google.loader.ClientLocation;
            location = 'Country: <strong>' + loc.address.country + '</strong>, Region: <strong>' + loc.address.region + '</strong>';
            selectedCountry = loc.address.country;
            selectedRegion = loc.address.region;
            /*, City: <strong>' +
            loc.address.city + '</strong>, Lat/Long: <strong>' + loc.latitude + ', ' + loc.longitude + '</strong>'; */
        }
        jQuery('.geolocation').html(location);
        jQuery('.loc').html(location);
    }

    function execRead() {
        //alert("execRead begin");

        var webMethod = 'fishingPole.asmx/Cast'
        var i =
		'{"FishingLicense":"LC98529F-7352-4229-9A76-B274398C7049",' +
		'"FishingBaitName":"iAMSelectResult", ' +
		'"FishingBaitParms":[' +
		'{"ParmName":"PageSize", "ParmValue":"' + "1000" + '"},' +
		'{"ParmName":"PageNumber", "ParmValue":"' + "1" + '"}' +
		']}';

        var data2Send = '{"fishingBox":' + i + '}';
        //alert("Data = " + data2Send);

        $.ajax({
            type: "POST",
            url: webMethod,
            data: data2Send,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) { AjaxSucceeded(msg); },
            error: AjaxFailed
        });

        // alert("execRead End");
    }

    function AjaxSucceeded(result) {
        //alert(result.d);
        $(".results").fadeOut();
        var strResult;
        var obj = JSON.parse(result.d);

        strResult = "<table>";
        strResult = strResult + "<tr><th>Country</th><th>Region</th><th>City</th><th>Personality</th><th>Count</th></tr>";

        $.each(obj.Result, function (index, value) {
            // work with value
            //alert(value.Country + value.Region + value.Personality + value.Count);
            strResult = strResult + "<tr>" +
                                    "<td>" + value.Country + "</td>" +
                                    "<td>" + value.Region + "</td>" +
                                    "<td>" + value.City + "</td>" +
                                    "<td>" + value.Personality + "</td>" +
                                    "<td>" + value.Count + "</td>" +
                                    "</tr>";
        });

        strResult = strResult + "</table>";

        $('.results').html(strResult);
        $(".results").fadeIn();
    }

    function AjaxFailed(result) {
        //alert(result.status + ' \n\r ' + result.statusText + ' \n\r ' + result.responseText);
    }

    // implement JSON.parse de-serialization
    JSON.parse = JSON.parse || function (str) {
        if (str === "") str = '""';
        eval("var p=" + str + ";");
        return p;
    };

    // implement JSON.stringify serialization
    JSON.stringify = JSON.stringify || function (obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';
            return String(obj);
        }
        else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);
            for (n in obj) {
                v = obj[n]; t = typeof (v);
                if (t == "string") v = '"' + v + '"';
                else if (t == "object" && v !== null) v = JSON.stringify(v);
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };

});