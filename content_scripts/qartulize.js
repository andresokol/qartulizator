(() => {
  if (window.hasRun) {
    console.log("[QARTU] Not injecting script - already done");
    return;
  }
  console.log("[QARTU] Injecting the script");
  window.hasRun = true;

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

  function eachNode(rootNode, callback) {
    callback(rootNode);
    if (rootNode.hasChildNodes()) {
      for (const node of rootNode.childNodes) {
        eachNode(node, callback);
      }
    }
  }

  function qartulize() {
    let count = 0;

    eachNode(window.document.body, (node) => {
      if (node.nodeType !== Node.TEXT_NODE) {
        return;
      }

      count += 1;

      let content = node.textContent;
      CONVERSION_RULES.forEach(({ re, to }) => {
        content = content.replaceAll(re, to);
      });
      node.textContent = content;
    });

    console.log(`[QARTU] ${count} nodes modified`);
  }

  browser.runtime.onMessage.addListener((message) => {
    console.log("[QARTU] Recieved message", message);
    qartulize();
  });
})();
