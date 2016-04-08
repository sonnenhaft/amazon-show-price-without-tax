(function ( $, taxPercent ) {
    function removeFeeAndAddPriging( number ) {
        return Math.round(number * (100 - taxPercent)) / 100;
    }

    function getAsinInParent( element ) {
        return (/asin=(.+)\&amp\;seller/.exec(element.closest('.olpOffer').html()) || [])[ 1 ];
    }

    function getSeller( element ) {
        var x = element.closest('.olpOffer').html();
        return ' seller: ' + (/seller=(.+)\&amp\;sshmPath/.exec(x) || [])[ 1 ];
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
            //title += self.closest('[data-asin]').attr('data-asin') || getAsinInParent(self);
            self.attr({ title: 'after 15% fee ' + title }).css({ position: 'relative' }).append($('<div>').css({
                position: 'absolute',
                color: 'green',
                top: '-3px',
                'font-size': '9px',
                'line-height': '8px',
                'white-space': 'nowrap',
                'background': 'white'
            }).text(title));
        }
    });
})(jQuery, 15);
