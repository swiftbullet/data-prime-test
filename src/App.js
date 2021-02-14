import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";

import "./App.css";

function App() {
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusEvent, setIsFocusEvent] = useState(false);
  const [task, setTask] = useState("");
  const [note, setNote] = useState(false);

  const contentEditable = useRef();

  if (isFocus) {
    setTimeout(() => setIsFocusEvent(false), 300);
  }
  return (
    <div className="App">
      <div className="container">
        <div className="drop-wrapper">
          <div className="drop-source"></div>
          <div
            className={`drop ${isFocusEvent && !task ? "focus-event" : ""}`}
          ></div>
        </div>
        <div className="add-task-wrapper">
          <div
            className={`checkbox-wrapper ${
              isFocus || task !== "" ? "focus" : ""
            }`}
          >
            <div
              className={`checkbox-drop ${
                isFocus || task !== "" ? "focus" : ""
              }`}
            ></div>
            <div
              className={`checkbox ${isFocus || task !== "" ? "focus" : ""}`}
            ></div>
          </div>
          <ContentEditable
            type="text"
            contentEditable="true"
            suppressContentEditableWarning={true}
            name="add-task"
            className={`add-task ${
              isFocus || task ? (note ? "focus note" : "focus") : ""
            }`}
            data-placeholder="Write a new task"
            onFocus={() => {
              setIsFocus(true);
              setIsFocusEvent(true);
            }}
            onBlur={() => setIsFocus(false)}
            onChange={(event) => {
              setTask(event.target.value);
              console.log(task);

              if (event.target.value.search("//") !== -1) {
                setNote(true);
              } else {
                setNote(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                document.execCommand("insertLineBreak");
                event.preventDefault();
              }
            }}
            innerRef={contentEditable}
            html={task}
            disabled={false}
            tagName="article"
          />
          <div className={`calender ${isFocus || task !== "" ? "focus" : ""}`}>
            <svg
              width="31"
              height="33"
              viewBox="0 0 31 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 14.0652C2 14.0652 2 12.4999 2 8.99998C2 5.5 3.5 3.49997 7.5 3.5C8.34595 3.50001 8.19189 3.50001 9 3.50001M2 14.0652C2 14.0652 2 16.413 2 23.4565C2 30.5 7.78571 30.5 7.78571 30.5L16.0625 30.5L24.1786 30.5C24.1786 30.5 29 30.5 29 23.4565C29 16.413 29 21.1087 29 14.0652M2 14.0652C2 14.0652 18.4558 14.0652 29 14.0652M29 14.0652C29 9.9565 29 12.9999 29 8.99998C29 5 27 3.50004 24 3.5C23.4098 3.49999 22.7228 3.49999 22 3.49998M9 3.50001C12.013 3.50001 15.5 3.49998 15.5 3.49998C15.5 3.49998 19.0488 3.49997 22 3.49998M9 3.50001V0M22 3.49998V0"
                stroke="#626770"
                stroke-width="4"
              />
            </svg>
          </div>
          <div className={`list ${isFocus || task !== "" ? "focus" : ""}`}>
            <div className="square"></div>
            <div className="list-text">No list</div>
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.00002 8.5554L9.97975 15.6762L17.1108 8.55542"
                stroke="#626770"
                stroke-width="4"
              />
            </svg>
          </div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -9"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default App;
