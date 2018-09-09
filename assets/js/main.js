/*MobileOverlay*/
(function($) {
    "use strict";
    jQuery(document).ready(function() {
        jQuery("#toggle").click(function() {
            "fixed" != jQuery("body").css("position") ? jQuery("body").css("position", "fixed") : jQuery("body").css("position", "relative"), jQuery(this).toggleClass("active"), jQuery(".overlay").toggleClass("open")
        })
    });
})(jQuery);
