$(function(){
  var $display = $("#display-content");
  var $message = $("#message");
  var $send = $("#send");
  var $ping_client = $("#ping_client");
  var $clear = $("#clear");

  var clearDisplay = $("#clearDisplay");


  //instantiate variable for date information
  var time = new Date();

  //open connection
  var ws = new WebSocket('ws://'+ window.location.host);
  ws.onmessage = function(event){
    var data = event.data;
    var current_time = '';

    if (time.getHours()<10) {
      current_time += '0';
      current_time += time.getHours() + ':';
    } else {
      current_time +=time.getHours() + ':';
    }

    if (time.getMinutes()<10) {
      current_time += '0';
      current_time += time.getMinutes() + ':';
    } else {
      current_time +=time.getMinutes();
    }
    
    // current_time = time.getHours() + ':' + time.getMinutes() + '\t\t';

    var content='<div class="display-container bg-secondary">';
    content += data + '<small class="force-right">' + current_time + '</small>';
    content +='</div>'
    $display.append(content);    

    // Auto scroll to the bottom of the chat
    $("#display-content").prop({ scrollTop: $("#display-content").prop("scrollHeight") });

  };

  //click event on PING button
  $ping_client.click(function(event){
    //prevent from refresh page(!IMPORTANT)
    //if not, there wil be collision between broadcast from server and reconnecting message from server
    event.preventDefault();
    //send to server
    ws.send("PING");
  });

  $send.click(function(event){
    //prevent from refresh page(!IMPORTANT)
    //if not, there wil be collision between broadcast from server and reconnecting message from server
    event.preventDefault();
    //send to server
    if($message.val() != ''){
        //send message in textarea
        ws.send($message.val());

        //clear message in textarea
        $message.val('');
    }
  });

  $clear.click(function(event){
    //prevent from refresh page(!IMPORTANT)
    //if not, there wil be collision between broadcast from server and reconnecting message from server
    event.preventDefault();

    //clear display
    $(".display-container").remove();
  });

});
