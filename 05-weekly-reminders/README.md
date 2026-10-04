# 05 - Send Weekly Training Reminders

Every week the coordinator opens the register and writes the same reminder for each participant. A scheduled flow can do that at a predictable local time.

> **Copy-paste values:** the flow name and email expressions are on the [copy-paste page](./copy-paste.md).

**Estimated time:** 75 minutes

**Your result:** A scheduled cloud flow that runs every Monday at 9:00 AM Singapore time, reads the training register, and prepares one reminder email for each row.

---

## What You Will Learn

- Schedule a flow with the **Recurrence** trigger and a local time zone
- Convert a UTC timestamp into readable local time
- Loop through Excel rows with **Apply to each**
- Build a personalised email from the values in the current row

---

## How the Flow Works

**Recurrence > Current time > Convert time zone > List rows present in a table > Apply to each > Send an email (V2)**

Recurrence controls when the flow starts. Current time supplies a UTC timestamp, and Convert time zone turns it into readable Singapore time for the message. The Excel action returns an array of rows, and Apply to each processes them one at a time.

---

## Before You Begin

You need `Power Automate Training/TrainingRegister.xlsx` with the `tblTraining` table. This chapter uses every column: ParticipantName for the greeting, Email as the recipient, CourseTitle in the subject and body, SessionDate and Status in the body.

> **Important:** The sample register uses addresses like `learner1@example.com`. They can't receive mail, which is what you want while learning. Replace them with trainer-approved test addresses only when the trainer authorises a live test.

---

## 5.1 Confirm the Training Register

Open `TrainingRegister.xlsx`, confirm all six columns are present, and check the data is a table named `tblTraining`. Save the workbook and finish any active cell edit.

---

## 5.2 Create the Weekly Schedule

1. Select **Create > Scheduled cloud flow**. Name it `PA - Weekly training reminders`, repeat every **1 Week**, select **Monday**, and choose **9:00 AM**.
2. Open **Recurrence** and confirm these values:

| Setting | Value |
|---------|-------|
| Interval | 1 |
| Frequency | Week |
| Time zone | (UTC+08:00) Kuala Lumpur, Singapore |
| On these days | Monday |
| At these hours | 9 |
| At these minutes | 0 |

Read the preview. It should say the flow runs at 9:00 on Monday every week. A weekly frequency without a day and local time is incomplete for this scenario.

---

## 5.3 Produce a Readable Local Timestamp

1. Add **Date Time > Current time** below Recurrence. It needs no parameters.
2. Add **Date Time > Convert time zone** and set:

| Setting | Value |
|---------|-------|
| Base time | Current time from the previous action |
| Source time zone | (UTC) Coordinated Universal Time |
| Destination time zone | (UTC+08:00) Kuala Lumpur, Singapore |
| Format string | Full date/time pattern (short time) |

> **Key point:** The two time zone settings do different jobs. Recurrence decides *when the flow starts*. Convert time zone only changes a timestamp shown in the message. It doesn't move the schedule.

---

## 5.4 Read the Excel Rows

Add **Excel Online (Business) > List rows present in a table**:

| Setting | Value |
|---------|-------|
| Location | OneDrive for Business |
| Document Library | OneDrive |
| File | /Power Automate Training/TrainingRegister.xlsx |
| Table | tblTraining |

If the table list is empty, save the workbook, confirm the range is a formatted table named `tblTraining`, and reselect the file.

---

## 5.5 Process One Row at a Time

Add **Control > Apply to each**. In **Select an output from previous steps**, insert **value** from List rows present in a table. The expression version is on the copy-paste page.

**Checkpoint:** Apply to each needs the Excel **value** array. A single field such as Email or CourseTitle isn't the array.

---

## 5.6 Prepare the Reminder Email

Inside Apply to each, add **Office 365 Outlook > Send an email (V2)** and fill the three required fields from the current row:

| Field | Value |
|-------|-------|
| To | `item()?['Email']` |
| Subject | The subject expression from the copy-paste page |
| Body | The body expression from the copy-paste page |

The body greets the participant by name and lists the course, session date, status and the Singapore-time timestamp.

**Checkpoint:** The email action belongs inside Apply to each. In this version it prepares one message for *every* row, including Completed ones. Chapter 7 adds the filter.

---

## 5.7 Save and Check the Flow

1. Select **Save** and open **Flow checker**. Fix any error before testing.
2. Close Flow checker and confirm the full sequence on the canvas: five top-level steps, with one email action inside Apply to each.

---

## Trainer-Controlled Test

> **Important:** Don't select Test while the workbook still has `example.com` placeholders. A test sends one email per row, so six messages with the sample data. The trainer confirms the recipients and authorises the run immediately before you select Run flow.

After an authorised test, check the run history:

- Recurrence, Current time, Convert time zone and List rows present in a table succeeded
- Apply to each shows the expected number of iterations
- Each Send an email (V2) used that row's Email, CourseTitle, SessionDate and Status
- The reminder timestamp is in Singapore time

---

## Independent Practice

Change the scheduled hour to a value your trainer gives you, read the Recurrence preview, then restore 9:00. Explain why changing Convert time zone wouldn't change when the flow starts.

---

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| The flow starts at the wrong local time | Recurrence time zone, day, hour, minute and preview |
| The message timestamp is eight hours early | Convert time zone source and destination |
| No Excel rows are returned | OneDrive location, workbook save state, formatted table and table name |
| Apply to each is empty | Use the Excel action's value array |
| A recipient or course is blank | Header spelling in the workbook and the current-row expressions |
| Completed records get reminders | Expected in this chapter. Chapter 7 adds the filter |
| Real messages could be sent | Stop, check every Email value, and get trainer authorisation |

---

## Lesson Summary

A scheduled trigger starts the flow at a predictable local time. Date Time actions produce a readable timestamp, Excel supplies the records, and Apply to each hands the current row to the email action. Next you add a human approval decision, and Chapter 7 extends this flow with filtering and a coordinator summary.
