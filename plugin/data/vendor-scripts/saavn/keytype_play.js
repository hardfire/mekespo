// because saavn doesnt have a same icon but hides one 
// depending on the status of the application
if(document.getElementById("play").className.indexOf("hide") === -1)
  document.getElementById("play").click();
else
  document.getElementById("pause").click();
