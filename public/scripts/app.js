

$(document).ready(function(){
  $('.cta').on('click','button',function(){
    $('.cta').slideUp();
    $('#menu').slideDown();
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


});
