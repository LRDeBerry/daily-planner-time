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
  function updateClock() {
    var now = new Date();
    var dayname = now.getDay(),
      mo = now.getMonth(),
      dnum = now.getDate(),
      yr = now.getFullYear(),
      hou = now.getHours(),
      min = now.getMinutes(),
      sec = now.getSeconds(),
      pe = "AM";

    if (hou == 0) {
      hou = 12;
    }
    if (hou > 12) {
      hou = hou - 12;
      pe = "PM";
    }

    Number.prototype.pad = function (digits) {
      for (var n = this.toString(); n.length < digits; n = 0 + n);
      return n;
    }

    var months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dates = ["Sunday", "Monday", "Tuesday", "Wendsday", "Thursday", "Friday", "Saturday"];
    var ids = ["dayname", "months", "dates", "year", "hours", "minutes", "seconds", "period"];
    var values = [dates[dayname], months[mo], dates[dnum], yr.pad(2), hou.pad(2), min.pad(2), sec.pad(2), pe];

    for (var i = 0; i < ids.length; i++)
      document.getElementById(ids[i]).firstChild.nodeValue = values[i];
  }
   setInterval(initClock, 1000);

  function initClock() {
    updateClock();
    window.setInterval(updateClock, 1);
  }
});
