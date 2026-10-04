# 07 - Capstone: Weekly Reminders and Summary

Chapter 5 sent a reminder to every row, including people who had already finished. The capstone turns that into a process a coordinator would actually use: skip completed training, limit the window, count what was sent, and handle the week when nothing matches.

> **Copy-paste values:** the filter expression, variable name and summary text are on the [copy-paste page](./copy-paste.md).

**Estimated time:** 90 minutes

**Your result:** A copy of the weekly reminder flow that selects upcoming incomplete records, counts the reminders, and follows a clear summary or no-records branch.

---

## What You Will Learn

- Filter an array before a loop so only relevant rows are processed
- Normalise text and compare dates inside an expression
- Count processed items with an integer variable
- Branch after a loop, including a week with no matching records

---

## How the Flow Works

**Recurrence > Current time > Convert time zone > List rows > Filter array > Initialize variable > Apply to each > Send reminder > Increment variable > Condition > Summary or no-records message**

The filter sits before the loop, so Apply to each only sees relevant rows. The counter starts at zero and goes up once per reminder. After the loop, a Condition checks the counter and picks the matching branch.

---

## Before You Begin

Complete Chapter 5. The `tblTraining` table must include Email, CourseTitle, ParticipantName, SessionDate and Status.

> **Important:** The sample register uses `example.com` addresses, which can't receive mail. Keep the capstone turned off and don't test it until the trainer has replaced every recipient with an approved destination.

---

## 7.1 Make a Safe Capstone Copy

Open `PA - Weekly training reminders`, select **Save As**, enter `PA - Weekly training capstone`, and save. The copy starts turned off.

**Checkpoint:** Confirm you're editing the capstone copy, not the Chapter 5 flow, before you change anything else.

---

## 7.2 Return Excel Dates in a Consistent Format

Open **List rows present in a table**. Under **Advanced parameters**, add **DateTime Format** and select **ISO 8601**. The filter needs a predictable SessionDate value to compare.

---

## 7.3 Select Upcoming Incomplete Records

1. Add **Data Operation > Filter array** after List rows present in a table.
2. Rename it `Filter upcoming incomplete training`.
3. Set **From** to **value** from List rows present in a table.
4. Choose **Edit in advanced mode** and paste the filter expression from the copy-paste page.

What the expression does: `trim()` removes stray spaces and `toLower()` ignores capitalisation, so "Completed", "completed " and "COMPLETED" are all excluded. `ticks()` turns each date into a number so dates compare reliably. Both ends of the window, today and today plus 14 days, are included.

**Checkpoint:** With the sample data and a current date of 17 September 2026, four rows match: 21, 22, 24 and 28 September. The completed rows don't match, including the one on 23 September.

---

## 7.4 Start the Reminder Counter

Add **Variables > Initialize variable** after Filter array. Rename it `Initialize reminder count`:

| Field | Value |
|-------|-------|
| Name | ReminderCount |
| Type | Integer |
| Value | 0 |

---

## 7.5 Loop Through the Filtered Rows

Open **Apply to each** and replace its input with **Body** from Filter upcoming incomplete training.

> **Key point:** Don't use the original Excel value array here. That brings back the Chapter 5 behaviour and includes completed and out-of-window rows.

---

## 7.6 Count Each Prepared Reminder

Inside Apply to each, after Send an email (V2), add **Variables > Increment variable**. Select **ReminderCount** and enter `1`.

Keep the increment *after* the email. That way the count only includes reminders whose email step completed.

---

## 7.7 Review the Learner Reminder

Confirm Send an email (V2) is still inside Apply to each and still uses the current row: To is `item()?['Email']`, Subject and Body are the Chapter 5 expressions. Nothing changes in the email itself. The loop now just feeds it upcoming incomplete records only.

---

## 7.8 Decide Whether a Summary Is Needed

Add **Control > Condition** *after* Apply to each, outside the loop. Rename it `If reminders were prepared`:

| Left value | Operator | Right value |
|------------|----------|-------------|
| ReminderCount | is greater than | 0 |

A positive count goes to True. Zero goes to False.

---

## 7.9 Prepare the Coordinator Summary

In the True branch, add **Office 365 Outlook > Send an email (V2)** and rename it `Send coordinator summary`:

| Field | Value |
|-------|-------|
| To | coordinator@example.com |
| Subject | `[PA TRAINING] Weekly reminder summary` |
| Body | The summary sentence from the copy-paste page, with **ReminderCount** inserted in the middle |

---

## 7.10 Handle a Week with No Matching Rows

In the False branch, add **Data Operation > Compose**, rename it `No upcoming records`, and enter the no-records sentence from the copy-paste page. That records a clear outcome without sending an unnecessary email.

---

## 7.11 Save and Check the Capstone

1. Select **Save**, open **Flow checker**, and confirm zero errors and zero warnings.
2. Close Flow checker, select **Zoom view to fit**, and check the full sequence: filter before the loop, count inside the loop, decision after the loop.

---

## Trainer-Controlled Test

A test can send one learner reminder per matching row plus, when the count is positive, a coordinator summary. With the sample data on 17 September 2026, expect four rows. The trainer replaces every `example.com` address, saves the workbook, confirms the coordinator address and authorises the run first.

Afterwards, check the run history:

- Filter upcoming incomplete training returned the expected rows
- Apply to each ran once per filtered row
- ReminderCount went up once per completed iteration
- A positive count took the True branch and prepared the coordinator summary
- A zero-count test took the False branch and produced the Compose output

---

## Independent Practice

Without running the flow, change the window from 14 days to 7 by editing only the last date expression. Which sample rows would match on 17 September 2026? Then restore 14 days.

---

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| A completed row passes the filter | Status spelling, `trim()`, `toLower()` and the exact text `completed` |
| A date comparison fails | DateTime Format is ISO 8601 and SessionDate holds valid dates |
| Apply to each still includes every row | Use the Body of Filter upcoming incomplete training, not the Excel value array |
| ReminderCount stays at zero | The variable is initialised before the loop and incremented inside it |
| The summary runs before reminders finish | Put the Condition after Apply to each, outside its container |
| The False branch has an email action | Use Compose for the no-records result |
| Flow checker is clean but a test is unsafe | Flow checker checks structure. It doesn't approve recipients or stop messages |

---

## Lesson Summary

The capstone filters before looping, normalises text inside an expression, compares dates as numbers, keeps an integer counter, and branches on the final count. That turns a broad weekly reminder into a controlled process with a clear result for the coordinator.
