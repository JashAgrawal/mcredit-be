import cron from "node-cron";

// Function to create a cron job based on date or event
// const scheduleReminder = (dateOrEvent: Date | "WEEKLY" | "MONTHLY") => {
//   let cronExpression;

//   if (dateOrEvent instanceof Date) {
//     // If date is passed, schedule a cron for that date at 12 noon
//     const date = dateOrEvent.getDate();
//     const month = dateOrEvent.getMonth() + 1; // Months are zero-based in JavaScript
//     cronExpression = `0 12 ${date} ${month} *`; // Run every day at 12 noon
//   } else if (dateOrEvent === "WEEKLY") {
//     // If event is weekly, schedule a cron for every Monday at 12 noon
//     cronExpression = `0 12 * * 1`; // Run every Monday at 12 noon
//   } else if (dateOrEvent === "MONTHLY") {
//     // If event is monthly, schedule a cron for 1st of every month at 12 noon
//     cronExpression = `0 12 1 * *`; // Run on the 1st of every month at 12 noon
//   } else {
//     throw new Error("Invalid date or event provided");
//   }

//   // Schedule the cron job
//   cron.schedule(cronExpression, () => {
//     console.log("Reminder triggered"); // Replace this with your reminder logic
//   });

//   return cronExpression; // Return the generated cron expression
// };

// Function to schedule a cron job for every Monday at 12 noon and 1st of every month at 12 noon
const scheduleReminder = () => {
  // Schedule the cron job to run every Monday at 12 noon
  cron.schedule("0 12 * * 1", () => {
    console.log("Reminder triggered for Monday"); // Replace this with your reminder logic for Monday
  });

  // Schedule the cron job to run on the 1st day of every month at 12 noon
  cron.schedule("0 12 1 * *", () => {
    console.log("Reminder triggered for 1st day of the month"); // Replace this with your reminder logic for the 1st day of the month
  });
};
const scheduleReminderForDate = (datee: Date) => {
  const date = datee.getDate();
  const month = datee.getMonth() + 1; // Months are zero-based in JavaScript
  const cronExpression = `0 12 ${date} ${month} *`; // Run every day at 12 noon

  cron.schedule(cronExpression, () => {
    console.log("Reminder triggered"); // Replace this with your reminder logic
  });
};
// scheduleReminder();
