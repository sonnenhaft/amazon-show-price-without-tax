(function ( $, taxPercent ) {
    function formatNumber( number ) {
        return Math.round(number * (100 - taxPercent)) / 100;
    }

    $('.a-color-price').each(function () {
        var self = $(this);
        var oldHover = self.attr('title') || '';
        var earningAfterTax = (self.text().slice(1) - 0);
        self.attr({
            title: oldHover + ' [ dealer will earn: $' + formatNumber(earningAfterTax) + ' ]'
        });
    });

})(jQuery, 33);
