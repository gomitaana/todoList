
        window.onload = function() {

            var timer = new Tock({
                callback: function () {
                    $('#clockface').val(timer.msToTime(timer.lap()));
                }
            });

            $('#start').on('click', function () {
                timer.start($('#clockface').val());
            });

            $('#lap').on('click', function () {
                $('#laptimes').append(timer.msToTime(timer.lap()) + '<br>');
            });

            $('#pause').on('click', function () {
                timer.pause();
            });

            $('#stop').on('click', function () {
                timer.stop();
            });

            $('#reset').on('click', function () {
                timer.reset();
                $('#clockface').val('');
                $('#laptimes').html('');
            });

            var countdown = Tock({
                countdown: true,
                interval: 250,
                callback: function () {
                    console.log(countdown.lap() / 1000);
                    $('#countdown_clock').val(timer.msToTime(countdown.lap()));
                },
                complete: function () {
                    console.log('end');
                    alert("Time's up!");
                }
            });

            $('#startCountdown').on('click', function () {
                countdown.start($('#countdown_clock').val());
            });

            $('#pauseCountdown').on('click', function () {
                countdown.pause();
            });

            $('#stopCountdown').on('click', function () {
                countdown.stop();
            });

            $('#resetCountdown').on('click', function () {
                countdown.stop();
                $('#countdown_clock').val('00:02');
            });
        }