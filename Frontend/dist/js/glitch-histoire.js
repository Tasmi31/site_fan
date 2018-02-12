$(document).ready(function () {

          function second_passed() {
            $('.clock').removeClass('is-off');
          }
          setTimeout(second_passed, 2000)

          $('.switcher').on('click', function(e) {
            e.preventDefault();
            $('.screen').toggleClass('glitch');
          });

          var countDownDate = new Date("Mar 9, 2018 8:30:00").getTime();

          // Update the count down every 1 second
          var x = setInterval(function() {

            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now an the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            // Display the result in the element with id="demo"
            var realTime = days + "J " + " : " + hours + "H " + " : " +
            + minutes + "M ";

            $('.time').html(realTime);
            $('.time').attr('data-time', realTime);

            // If the count down is finished, write some text 
            if (distance < 0) {
              clearInterval(x);
              document.getElementById("demo").innerHTML = "C'EST MAINTENANT";
            }
          }, 1000);

        });