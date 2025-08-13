const speedPlayText = 25;

export class Dialog {
  #dialogOverlay;
  #dialogBox;
  #dialogText;
  #dialogButton1;
  #dialogButton2;

  #text = [];
  #currentTextIndex = 0;

  #playerController;

  constructor(playerController) {
    this.#dialogOverlay = document.getElementById('dialog-overlay');
    this.#dialogBox = document.getElementById('dialog-box');
    this.#dialogText = document.getElementById('dialog-text');
    this.#dialogButton1 = document.getElementById('dialog-button-1');
    this.#dialogButton2 = document.getElementById('dialog-button-2');
    this.#playerController = playerController;

    this.#initButtonsHandlers();
  }

  show(dialogueText = []) {
    if (dialogueText.length === 0) return;

    this.#playerController.paused(true);
    this.#dialogBox.setAttribute('tabindex', '0');
    this.#dialogBox.focus();

    if (dialogueText.length > 0) this.#text = dialogueText;

    this.#currentTextIndex = 0;
    this.#dialogOverlay.style.display = 'flex';
    this.#dialogBox.style.display = 'block';
    this.#updateText();
    this.#updateButtons();
  }

  hide() {
    this.#dialogOverlay.style.display = 'none';
    this.#dialogText.textContent = '';
    this.#playerController.paused(false);
    document.getElementById('game').focus();
  }

  async #updateText() {
    this.#disableButtons(true);
    const rawText = this.#text[this.#currentTextIndex];
    let textContent = '';

    for (const item of rawText) {
      if (typeof item === 'object' && item.tag) {
        textContent += item.tag;
        this.#dialogText.innerHTML = textContent;
      } else if (typeof item === 'string') {
        textContent = await this.#printText(item, textContent);
      }
    }

    this.#disableButtons(false);
  }

  #printText(text, existingText) {
    return new Promise((resolve) => {
      let index = 0;
      let result = existingText;

      const interval = setInterval(() => {
        if (index < text.length) {
          result += text[index];
          this.#dialogText.innerHTML = result;
          index++;
        } else {
          clearInterval(interval);
          resolve(result);
        }
      }, speedPlayText);
    });
  }

  #updateButtons() {
    this.#dialogButton1.style.display = this.#currentTextIndex > 0 ? 'inline-block' : 'none';
    this.#dialogButton2.textContent = this.#currentTextIndex === this.#text.length - 1 ? 'Close' : 'Next';
  }

  #initButtonsHandlers() {
    const handleButtonClick = (step) => {
      const newIndex = this.#currentTextIndex + step;

      if (newIndex >= this.#text.length) {
        this.hide();
        this.#text.length = 0;
        return;
      }

      this.#currentTextIndex = newIndex;
      this.#updateText();
      this.#updateButtons();
    };

    this.#dialogButton1.onclick = () => handleButtonClick(-1);
    this.#dialogButton2.onclick = () => handleButtonClick(1);
  }

  #disableButtons(value) {
    this.#dialogButton1.disabled = value;
    this.#dialogButton2.disabled = value;
  }
}
