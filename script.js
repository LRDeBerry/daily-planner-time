// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?\
  $(".saveBtn").on("click", function () {
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    window.localStorage.setItem(time, value);  
    console.log(localStorage.getItem(time, value));

    // What does this do to a "click" event? Will refreshing page cause information to dissapear? 

    // if ( value && time) {
    //  localStorage.setItem(value, time);
    //  location.reload();
    // }

  });


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  dayjs().hour();
  var newDate = dayjs().hour(12);

  var timeBlocks = $(".time-block");
  const dayJsObject = dayjs();
  console.log(dayJsObject.format("D/M/YYYY h:mm A"));

  timeBlocks.each(function () {
    console.log(this.id);
    var blockId = parseInt(this.id.split("-")[1]);
    console.log(blockId);

    if (timeBlocks < dayjs().hour()) {
      $(this).addClass("past");

    } else if (timeBlocks === newDate) {
      $(this).addClass("present");
      $(this).removeClass("past");

    } else {
      $(this).addClass("future");
      $(this).removeClass("present");
    }
  });
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
   var tasks = JSON.parse(localStorage.getItem("value")) || [];

  for (var i = 0; i < tasks.length; i++) {
    console.log(tasks);
    var timeBlocks = $("#" + tasks[i].parent).children("textarea");
    console.log(timeBlocks);
    timeBlocks.text(tasks[i]);
  };

  // var input = document.getElementById("save");
  // localStorage.setItem("save", input.val());
  // var storedValue = localStorage.getItem("save");
  // let textarea = JSON.stringify(save);
  // localStorage.setItem("data", saveBtn);
  // localStorage.getItem("data").name;

  // TODO: Add code to display the current date in the header of the page.
  // Was not able to figure out how to display Date along with Time. Will resubmit later.
  function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
  
    if(hh === 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
      
     let time = hh + ":" + mm + ":" + ss + " " + session;
  
    document.getElementById("clock").innerText = time; 
    let t = setTimeout(function(){ currentTime() }, 1000);

  }
  
  currentTime();
});
