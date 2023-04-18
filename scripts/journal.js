(function () {
  const count = document.getElementById('wordCount');
  const journalInput = document.getElementById('journalEntry');
  const journalValue = document.getElementById('journalValue');
  let globalWordCounter = 0;
  const wordLimit = 20;

  journalInput.addEventListener('keydown', function (e) {
    if (globalWordCounter >= wordLimit && e.code !== "Backspace" && e.code == "Space") {
      e.preventDefault();
      journalValue.innerHTML += journalInput.value;
      journalInput.value = ' ';
    } else if (globalWordCounter < wordLimit && e.code !== "Backspace" && e.code == "Enter") {
      e.preventDefault();
      journalValue.innerHTML += journalInput.value + "<br />";;
      journalInput.value = ' ';
    }
    SaveJournal(dateKey, journalValue.innerHTML);
  });

  journalInput.addEventListener('input', function (e) {
    const text = e.target.value.trim();
    const words = text.split(/\s+/);
    const wordCount = words.reduce((acc, cur) => isWord(cur) ? acc + 1 : acc, 0);
    globalWordCounter = wordCount;
    count.textContent = wordCount;
  });

  function isWord(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
  }

  console.log('journal.js loaded');

  
})();