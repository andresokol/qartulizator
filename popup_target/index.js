const CONVERSION_RULES = [
  { idx: "a", from: "а", to: "ა", re: /[Аа]/g, complexity: 1 },
  { idx: "b", from: "б", to: "ბ", re: /[Бб]/g, complexity: 1 },
  { idx: "v", from: "в", to: "ვ", re: /[Вв]/g, complexity: 1 },
  { idx: "c", from: "г", to: "გ", re: /[Гг]/g, complexity: 1 },
  { idx: "d", from: "д", to: "დ", re: /[Дд]/g, complexity: 1 },
  { idx: "e", from: "е", to: "ე", re: /[ЕеЭэ]/g, complexity: 1 },
  { idx: "g", from: "ж", to: "ჟ", re: /[Жж]/g, complexity: 1 },
  { idx: "z", from: "з", to: "ზ", re: /[Зз]/g, complexity: 1 },
  { idx: "i", from: "и", to: "ი", re: /[Ии]/g, complexity: 1 },
  { idx: "k", from: "к", to: "კ", re: /[Кк]/g, complexity: 1 },
  { idx: "l", from: "л", to: "ლ", re: /[Лл]/g, complexity: 1 },
  { idx: "m", from: "м", to: "მ", re: /[Мм]/g, complexity: 1 },
  { idx: "n", from: "н", to: "ნ", re: /[Нн]/g, complexity: 1 },
  { idx: "o", from: "о", to: "ო", re: /[Оо]/g, complexity: 1 },
  { idx: "p", from: "п", to: "პ", re: /[Пп]/g, complexity: 1 },
  { idx: "r", from: "р", to: "რ", re: /[Рр]/g, complexity: 1 },
  { idx: "s", from: "с", to: "ს", re: /[Сс]/g, complexity: 1 },
  { idx: "t-pow", from: "т", to: "ტ", re: /[Тт]/g, complexity: 1 },
  { idx: "u", from: "у", to: "უ", re: /[Уу]/g, complexity: 1 },
  { idx: "f", from: "ф", to: "ფ", re: /[Фф]/g, complexity: 1 },
  { idx: "kh", from: "х", to: "ხ", re: /[Хх]/g, complexity: 1 },
  { idx: "ts-pow", from: "ц", to: "ც", re: /[Цц]/g, complexity: 1 },
  { idx: "ch", from: "ч", to: "ჩ", re: /[Чч]/g, complexity: 1 },
  { idx: "sh", from: "ш", to: "შ", re: /[Шш]/g, complexity: 1 },
];

const CONVERSIONS_BY_DAYS = [
  ["a", "i"],
  ["o", "e"],
  ["v", "c"],
  ["g", "z"],
  ["s", "t-pow"],
  ["a", "i"],
  ["a", "i"],
  ["a", "i"],
  ["a", "i"],
];

function generateDayButtons() {
  const root = document.getElementById("day_buttons_container");

  let html = "";
  for (let index = 0; index < CONVERSIONS_BY_DAYS.length; index++) {
    const conversion_idxs = CONVERSIONS_BY_DAYS[index];

    let description_string = "";

    html += `<div class="day_button" data-day-num="${index + 1}">
    <p>День ${index + 1}.</p>
    <p>а/ა, и/ი</p>
  </div>`;
  }

  console.log(html);

  root.innerHTML = html;
}

generateDayButtons();

/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
const hidePage = `body > :not(.beastify-image) {
    display: none;
  }`;

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {
    /**
     * Given the name of a beast, get the URL to the corresponding image.
     */
    function beastNameToURL(beastName) {
      switch (beastName) {
        case "Frog":
          return browser.runtime.getURL("beasts/frog.jpg");
        case "Snake":
          return browser.runtime.getURL("beasts/snake.jpg");
        case "Turtle":
          return browser.runtime.getURL("beasts/turtle.jpg");
      }
    }

    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the beast URL and
     * send a "beastify" message to the content script in the active tab.
     */
    function beastify(tabs) {
      let url = beastNameToURL(e.target.textContent);
      browser.tabs.sendMessage(tabs[0].id, {
        command: "beastify",
        beastURL: url,
      });
    }

    /**
     * Remove the page-hiding CSS from the active tab,
     * send a "reset" message to the content script in the active tab.
     */
    function reset(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "reset",
      });
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not beastify: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "beastify()" or "reset()" as appropriate.
     */
    if (e.target.classList.contains("beast")) {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(beastify)
        .catch(reportError);
    } else if (e.target.classList.contains("reset")) {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(reset)
        .catch(reportError);
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs
  .executeScript({ file: "/content_scripts/beastify.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
