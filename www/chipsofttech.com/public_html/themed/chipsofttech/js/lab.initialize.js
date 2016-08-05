/* * * * * * * * * * * * * * * * * * * * * * * * * * * *

Chippewa Software Technology Extension
© 2010 ChipSoftTect
All Rights Reserved

* * * * * * * * * * * * * * * * * * * * * * * * * * * */

function ChipSoftTech() { };
(function () {
    window.s2 = {
        boot: function () {

            //  Separate Internal and External Links

            $("a[href^='http://']")
				.not("a[href^='http://www.ChipSoftTech.com']")
				.not("a[href^='http://ChipSoftTech.com']")
				.addClass("ext");
            $("a.ext").attr("target", "_blank");


            //  Handle Pod Hovers and Animation

            $(".pod").bind("mouseenter", function () {
                $(this).find(".podTitle").stop(false, true).slideDown(100);
            })
			.bind("mouseleave", function () {
			    $(this).find(".podTitle").slideUp(500);
			});
            var ripOnce = window.setTimeout("s2.podVision()", 60 * 1000);
            var rippler = window.setInterval("s2.podVision()", 120 * 1000);


            //  Handle Search Form Submit

            $("#search").submit(function () {
                //document.location.href = 'http://ChipSoftTech.org/search/' + $( '#tags' ).attr( 'value' ) + "/";
                var searchQ = $('#tags').attr('value');
                searchQ = searchQ.toLowerCase();
                searchQ = searchQ.replace(/ /g, "+");
                searchQ = searchQ.replace(/'/g, "");
                searchQ = searchQ.replace(/#/g, "");
                searchQ = escape(searchQ);
                $("#search").attr("action", "http://ChipSoftTech.org/search/" + searchQ + "/");
                return true;
            });
            return this;
        },


        tagRead: function () {
            var tags = $("#tags").val;
            tags = s2.tagClean(tags);
            return this;
        },
        tagWrite: function (tags) {
            tags = s2.tagClean(tags);
            $("#tags").val = tags;
        },
        tagAdd: function (t) {
            var tags = s2.tagRead();
            if (tags.indexOf(t) > -1) {
                s2.tagRemove(t);
            }
            else {
                tags += ", " + t;
                s2.tagWrite(tags);
                s2.tagRemove("all");
            };
            return this;
        },
        tagRemove: function (t) {
            var tags = s2.tagRead();
            tags = tags.replace("+" + t, "");
            tags = tags.replace(t, "");
            tags = s2.tagClean(tags);
            if (!tags.length) tags = "all";
            s2.tagWrite(tags);
            return this;
        },
        tagClean: function (tags) {
            tags = $.trim(tags);
            if (tags.substring(0, 1) == "+") tags = tags.substring(1);
            if (tags.substring(-1) != "+") tags = tags.substring(0, tags.length);
            tags = $.trim(tags);
            return this;
        },

        podRipple: function () {
            for (var i = 0; i < $(".podTank").children().length; i++) {
                var child = $(".podTank").children()[i];
                var delay = 1 + i * 50;
                $(child).find(".podSurprise")
					.animate({ opacity: 1.0 }, delay)
					.slideDown(500)
					.animate({ opacity: 1.0 }, 1500)
					.slideUp(500);
            };
            return this;
        },


        podVision: function () {

            //  Determine Grid Dimensions

            var gridWidth = 0;
            var gridHeight = 0;
            for (var i = 0; i < $(".podTank").children().length; i++) {
                var child = $(".podTank").children()[i];
                $(child).find(".popSurprise img").attr("src", "med/ChipSoftTech.hero.03.gif");
                var width = parseInt($(child).offset()["left"] + $(child).width(), 10);
                var height = parseInt($(child).offset()["top"] + $(child).height(), 10);
                gridWidth = Math.max(gridWidth, width);
                gridHeight = Math.max(gridHeight, height);

            };
            gridHeight -= $(".podTank").offset()["top"];


            //  Preserve Aspect Ratio and Center

            var ratio = 1.5;
            //ratio = 1;
            /* var width  = parseInt( $( child ).find( ".itemBack img" ).width()  );
            var height = parseInt( $( child ).find( ".itemBack img" ).height() );
            var ratio  = width / height; */
            var scaledWidth = gridWidth;
            var scaledHeight = gridHeight;
            if (gridWidth / gridHeight > ratio) scaledHeight = scaledWidth / ratio;
            if (gridWidth / gridHeight < ratio) scaledWidth = scaledHeight * ratio;
            var xOffset = (scaledWidth - gridWidth) / 2;
            var yOffset = (scaledHeight - gridHeight) / 2;


            //  Apply to Cells

            for (var i = 0; i < $(".podTank").children().length; i++) {
                var child = $(".podTank").children()[i];
                var x = parseInt($(child).offset()["left"]);
                var y = parseInt($(child).offset()["top"]) - $(".podTank").offset()["top"];
                $(child).find(".podSurprise img").css(
				{
				    left: (x * -1 - xOffset) + "px",
				    top: (y * -1 - yOffset) + "px",
				    width: scaledWidth + "px",
				    height: scaledHeight + "px"
				});
            };
            s2.podRipple();
            return this;
        },


        gridToggle: function () {
            var bg = $("body").css("background-image");
            if (bg == "none") {
                $("body").css("background-image", "url( 'med/global.grid.png' )");
                $("#gridToggle").html("Hide Grid");
            }
            else {
                $("body").css("background-image", "none");
                $("#gridToggle").html("Show Grid");
            };
            return this;
        }


    };
})();
$(window).bind("load", function () {
    s2.boot();
});

