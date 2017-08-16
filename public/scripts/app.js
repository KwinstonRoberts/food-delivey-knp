

$(document).ready(function(){
  $('.cta').on('click','button',function(){
    $('.cta').slideUp();
    $('#menu').slideDown();
  })

  $('.options>button').on('click',function(e){
    $(this).toggleClass('active');
  });

});
