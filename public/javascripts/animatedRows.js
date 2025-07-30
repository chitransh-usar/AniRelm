// animatedRows.js
// This script animates 3 rows of 6 images each, moving left to right in a loop using GSAP

document.addEventListener('DOMContentLoaded', function () {
  const rows = document.querySelectorAll('.animated-row');
  rows.forEach((row, idx) => {
    const images = row.querySelectorAll('img');
    const rowWidth = row.offsetWidth;
    const totalWidth = images[0].offsetWidth * images.length;
    const duration = 18 - idx * 3; // Slightly different speed for each row

    gsap.to(row, {
      x: rowWidth,
      repeat: -1,
      duration: duration,
      ease: 'linear',
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });
  });
}); 