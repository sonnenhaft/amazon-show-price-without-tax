(function ( $, taxPercent ) {
    function removeFeeAndAddPriging( number ) {
        return Math.round(number * (100 - taxPercent)) / 100;
    }

    $('.a-color-price').each(function () {
        var self = $(this);
        var priceBeforeFee = $.trim(self.text()).replace(/[^\d\.\-]/g, '') - 0;
        var shippingValue = $.trim(self.parent().find('.a-color-secondary').text() || '');
        var shippingBeforeFee = 0;
        if ( shippingValue && shippingValue.indexOf('shipping') !== -1 ) {
            shippingBeforeFee = $.trim(shippingValue.replace('+ $', '').replace(' shipping', '')) - 0;
        }

        var fullFee = removeFeeAndAddPriging(priceBeforeFee + shippingBeforeFee);
        if ( !isNaN(fullFee) ) {
            var title = '$' + fullFee;
            title += shippingBeforeFee ? ' (include shipping)' : '';
            self.attr({ title: 'after 15% fee ' + title }).css({ position: 'relative' })
                .append($('<div>').css({
                    position: 'absolute',
                    color: 'green',
                    top: '-8px',
                    'font-size': '9px',
                    'white-space': 'nowrap',
                    'background': 'white'
                }).text(title));
        }
    });
})(jQuery, 15);
