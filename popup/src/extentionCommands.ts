import browser from "webextension-polyfill";

const sendCommand = async () => {
  console.log("Sending command");

  const activeTab = (
    await browser.tabs.query({
      active: true,
      currentWindow: true,
    })
  ).at(0);

  console.log("Active tab:", activeTab);

  if (!activeTab) {
    console.error("No active tab found");
    throw Error("No active tab found");
  }
  if (!activeTab.id) {
    console.error("Tab has no id");
    throw Error("Tab has no id");
  }

  await browser.tabs.executeScript({
    file: "/content_scripts/qartulize.js",
  });

  browser.tabs.sendMessage(activeTab.id, { cmd: "qartulize" });
};

export { sendCommand };
