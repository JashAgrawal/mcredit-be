import { getReminderForCron } from "../controller/reminder";
import { calculateSummary } from "../controller/transaction";
import { SendSMS } from "./sms";
const messageTemplate = (
  userName: string,
  customerName: string,
  amount: any
) => {
  const isMore = amount > 0;
  const str = `
    Friendly Reminder !
    You Have to ${
      isMore
        ? `Collect Rs :- ${amount} /- from ${customerName}`
        : `Pay Rs :-${amount} /- to ${userName}`
    }
    Please Ignore if Already Paid !
    Team MCREDIT
    `;
};
export const SendReminder = async (event: "WEEKLY" | "MONTHLY") => {
  const reminders = await getReminderForCron(event);

  const promises = reminders.map(async (item) => {
    const summary = await calculateSummary(
      "" + item.userId,
      item.customerId ? "" + item.customerId : ""
    );
    const message = messageTemplate(
      item.userName,
      item.customerId?.name,
      summary.amountToBalance
    );
    return SendSMS(
      summary.amountToBalance > 0 ? item.customerId?.mobile : item.userPhone,
      message
    );
  });

  const res = await Promise.all(promises);
  console.log("Complete sending reminders");
};
