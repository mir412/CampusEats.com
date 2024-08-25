    // Array to store submitted feedback
    var submittedFeedback = [];

    // Function to display latest reviews
    function displayLatestReviews() {
      var latestReviewsList = document.getElementById("latestReviews");
      latestReviewsList.innerHTML = "<h3></h3>";

      submittedFeedback.forEach(function(feedback) {
        var latestReview = document.createElement("div");
        var stars = parseInt(feedback.match(/Rating: (\d+)/)[1]);

        var starRating = document.createElement("span");
        starRating.className = "star-rating";
        starRating.innerHTML = "★".repeat(stars); // Adding star icons based on the rating

        var starsCount = document.createElement("span");
        starsCount.className = "stars-count";
        starsCount.textContent = `(${stars})`; // Number of stars in parentheses

        latestReview.textContent = `${feedback.replace(/Rating: (\d+)/, '')} `;
        latestReview.appendChild(starRating);
        latestReview.appendChild(starsCount);
        latestReviewsList.appendChild(latestReview);
      });
    }

    // Function to display top reviews and overall stars
    function displayTopReviews() {
      var topReviewsList = document.getElementById("topReviews");
      var overallStars = document.getElementById("overallStars"); // Overall stars element

      topReviewsList.innerHTML = "<h3></h3>";

      // Sorting feedback by rating
      var sortedFeedback = submittedFeedback.slice().sort(function(a, b) {
        var ratingA = parseInt(a.match(/Rating: (\d+)/)[1]);
        var ratingB = parseInt(b.match(/Rating: (\d+)/)[1]);
        return ratingB - ratingA;
      });

      // Display top reviews
      for (var i = 0; i < Math.min(3, sortedFeedback.length); i++) {
        var topReview = document.createElement("div");
        var stars = parseInt(sortedFeedback[i].match(/Rating: (\d+)/)[1]);

        var starRating = document.createElement("span");
        starRating.className = "star-rating";
        starRating.innerHTML = "★".repeat(stars); // Adding star icons based on the rating

        var starsCount = document.createElement("span");
        starsCount.className = "stars-count";
        starsCount.textContent = `(${stars})`; // Number of stars in parentheses

        topReview.textContent = `${sortedFeedback[i].replace(/Rating: (\d+)/, '')} `;
        topReview.appendChild(starRating);
        topReview.appendChild(starsCount);
        topReviewsList.appendChild(topReview);
      }

      // Calculate overall stars for each restaurant
      var totalStars = {};
      submittedFeedback.forEach(function(feedback) {
        var stars = parseInt(feedback.match(/Rating: (\d+)/)[1]);
        var restaurant = feedback.split(":")[0];

        if (!totalStars[restaurant]) {
          totalStars[restaurant] = stars;
        } else {
          totalStars[restaurant] += stars;
        }
      });

      // Display overall stars for each restaurant
      overallStars.innerHTML = "<h3>Overall Stars:</h3>";
      for (var rest in totalStars) {
        var overallStarsElement = document.createElement("div");
        overallStarsElement.textContent = `${rest}: ${totalStars[rest]} stars`;
        overallStars.appendChild(overallStarsElement);
      }
    }

    // Function to submit feedback
    function submitFeedback() {
      var feedbackInput = document.getElementById("feedbackInput").value;
      var restaurantName = document.getElementById("restaurantNames").value;
      var rating = document.querySelector('input[name="rating"]:checked');

      if (feedbackInput.trim() !== "" && restaurantName.trim() !== "" && rating) {
        var feedback = restaurantName + ": " + feedbackInput + " - Rating: " + rating.value ;
        submittedFeedback.push(feedback);
        displayLatestReviews(); // Update the display when new feedback is submitted
        displayTopReviews(); // Update top reviews and overall stars when new feedback is submitted
        document.getElementById("feedbackInput").value = ""; // Clear textarea after submission
      } else {
        alert("Please select a rating and provide feedback.");
      }
    }