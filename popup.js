document.addEventListener('DOMContentLoaded', () => {
  const originalText = document.getElementById('originalText');
  const formattedText = document.getElementById('formattedText');

  const removeSpacesButton = document.getElementById('removeSpacesButton');
  const removeNewlinesButton = document.getElementById('removeNewlinesButton');

  let removeSpacesEnabled = false;
  let removeNewlinesEnabled = false;

  const updateFormattedText = () => {
    let text = originalText.value;
    if (removeSpacesEnabled) {
      text = text.replace(/ /g, '');
    }
    if (removeNewlinesEnabled) {
      text = text.replace(/\n/g, '');
    }
    formattedText.value = text;
  };

  const toggleButtonState = (button, isEnabled) => {
    button.style.backgroundColor = isEnabled ? 'green' : '#0078d7';
  };

  removeSpacesButton.addEventListener('click', () => {
    removeSpacesEnabled = !removeSpacesEnabled;
    toggleButtonState(removeSpacesButton, removeSpacesEnabled);
    updateFormattedText();
  });

  removeNewlinesButton.addEventListener('click', () => {
    removeNewlinesEnabled = !removeNewlinesEnabled;
    toggleButtonState(removeNewlinesButton, removeNewlinesEnabled);
    updateFormattedText();
  });

  document.getElementById('pasteButton').addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      originalText.value = text;
      updateFormattedText();
    } catch (err) {
      alert('无法读取剪贴板内容');
    }
  });

  document.getElementById('copyButton').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(formattedText.value);
      alert('结果已复制到剪贴板');
    } catch (err) {
      alert('无法复制到剪贴板');
    }
  });

  document.getElementById('clearButton').addEventListener('click', () => {
    originalText.value = '';
    formattedText.value = '';
  });

  // Initialize button states
  toggleButtonState(removeSpacesButton, removeSpacesEnabled);
  toggleButtonState(removeNewlinesButton, removeNewlinesEnabled);
});