# 07 - Capstone: Weekly Reminders and Summary

Chapter 5 sent a reminder to every row, including people who had already finished. The capstone turns that into a process a coordinator would actually use: skip completed training, limit the window to the next 14 days, count what was sent, and handle the week when nothing matches.

> **Copy-paste values:** action names, the variable name and summary text are on the [copy-paste page](./copy-paste.md).

**Estimated time:** 90 minutes

**Your result:** A copy of the weekly reminder flow that keeps only upcoming incomplete records, counts the reminders, and follows a clear summary or no-records branch.

---

## What You Will Learn

- Filter a list before a loop with **Filter array**
- Work out a future date with **Get future time**
- Use a condition with two rules that must both be true
- Count processed items with an integer variable
- Branch after a loop, including a week with no matching records

---

## How the Flow Works

**Recurrence > Current time > Convert time zone > List rows > Filter array > Get future time > Initialize variable > Apply to each (Condition > Send reminder > Increment variable) > Condition > Summary or no-records message**

Filter array removes completed rows before the loop starts. Inside the loop, a condition checks that the session falls in the next 14 days. A counter goes up once per reminder. After the loop, a second condition checks the counter and picks what to tell the coordinator.

---

## Before You Begin

Complete Chapter 5.

> **Important:** The sample register uses `example.com` addresses, which can't receive mail. Keep the capstone turned off and don't test it until the trainer has replaced every recipient with an approved destination.

> **Note:** The sample sessions run from 21 September to 5 October 2026. If your class is on a different date, ask your trainer to shift the SessionDate values so some fall in the next 14 days.

---

## 7.1 Make a Safe Capstone Copy

