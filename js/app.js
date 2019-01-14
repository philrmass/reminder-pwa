"use strict";

function fixVerticalHeight() {
  function setVerticalHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  window.onresize = function() {
    setVerticalHeight();
  };
  setVerticalHeight();
}

//??? capture console log
function captureConsoleLog(captureElem) {
  let oldConsoleLog = console.log;

  console.log = function() {
    let message = document.createElement("div");
    for(let i = 0; i < arguments.length; i++) {
      message.innerHTML += arguments[i];
    }
    captureElem.appendChild(message);
    captureElem.scrollTop = captureElem.scrollHeight;
    oldConsoleLog.apply(console, arguments);
  };
}

//??? change to setVersion, remove console
function addDebug(showConsole) {
  const version = 0.93;
  const footer = document.querySelector("footer");

  if(showConsole) {
    document.documentElement.style.setProperty("--bottom-height", "6em");
    var consoleBox = document.createElement("div");
    consoleBox.setAttribute("id", "console-box");
    footer.appendChild(consoleBox);
    captureConsoleLog(consoleBox);
  }

  var versionSpan = document.createElement("span");
  versionSpan.setAttribute("class", "version");
  versionSpan.innerHTML = "version " + version.toFixed(2);
  footer.appendChild(versionSpan);
}

document.addEventListener("DOMContentLoaded", function() {
  fixVerticalHeight();
  addDebug(false);

  const updateButton = document.getElementById("update");
  addUpdateEvent(updateButton);

  const reminderBox = document.getElementById("reminder-box");
  const reminderWrap= document.getElementById("reminder-wrap");
  addScrollEvents(reminderWrap, reminderBox);

  let events = Events();
  events.load();
  updateReminders(events.all(), reminderWrap);

  let editUi = getEditUi();
  let plusButton = document.getElementById("plus");
  addPlusEvent(plusButton, editUi);
  addLongPressEvent(reminderWrap, editUi);
  addEditEvents(editUi, events, reminderWrap);
});
