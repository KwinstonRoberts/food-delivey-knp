$(document).ready(function() {

  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
  };

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
      e.preventDefault();
    e.returnValue = false;
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  function disableScroll() {
    if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
  }
  disableScroll();

  function enableScroll() {
    if (window.removeEventListener)
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
  }


// Function to create Order Receipt

  function createOrderContentHTML(data) {

     var orderContentHtml = '';

      orderContentHtml += `<table class="table table-inverse cart-subtotal">
      <thead>

        <tr>
          <th>Items</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>SubTotal</th>
        </tr>

      </thead>
      <tbody>

      `;

      for (arr of data['cart']) {

        orderContentHtml += `<tr>
         <td> <p> ${arr.name} </p> </td>
         <td> <p> ${arr.quantity} </p> </td>
         <td> <p> ${arr.price} </p> </td>
         <td> <p> $${(arr.price * arr.quantity.toFixed(2))} <p> </td>
          </tr>
        `;
      }

      orderContentHtml += ' </tbody> </table>';


      var sumTotal = 0;

      for (arr of data['cart']) {
        sumTotal += (arr.price * arr.quantity.toFixed(2))
      }


      orderContentHtml += `<table>
        <thead>
          <tr>
            <td> <p>                         </p> </td>
            <td> <p>                         </p> </td>
            <td> <p>                         </p> </td>
            <th> Total Cost </th>
          </tr>

        </thead>
        <tbody>
          <tr>
            <td> <p>                         </p> </td>
            <td> <p>                         </p> </td>
            <td> <p>                         </p> </td>
            <td> <p> $${sumTotal} </p> </td>
          </tr>
        </tbody>

      </table>`

    return orderContentHtml;

  }


//  Function to create Cart Content (Addition to Order Content Form)

  function createCartContentHTML(data) {
    var cartContentHtml = createOrderContentHTML(data)

        cartContentHtml += `<button class='checkout' data-toggle="modal" data-target="#myModal"> Checkout </button>`

    return cartContentHtml;

  }

  $('.cta').on('click', 'button', function() {

    $('.background').fadeTo('slow', 0);
    $('.background').slideUp();
    $('#menu').slideDown();
    enableScroll();
  })

  $('.options>button').on('click', function(e) {
    $(this).toggleClass('active');
  });

  $('.dish').on('click', function() {
    $.ajax({
      type: 'GET',
      url: `/menu/${$(this).find('.foodItemTitle').text()}`,
      success: function(data) {
        //console.log(data);
        $('#details').find('h2').text(data.dish.name);
        $('#details').find('p').text(data.dish.description);
        $('#details').find('b').text('$' + data.dish.price);
        $('#details').find('img').attr('src', data.dish.pic);
        $('#details').find('button.add-to-cart').data('dish-id', data.dish.id);
      },
      error: function(err) {
        console.log(err);
      }
    });
  })

  $('.options>button').on('click', function(e) {
    $(this).toggleClass('active');
  });

  $('.add-to-cart').on('click', function() {
    $.ajax({
      type: 'POST',
      url: `/cart`,
      data: {
        name: $('#details').find('h2').text(),
        quantity: $('#qty').val()
      },
      success: function(data) {
        console.log(data.items);
      }
    });
  })

  $('.options>button').on('click', function(e) {
    $(this).toggleClass('active');
  });

  $('.table-inverse').on('click', function(e) {
    $(this).toggleClass('active');
  });


  $('#show-cart-button').on('click', function(e) {

    $.ajax({
      type: 'Get',
      url: '/cart',
      success: function(data) {

        $('#cart-content').html(createCartContentHTML(data))
        $('#orderDetails').html(createOrderContentHTML(data))

      }
    })
  })

  $('#orderButton').on('click', function(e) {
    $.ajax({
      type: 'Get',
      url: '/cart',
      success: function(data) {
        var orderReceipt = [];
        orderReceipt.push('====================\n');
        for (arr of data['cart']) {
          // console.log(arr.name, arr.quantity, arr.price, (arr.price * arr.quantity.toFixed(2)) )
          var orderObject = '' + arr.name + ':\nquantity' + arr.quantity + '\nprice: ' + arr.price + '\nsubtotal: ' + (arr.price * arr.quantity.toFixed(2));
          orderReceipt.push(orderObject)
          orderReceipt.push('-------------------------\n');
        //console.log(orderReceipt)
        }
        orderReceipt.push('====================\n');

        $.ajax({
          type: 'POST',
          url: '/order',
          data: {
            name: $('#orderForm').find('#name').val(),
            email: $('#orderForm').find('#email').val(),
            receipt: orderReceipt.join('\n')
          },
          success: function(data) {
            console.log('receipt inside ajax call', receipt)
          }
        })

      }
    })
  })

  $('.card').hover(function() {
    $(this).find('.card-block').toggle('slow', function() {});
  });

});