1. Go to **My flows** and open `PA - Weekly training reminders`.
2. Select **Save As** (in the **...** menu if it isn't visible).
3. Name the copy `PA - Weekly training capstone` and select **Save**. The copy starts turned off.
4. Go back to **My flows** and open the capstone copy.

![Save As dialog naming the copy PA - Weekly training capstone](./images/07-01-save-as.png)

*Working on a copy keeps your Chapter 5 flow safe.*

**Checkpoint:** The name at the top of the designer reads `PA - Weekly training capstone` before you change anything.

---

## 7.2 Remove Completed Rows with Filter Array

1. Select **+** between **List rows present in a table** and **Apply to each**, then **Add an action**.
2. Search for `Filter array` (under **Data Operation**) and select it.
3. Rename it: select the action's title and type `Filter out completed training`.
4. In **From**, insert **body/value** (or **value**) from *List rows present in a table*.
5. In the left box, insert **Status** from dynamic content.
6. Set the middle box to **is not equal to**.
7. In the right box, type `Completed`.

![Filter array renamed Filter out completed training with From set to the Excel value list and Status is not equal to Completed](./images/07-02-filter-array.png)

*Filter array keeps only the rows where the rule is true. Completed rows are dropped before the loop.*

> **Tip:** The comparison is exact, including capital letters. `Completed` and `completed` count as different. The sample data uses `Completed`.

---

## 7.3 Work Out the End of the Window

1. Below Filter array, add **Get future time** (under **Date Time**).
2. Set **Interval** to `14` and **Time unit** to **Day**.

![Get future time with Interval 14 and Time unit Day](./images/07-03-future-time.png)

*This gives you "14 days from now" without any expression.*

You now have both ends of the window: **Current time** (already in the flow from Chapter 5) and **Future time** from this step.

---

## 7.4 Start the Reminder Counter

1. Below Get future time, add **Initialize variable** (under **Variables**).
2. Rename it `Initialize reminder count`.
3. Set:

| Field | Value |
|-------|-------|
| Name | ReminderCount |
| Type | Integer |
| Value | 0 |

![Initialize variable named Initialize reminder count with ReminderCount, Integer, 0](./images/07-04-variable.png)

*A variable is a named box that can change while the flow runs. This one starts at zero.*

> **Key point:** Variables must be created at the top level of the flow, never inside a loop or a condition. That's why this step comes before Apply to each.

---

## 7.5 Loop Through the Remaining Rows

1. Select **Apply to each**.
2. Remove the current input (select the **x** on the token).
3. Insert **Body** from *Filter out completed training*.

![Apply to each with Body from Filter out completed training as its input](./images/07-05-loop-input.png)

*The loop now only sees rows that aren't completed.*

> **Key point:** Don't leave the original Excel value here. That brings back the Chapter 5 behaviour and includes completed rows.

---

## 7.6 Check the Date Window

1. Inside Apply to each, select **+** above **Send an email (V2)**, then **Add an action**, and add a **Condition**.
2. Rename it `Is the session in the next 14 days`.
3. First row: insert **SessionDate**, choose **is greater than or equal to**, insert **Current time**.
4. Select **+ New item** > **Add row**. Second row: insert **SessionDate**, choose **is less than or equal to**, insert **Future time**.
5. Make sure the rows are joined by **AND**, so both must be true.
6. Drag **Send an email (V2)** into the **True** branch. (Or delete it and add it again inside True with the same settings.)

![Condition inside the loop with two AND rows comparing SessionDate to Current time and Future time, and the email in the True branch](./images/07-06-date-condition.png)

*Two rules joined by AND: on or after now, and on or before 14 days from now.*

This works because the Excel dates are in ISO 8601 format (set in Chapter 5), the same format as Current time and Future time. Same format means they compare correctly.

---

## 7.7 Count Each Reminder

1. In the **True** branch, below **Send an email (V2)**, add **Increment variable** (under **Variables**).
2. Select **ReminderCount** and enter `1` for **Value**.

![Increment variable below the email in the True branch with ReminderCount and value 1](./images/07-07-increment.png)

*Each reminder adds one to the counter.*

Keep the increment *after* the email, so the count only includes reminders that reached the email step.

---

## 7.8 Decide Whether a Summary Is Needed

1. Below **Apply to each**, outside the loop, add a **Condition**.
2. Rename it `If reminders were prepared`.
3. Insert **ReminderCount** (under *Variables*), choose **is greater than**, type `0`.

![Condition below the loop with ReminderCount is greater than 0](./images/07-08-summary-condition.png)

*A positive count goes to True. Zero goes to False.*

---

## 7.9 Prepare the Coordinator Summary

In the **True** branch, add **Send an email (V2)** and rename it `Send coordinator summary`:

| Field | Value |
|-------|-------|
| To | coordinator@example.com |
| Subject | `[PA TRAINING] Weekly reminder summary` |
| Body | Type `The weekly training reminder flow prepared `, insert **ReminderCount**, then type ` reminder(s) for upcoming sessions in the next 14 days.` |

![Send coordinator summary with the ReminderCount token in the body](./images/07-09-summary-email.png)

*The variable drops into the email like any other dynamic content.*

---

## 7.10 Handle a Week with No Matching Rows

In the **False** branch, add **Compose** (under **Data Operation**), rename it `No upcoming records`, and type `No upcoming training records were found for the next 14 days.` in **Inputs**.

That records a clear outcome in run history without sending an unnecessary email.

---

## 7.11 Save and Check the Capstone

1. Select **Save**, open **Flow checker**, and confirm zero errors and zero warnings.
2. Close Flow checker and select **Fit view** (the zoom button at the bottom). Check the shape: filter before the loop, date check and count inside the loop, decision after the loop.

![The complete capstone flow zoomed to fit, showing the filter, the loop with its condition, and the final condition with both branches](./images/07-10-full-flow.png)

*Filter before, check and count inside, decide after.*

---

## Trainer-Controlled Test

A test can send one learner reminder per matching row plus, when the count is positive, a coordinator summary. With the sample data on 17 September 2026, four rows match (21, 22, 24 and 28 September). The trainer replaces every `example.com` address, saves the workbook, confirms the coordinator address and authorises the run first.

Afterwards, check the run history:

- Filter out completed training returned four rows
- Apply to each ran four times, and the date condition was true each time
- ReminderCount ended at 4
- The final condition took True and prepared the coordinator summary

---

## Independent Practice

Without running the flow, change the window from 14 days to 7 by editing only **Get future time**. Which sample rows would match on 17 September 2026? Then change it back to 14.

---

> **Going further: one filter that does it all.** Experienced makers often replace the filter and the date condition with a single Filter array in **advanced mode**, using an expression that also ignores capital letters and stray spaces. The expression is on the copy-paste page. You'll build flows like that in the advanced course. Optional.

---

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| A completed row still gets a reminder | Filter array right value is exactly `Completed`, and the loop uses Filter's **Body** |
| Every date fails the condition | DateTime Format is ISO 8601 in List rows present in a table |
| No date passes the condition | The sample dates may be in the past. Ask the trainer to update SessionDate |
| ReminderCount stays at zero | Increment variable is inside the True branch of the date condition |
| Initialize variable can't be added | You're inside the loop. Variables are created at the top level |
| The summary runs before reminders finish | Put the final Condition below Apply to each, outside its box |
| Flow checker is clean but a test is unsafe | Flow checker checks structure. It doesn't approve recipients |

---

## Lesson Summary

The capstone filters out completed rows before looping, checks a date window with a two-rule condition, keeps a running count in a variable, and branches on the final count. That turns a broad weekly reminder into a controlled process with a clear result for the coordinator. Next, you'll use variables again, alongside parallel branches, in a flow that's all about you.
