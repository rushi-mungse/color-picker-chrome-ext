const btn = document.querySelector(".changeColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");

btn.addEventListener("click", async () => {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: codePicker,
    },
    async (injectionResult) => {
      const [data] = injectionResult;
      if (data.result) {
        const color = data.result.sRGBHex;
        colorGrid.style.backgroundColor = color;
        colorValue.innerText = color;
        try {
          await navigator.clipboard.writeText(color);
        } catch (error) {
          console.log(error);
        }
      }
    }
  );
});

async function codePicker() {
  try {
    //picker
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
  } catch (error) {
    console.log(error);
  }
}
