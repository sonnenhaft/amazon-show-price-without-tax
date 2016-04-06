var priceRegex = /<span class="a-size-medium a-color-price sc-price sc-white-space-nowrap sc-product-price sc-price-sign a-text-bold"\>(\$[\d.]+)\<\/span\>/g
jQuery.get('https://www.amazon.com/gp/cart/view.html/ref=gno_cart').then(function(cartPage){
  var matches, prices = [];
  while (matches = priceRegex.exec(cartPage)) {
    prices.push(matches[1]);
  }
  var sum = prices.reduce(function(sum, price){
    sum += price.slice(1) - 0;
    return sum;
  }, 0);
  jQuery('#status').text('sum is $' + sum);
});

