$(document).ready(function() {

  var counter = 3;

  $('.todo-option li').click(function() {
    // 取得被點擊的 li 的索引位置並加一
    var choose = $(this).index() + 1;
    // 移除被點擊外的 li 的 class
    $('.todo-option li').removeClass('active');
    // 被點擊的 li 增加 class
    $(this).addClass('active');

    $('.todo-content ul').removeClass('active');
    $('.todo-content ul:nth-child('+ choose +')').addClass('active');
  });

  // 移除待辦事項
  $('.todo-content .todo-all').on('click', '.trash', function() {
    todo_id = $(this).parent().parent().attr('class');
    
    $(this).parent().parent().fadeOut(1000, function() {
      $(this).remove();
      many_todo();
    });
    $('.todo-pending .' + todo_id).remove();
    $('.todo-done .' + todo_id).remove();
    counter = counter - 1;

  });

  $('.todo-content .todo-all').on('click', '.pencil', function() {
    // 將待辦事項的值存入 updata 裡
    var updata = $(this).parent().parent().children('p').text();
    todo_id = $(this).parent().parent().attr('class');
    $('.todo-info').removeClass('active');
    $('.todo-form').removeClass('active');
    $('.todo-updata').addClass('active');

    // 將 updata 帶入 input 裡
    $('.todo-updata .updata-field').val(updata);

  });

  $('.cancel').click(function() {
    $('.todo-form .new-field').val('');
    $(this).parent().removeClass('active');
    $('.todo-info').addClass('active');
  });

  // 編輯待辦項目
  $('.todo-updata .updata-btn').click(function(event) {

    event.preventDefault();

    var text = $('.todo-updata .updata-field').val();
    alert(text);
    console.log(todo_id);

    if(text.length >= 1) {
      $('.' + todo_id).children('p').text(text);
      $('.todo-updata .updata-field').val('');
    } else {
      alert('請輸入待辦項目');
      $('.todo-updata .updata-field').focus();
      return false;
    }

    $('.todo-updata').removeClass('active');
    $('.todo-info').addClass('active');

  });

  // 編輯待辦項目的 keydown 事件
  $('.todo-updata .updata-field').keydown(function(e) {
    var text = $('.todo-updata .updata-field').val();

    if(e.keyCode == 13 && text.length !== 0) {
      e.preventDefault();
      $('.' + todo_id).children('p').text(text);
      $('.todo-updata .updata-field').val('');
      $('.todo-updata').removeClass('active');
      $('.todo-info').addClass('active');
    } else {
      if(e.keyCode == 13 && text.length === 0) {
        alert('請輸入待辦項目');
        $('.todo-updata .updata-field').focus();
        return false;
      }
    }

  });

  $('.add-todo .todo-info').click(function() {
    $(this).removeClass('active');
    $('.todo-form').addClass('active');
  });

  // 新增待辦項目
  $('.todo-form .new-btn').click(function() {

    var text = $('.todo-form .new-field').val();

    if(text.length > 0) {
      $('.todo-content .todo-all').append('<li class=id_'+ counter +'><p>'+ text +'</p><div class="icon"><img src="images/pencil.png" class="pencil"><img src="images/trash.png" class="trash"></div></li>');

      $('.todo-content .todo-pending').append('<li class=id_'+ counter +'><p>'+ text +'</p><div class="icon"><p>DONE?</p></div></li>');

      $('.todo-form .new-field').val('');
      counter = counter + 1;
    } else {
      alert('請輸入待辦項目');
      $('.todo-form .new-field').focus();
      return false;
    }

    $('.todo-form').removeClass('active');
    $('.add-todo .todo-info').addClass('active');
    many_todo();
  });

  // 新增待辦項目的 keydown 事件
  $('.todo-form .new-field').keydown(function(e) {
    var text = $('.todo-form .new-field').val();

    if(e.keyCode == 13 && text.length > 0) {
      e.preventDefault();
      $('.todo-content .todo-all').append('<li class=id_'+ counter +'><p>'+ text +'</p><div class="icon"><img src="images/pencil.png" class="pencil"><img src="images/trash.png" class="trash"></div></li>');

      $('.todo-content .todo-pending').append('<li class=id_'+ counter +'><p>'+ text +'</p><div class="icon"><p>DONE?</p></div></li>');

      $('.todo-form .new-field').val('');
      counter = counter + 1;
      $('.todo-form').removeClass('active');
      $('.add-todo .todo-info').addClass('active');
    } else {
      if(e.keyCode == 13 && text.length == 0) {
        e.preventDefault();
        alert('請輸入待辦項目');
        $('.todo-form .new-field').focus();
        return false;
      }
    }

    many_todo();
  });

  $('.todo-pending').on('click', '.icon p', function() {

    var text = $(this).parent().parent().children('p').text();
    todo_id = $(this).parent().parent().attr('class');

    $(this).parent().parent().fadeOut(1000, function() {
      $(this).remove();
      many_todo();
    });
    $('.todo-content .todo-done').append('<li class='+ todo_id +'><p>'+ text +'</p><div class="icon"><p>NO DONE?</p></div></li>');
    many_todo();
  });

  $('.todo-done').on('click', '.icon p', function() {
    var text = $(this).parent().parent().children('p').text();
    todo_id = $(this).parent().parent().attr('class');

    $(this).parent().parent().fadeOut(1000, function() {
      $(this).remove();
      many_todo();
    });
    $('.todo-content .todo-pending').append('<li class='+ todo_id +'><p>'+ text +'</p><div class="icon"><p> DONE?</p></div></li>');
    
  });

  // 輸入使用者名稱
  $('.title-form .title-btn').click(function() {
    var text = $('.title-form .title-field').val();

    console.log(text);

    if(text.length !== 0) {
      $('.title h1').text(text + '的待辦清單');
      $('.title-form .title-field').val('');
      $('.light-box').slideUp(500);
    } else {
      alert('請輸入您的使用者名稱');
      $('.title-form .title-field').focus();
      return false;
    }

  });

  // 輸入使用者名稱的 keydown 事件
  $('.title-form .title-field').keydown(function(e) {
    var text = $('.title-form .title-field').val();

    if(e.keyCode == 13 && text.length !== 0) {
      e.preventDefault();
      $('.title h1').text(text + '的待辦清單');
      $('.title-form .title-field').val();
      $('.light-box').slideUp(500);
    } else {
      if(e.keyCode == 13 && text.length == 0) {
        alert('請輸入您的使用者名稱');
        $('.title-form .title-field').focus();
        return false;
      }
    }
  });

  function many_todo() {
    if($('.todo-all li').length === 0) {
      $('.add-todo .todo-info').text('新增待辦項目');
    } else {
      var num = $('.todo-pending li').length;
      $('.add-todo .todo-info').text('您尚有' + ' ' + num + ' ' + '項未完成的待辦項目');
    }
  }



});
