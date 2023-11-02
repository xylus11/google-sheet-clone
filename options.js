const cellNamePlaceholder = document.querySelector("#active-cell");
const fontSizeInput = document.querySelector("#fontsize");
const fontFamilyInput = document.querySelector("#fontfamily");
const form = document.querySelector("#form");
let activeElement = null;

const state = {};

const defaultProperties = {
  fontFamily: "sans",
  fontSize: 16,
  textAlign: "Left",
  color: "#000000",
  backgroundColor: "#ffffff",
  isBold: false,
  isItalic: false,
  isUnderlined: false,
  value: "",
};

function onCellFocus(event) {
  const elementId = event.target.id;
  cellNamePlaceholder.innerText = elementId;
  activeElement = event.target;
  if (state[elementId]) {
    // already selected cell
    // fill the options with the state of that cell
    resetOptions(state[elementId]);
  } else {
    // selected for the first time
    // fill the options with default state
    resetOptions(defaultProperties);
  }
}
function resetOptions(optionsState) {
  form.fontfamily.value = optionsState.fontFamily;
  form.fontsize.value = optionsState.fontSize;
  form.textalign.value = optionsState.textAlign;
  form.bold.value = optionsState.isBold;
  form.italic.value = optionsState.isItalic;
  form.underlined.value = optionsState.isUnderlined;
  form.textcolor.value = optionsState.color;
  form.bgcolor.value = optionsState.backgroundColor;
}
function onFormChange() {
  if (!activeElement) {
    alert("Please select a cell to make changes");
    form.reset();
    return;
  }
  let currentState = {
    textColor: form.textcolor.value,
    backgroundColor: form.bgcolor.value,
    fontSize: form.fontsize.value,
    fontFamily: form.fontfamily.value,
    isBold: form.bold.checked,
    isItalic: form.italic.checked,
    isUnderlined: form.underlined.checked,
    textAlign: form.textalign.value,
  };
  applyStylesToCell(currentState);
  state[activeElement.id] = { ...currentState, value: activeElement.innerText };
}
function applyStylesToCell(styleObject) {
  // it will take the style object and applies it to the currently selected cell.
  activeElement.style.fontSize = `${styleObject.fontSize}px`;
  activeElement.style.fontFamily = styleObject.fontFamily;
  activeElement.style.color = styleObject.textColor;
  activeElement.style.backgroundColor = styleObject.backgroundColor;
  activeElement.style.textAlign = styleObject.textAlign;

  activeElement.style.fontWeight = styleObject.isBold ? "bold" : "normal";
  activeElement.style.fontStyle = styleObject.isItalic ? "italic" : "normal";
  activeElement.style.textDecoration = styleObject.isUnderlined
    ? "underline"
    : "none";
}
