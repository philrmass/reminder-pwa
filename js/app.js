function captureConsoleLog(captureElem) {
  let oldConsoleLog = console.log;

  console.log = function() {
    message = document.createElement("div");
    for(let i = 0; i < arguments.length; i++) {
      message.innerHTML += arguments[i];
    }
    captureElem.appendChild(message);
    captureElem.scrollTop = captureElem.scrollHeight;
    oldConsoleLog.apply(console, arguments);
  };
}

function addDebug(useDebug) {
  const version = 0.26;

  if(useDebug) {
    const versionElem = document.getElementById("version");
    versionElem.innerHTML = "version " + version.toFixed(2);

    const footer = document.querySelector("footer");
    var consoleBox = document.createElement("div");
    consoleBox.setAttribute("id", "console-box");
    footer.appendChild(consoleBox);
    captureConsoleLog(consoleBox);
  }
}

function loadLocalRemindersData() {
  let data = [];
  data.push({date: new Date(2018, 11, 1, 9, 30), note: "Scouting for food"});
  data.push({date: new Date(2018, 11, 8, 9, 0), note: "Gingerbread party"});
  data.push({date: new Date(2018, 11, 9, 17, 0), note: "Holiday express"});
  data.push({date: new Date(2018, 11, 1, 9, 30), note: "Scouting for food"});
  data.push({date: new Date(2018, 11, 8, 9, 0), note: "Gingerbread party"});
  data.push({date: new Date(2018, 11, 9, 17, 0), note: "Holiday express"});
  data.push({date: new Date(2018, 11, 1, 9, 30), note: "Scouting for food"});
  data.push({date: new Date(2018, 11, 8, 9, 0), note: "Gingerbread party"});
  data.push({date: new Date(2018, 11, 9, 17, 0), note: "Holiday express"});
  return data;
}

function addScrollEvents(box, all) {
  let scrollEnabled = false;
  let scrollY = 0;
  let yOffset = 0;

  function enableScroll(enabled, y = 0) {
    scrollEnabled = enabled;
    scrollY = y;
  }

  function moveScroll(y) {
    yOffset += (y - scrollY);
    scrollY = y;
    const yOffsetMin = box.clientHeight - box.scrollHeight;
    if((yOffsetMin > 0) || (yOffset > 0)) {
      yOffset = 0;
    } else if (yOffset < yOffsetMin) {
      yOffset = yOffsetMin;
    }
    all.style.top = yOffset + "px";
  }

  all.ontouchstart = function(event) {
    event.preventDefault();
    enableScroll(true, event.touches[0] && event.touches[0].pageY);
  };

  all.ontouchend = function(event) {
    event.preventDefault();
    enableScroll(false);
  };

  all.ontouchmove = function(event) {
    event.preventDefault();
    moveScroll(event.touches[0] && event.touches[0].pageY);
  };
}

function drawReminders(reminders, all) {
  const options = {weekday:"short", day:"numeric", month:"short", hour:"numeric", minute:"2-digit"};

  reminders.forEach(function(reminder) {
    var reminderElem = document.createElement("div");
    reminderElem.setAttribute("class", "reminder");
    var dateElem = document.createElement("div");
    dateElem.setAttribute("class", "date");
    dateElem.innerHTML = reminder.date.toLocaleString("en-us", options);
    var noteElem = document.createElement("div");
    noteElem.setAttribute("class", "note");
    noteElem.innerHTML = reminder.note;

    all.appendChild(reminderElem);
    reminderElem.appendChild(dateElem);
    reminderElem.appendChild(noteElem);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  addDebug(true);

  const remindersData = loadLocalRemindersData();
  reminders = remindersData.map(function(data) { return createReminder(data) });
  const remindersBox = document.getElementById("reminders-box");
  const allReminders= document.getElementById("all-reminders");
  addScrollEvents(remindersBox, allReminders);
  drawReminders(reminders, allReminders);
});

/*
  let vh = Math.max(window.innerHeight, document.documentElement.clientHeight);
  document.body.height = vh;
  console.log("setvh=", vh);


  events.ontouchstart = function(event) {
    event.preventDefault();
    var touch = event.touches[0];
    lastY = touch.pageY;
    isDown = true;
  }

  events.ontouchend = function(event) {
    event.preventDefault();
    isDown = false;
  }

  events.ontouchmove = function(event) {
    event.preventDefault();
    if(isDown) {
      var touch = event.touches[0];
      let diff = touch.pageY - lastY;
      lastY = touch.pageY;
      offsetY += diff;

      const offsetMin = eventsBox.clientHeight - events.clientHeight;
      if((offsetMin > 0) || (offsetY > 0)) {
        offsetY = 0;
      } else if (offsetY < offsetMin) {
        offsetY = offsetMin;
      }
      events.style.top = offsetY + "px";
    }
  }
});
 */
