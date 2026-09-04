export function initInteractiveChar() {
  const elements = document.querySelectorAll(".interactive-char");
  elements.forEach((el) => {
    const text = el.textContent.trim();
    if (!text) return;

    const fragment = document.createDocumentFragment();
    const words = text.split(/\s+/);
    words.forEach((wordText, wordIdx) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "word-wrap";

      for (let i = 0; i < wordText.length; i++) {
        const charSpan = document.createElement("span");
        charSpan.className = "char";
        charSpan.textContent = wordText[i];
        wordSpan.appendChild(charSpan);
      }

      fragment.appendChild(wordSpan);

      if (wordIdx < words.length - 1) {
        const spaceSpan = document.createElement("span");
        spaceSpan.className = "char-space";
        spaceSpan.innerHTML = "&nbsp;";
        fragment.appendChild(spaceSpan);
      }
    });

    el.textContent = "";
    el.appendChild(fragment);
  });
}
