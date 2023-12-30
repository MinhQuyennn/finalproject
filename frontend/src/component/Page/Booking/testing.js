const now = new Date();
const options = { year: "numeric", month: "2-digit", day: "2-digit" };
const bookingDate = now.toLocaleDateString("en-US", options);

console.log("Booking Date:", bookingDate);
