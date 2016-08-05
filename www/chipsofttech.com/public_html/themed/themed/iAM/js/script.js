$(document).ready(function () {
    //    $.preloadCssImages();
    getLocation();
    var selectedPic;
    var selectedCountry;
    var selectedRegion;
    var selectedCity;
    var selectedEmail;

    // Executed once all the page elements are loaded
    var preventClick = false;

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
                selectedRegion = $('#region').val();
                selectedCity = $('#city').val();
                selectedEmail = $('#email').val();
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
            selectedCity = loc.address.city;
            /*, City: <strong>' +
            loc.address.city + '</strong>, Lat/Long: <strong>' + loc.latitude + ', ' + loc.longitude + '</strong>'; */
        }
        jQuery('.geolocation').html(location);
        jQuery('.loc').html(location);
        jQuery('#region').val(selectedRegion);
        jQuery('#city').val(selectedCity);
    }

    function execWrite() {
        var webMethod = 'fishingPole.asmx/Cast'
        var i =
		'{"FishingLicense":"LC98529F-7352-4229-9A76-B274398C7049",' +
		'"FishingBaitName":"iAMInsert", ' +
		'"FishingBaitParms":[' +
		'{"ParmName":"Personality", "ParmValue":"' + selectedPic + '"},' +
		'{"ParmName":"Country", "ParmValue":"' + selectedCountry + '"},' +
		'{"ParmName":"Region", "ParmValue":"' + selectedRegion + '"},' +
		'{"ParmName":"City", "ParmValue":"' + selectedCity + '"},' +
		'{"ParmName":"Email", "ParmValue":"' + selectedEmail + '"}' +
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
    }

    function AjaxSucceeded(result) {
        //alert(result.d);
        window.location.href = 'iamresults.html';
    }

    function AjaxFailed(result) {
        alert(result.status + ' \n\r ' + result.statusText + ' \n\r ' + result.responseText);
    }

});