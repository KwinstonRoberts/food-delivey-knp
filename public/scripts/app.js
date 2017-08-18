$(document).ready(function(){

  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = {37: 1, 38: 1, 39: 1, 40: 1};

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
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
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


  $('.cta').on('click','button',function(){
    $('.cta').slideUp();
    $('#menu').slideDown();
    enableScroll();
  })

  $('.options>button').on('click',function(e){
    $(this).toggleClass('active');
  });

  $('.dish').on('click',function(){
    $.ajax({
      type:'GET',
      url:`/menu/${$(this).find('.foodItemTitle').text()}`,
      success: function(data){
        //console.log(data);
        $('#details').find('h2').text(data.dish.name);
        $('#details').find('p').text(data.dish.description);
        $('#details').find('b').text('$' + data.dish.price);
        $('#details').find('img').attr('src',data.dish.pic);
      },
      error: function(err){
        console.log(err);
      }
    });
  })

  $('.options>button').on('click',function(e){
    $(this).toggleClass('active');
  });

  $('#cart-btn').on('click','button',function(){
    console.log('cart button cicked')
    $.ajax({
      type:'POST',
      url:`/cart`,
      data:{name:$('#details').find('h2').text(),quantity:$('#qty').val()},
      success: function(data){
        console.log(data.items);
      }
    });
  })

  $('.options>button').on('click',function(e){
    $(this).toggleClass('active');
  });


  $('.table-inverse').on('click', function(e){
    $(this).toggleClass('active');
  });


});
