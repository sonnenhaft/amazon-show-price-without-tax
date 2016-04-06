(function ( $ ) {
    var PRICE_REGEX = /<span class="a-size-medium a-color-price sc-price sc-white-space-nowrap sc-product-price sc-price-sign a-text-bold"\>(\$[\d.]+)\<\/span\>/g;
    var ADD_TO_CHART_BUTTONS = '[name="submit.addToCart"], [name="submit.add-to-cart"], [value="Customize and Add to Cart"]';
    var CART_URL = 'https://www.amazon.com/gp/cart/view.html/ref=gno_cart';
    $.get(CART_URL).then(replaceButtons);

    function replaceButtons( cartPage ) {
        var matches, prices = [];
        while ( matches = PRICE_REGEX.exec(cartPage) ) {
            prices.push(matches[ 1 ]);
        }
        var sum = prices.reduce(function ( sum, price ) {
            sum += price.slice(1) - 0;
            return sum;
        }, 0);

        $(ADD_TO_CHART_BUTTONS).attr({
            title: sum + ' look what you did - may be time to stop?'
        }).next('span').text('you already bought ' + sum);
    }
})(jQuery);
