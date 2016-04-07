(function ( $, taxPercent ) {
    function removeFeeAndAddPriging( number ) {
        return Math.round(number * (100 - taxPercent)) / 100;
    }

    $('.a-color-price').each(function () {
        var self = $(this);
        var priceBeforeFee = ($.trim(self.text()).slice(1) - 0);
        var shippingValue = $.trim(self.parent().find('.a-color-secondary').text() || '');
        var shippingBeforeFee = 0;
        if ( shippingValue && shippingValue.indexOf('shipping') !== -1 ) {
            shippingBeforeFee = $.trim(shippingValue.replace('+ $', '').replace(' shipping', '')) - 0;
        }

        var title = '$' + removeFeeAndAddPriging(priceBeforeFee + shippingBeforeFee);
        title += shippingBeforeFee ? ' (include shipping)' : '';
        self.attr({ title: 'after 15% fee ' + title }).css({ position: 'relative' })
            .append($('<div>').css({
                position: 'absolute',
                color: 'green',
                top: '-6px',
                'font-size': '8px',
                'white-space': 'nowrap'
            }).text(title));
    });
})(jQuery, 15);
