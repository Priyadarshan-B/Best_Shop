function updateTime() {

    var now = new Date();
  
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
  
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    type = hours < 12 ? 'AM' : 'PM';
  
    var timeString = hours + ':' + minutes + ':' + seconds + ' ' +  type;
  
    document.getElementById('clock').innerHTML = timeString;
  }
  
  updateTime();
  
  setInterval(updateTime, 1000);
  