$(document).ready(function() {
    const countdown = {
        days: $('#days'),
        hours: $('#hours'),
        minutes: $('#minutes'),
        seconds: $('#seconds')
    };

    const targetDate = new Date().getTime() + 8000; // Set timer to 8 seconds

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdown.days.text(days + "d");
        countdown.hours.text(hours + "h");
        countdown.minutes.text(minutes + "m");
        countdown.seconds.text(seconds + "s");

        if (distance < 0) {
            clearInterval(timerInterval);
            countdown.days.text("00d");
            countdown.hours.text("00h");
            countdown.minutes.text("00m");
            countdown.seconds.text("00s");
            $('#countdown').html(`<div class="happy-new-year">Happy New Year!</div>`);
            $('#fireworks-container').fireworks({ 
                sound: true, // sound effect
                opacity: 0.9, 
                width: '100%', 
                height: '100%' 
            });
        }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    $('#resolutionForm').submit(function(event) {
        event.preventDefault();
        const name = $('#nameInput').val().trim();
        const resolution = $('#resolutionInput').val().trim();
        if (name && resolution) {
            const listItem = $(`<li class="snapchat-message">
                <div class="name-resolution">
                    <div class="name">${name}:</div>
                    <div class="resolution-text">${resolution}</div>
                </div>
            </li>`);
            $('#resolutionsList').append(listItem);
            $('#nameInput').val('');
            $('#resolutionInput').val('');
        }
    });

    // Play music automatically when the window loads
    $(window).on('load', function() {
        $('#partyMusic').get(0).play();
    });

    const checkAnswer = (answer) => {
        const correctAnswer = '1907';
        const resultDiv = $('#result');
        if (answer === correctAnswer) {
            resultDiv.text('Correct!');
        } else {
            resultDiv.text('Incorrect. Try again!');
        }
    };

    window.checkAnswer = checkAnswer;

    // Photo Gallery Rotation
    const images = [
        "1.jpg",
        "2.jpg",
        "3.jpg",
        "4.jpg",
        "5.jpg",
        "6.png",
        "7.jpg",
        "8.jpg",
        "9.jpg",
        "10.jpg"
    ];

    let currentIndex = 0;

    const updateGallery = () => {
        const gallery = $('#photo-gallery');
        gallery.children().addClass('exit');
        setTimeout(() => {
            gallery.empty();
            for (let i = 0; i < 3; i++) {
                const img = $('<img>').attr('src', images[(currentIndex + i) % images.length]).addClass('enter');
                gallery.append(img);
            }
            currentIndex = (currentIndex + 1) % images.length;
        }, 500); // Match the duration of the exit animation
    };

    updateGallery();
    setInterval(updateGallery, 3000);
});
