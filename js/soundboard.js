document.addEventListener('DOMContentLoaded', function () {
  let audioPlayers = []; // Array to store the currently playing audio elements

  // Soundboard functionality
  const soundButtons = document.querySelectorAll('.sound-button');

  function playSound(event) {
    // Check if the clicked element is the button or the image inside the button
    const button = event.target.closest('.sound-button');
    if (!button) return; // If it's not a sound-button or image inside, do nothing

    const soundSource = button.dataset.soundSrc; // Use 'data-sound-src' from the button
    const audio = new Audio(soundSource);
    audioPlayers.push(audio); // Add the audio element to the array

    audio.addEventListener('ended', function () {
      // Remove the audio element from the array when it finishes playing
      const index = audioPlayers.indexOf(audio);
      if (index !== -1) {
        audioPlayers.splice(index, 1);
      }
    });

    audio.play();
  }

  soundButtons.forEach(button => {
    button.addEventListener('click', playSound);
    button.addEventListener('mousedown', () => button.style.transform = 'scale(0.95)');
    button.addEventListener('mouseup', () => button.style.transform = 'scale(1)');
    button.addEventListener('mouseleave', () => button.style.transform = 'scale(1)');
  });

  // Stop button functionality
  const stopButton = document.querySelector('.stop-button');

  stopButton.addEventListener('click', function () {
    audioPlayers.forEach(audio => {
      audio.pause(); // Pause all currently playing sounds
      audio.currentTime = 0; // Reset the audio to the beginning
    });

    audioPlayers = []; // Clear the array of playing audio elements
  });
});
