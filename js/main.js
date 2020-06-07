"use strict";

(function($) {
	//// Function that determines when to make the nav bar transparent or not
	var menu_color_function = function() {
		var scroll = $(window).scrollTop();
		if (scroll <= 300) {
			$("#menu").addClass("nav-transparent");
		} else {
			$("#menu").removeClass("nav-transparent");
		}
	}
	//// On the event of the window scroll, fire 'menu_color_function' function.
	$(window).scroll(menu_color_function);
	//// Pre-fire the event to set the current and appropriate 'menu_color_function'
	menu_color_function();

	$(".navbar-nav li a").click(function (event) {
		// check if window is small enough so dropdown is created
		var toggle = $(".navbar-toggle").is(":visible");
		if (toggle) {
			$(".navbar-collapse").collapse('hide');
		}
	});

	$(".dial").knob({
		draw : function () {
			// "tron" case
			if(this.$.data('skin') == 'tron') {
				var a = this.angle(this.cv)  // Angle
					, sa = this.startAngle          // Previous start angle
					, sat = this.startAngle         // Start angle
					, ea                            // Previous end angle
					, eat = sat + a                 // End angle
					, r = 1;

				this.g.lineWidth = this.lineWidth;

				this.o.cursor
					&& (sat = eat - 0.3)
					&& (eat = eat + 0.3);

				if (this.o.displayPrevious) {
					ea = this.startAngle + this.angle(this.v);
					this.o.cursor
						&& (sa = ea - 0.3)
						&& (ea = ea + 0.3);
					this.g.beginPath();
					this.g.strokeStyle = this.pColor;
					this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
					this.g.stroke();
				}

				this.g.beginPath();
				this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
				this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
				this.g.stroke();

				this.g.lineWidth = 2;
				this.g.beginPath();
				this.g.strokeStyle = this.o.fgColor;
				this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
				this.g.stroke();

				return false;
			}
		}
	});
	var stats = {
		"comp": $("#comp").html(),
		"rovers": $("#rovers").html(),
		"outreach": $("#outreach").html(),
		"remote": $("#remote").html(),
		"disciplines": $("#disciplines").html()
	};

	$(document).on("click", ".info", function(e) {
        bootbox.alert(stats[$(this).attr("data-info")], function() {
            console.log("Done!");
        });
    });
})(jQuery); // End of use strict