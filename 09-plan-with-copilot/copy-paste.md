# 09 - Plan an Automation with Copilot: Copy-paste

Hover over a grey box and click the copy icon in its top-right corner, then paste into Copilot.

These prompts use fictional details only. Never put confidential information, personal data, passwords or real recipients into a training prompt.

---

## 1. Describe the complete business outcome (section 9.2)

Paste into the box under **What will your flow do?** and select the arrow icon at the bottom right of the box.

```text
Every Friday at 4:00 PM Singapore time, read rows from the tblTraining table in TrainingRegister.xlsx in OneDrive for Business. Keep rows whose Status is Registered and SessionDate is within the next 14 days. Email the training coordinator a summary count. Do not send participant emails.
```

## 2. Clarify the filter and count (section 9.4)

Paste into **Add more details for Copilot to work with** (below the suggested flow) and select the arrow icon at the right end of the box.

```text
Use a Filter array named FilteredRows to keep rows where Status is Registered and SessionDate is between today and 14 days from today. Calculate the count with length(body('FilteredRows')). Send one summary email only to coordinator@example.com. Do not add an Apply to each or any participant email.
```

## 3. Request a streamlined design (section 9.6)

Paste into **Add more details for Copilot to work with** and select the arrow icon at the right end of the box.

```text
Remove Get file metadata using path because List rows present in a table can select the workbook directly. Keep only Recurrence, List rows present in a table, Filter array named FilteredRows, Compose named Count using length(body('FilteredRows')), and one Send an email action to coordinator@example.com.
```

> **Remember:** select **Cancel** at the end (section 9.8). This exercise is planning only.

## 4. Plan your own automation (section 9.9)

Replace each part in square brackets with your details.

```text
I want to automate a task in Power Automate. Don't build anything yet. Help me plan it.

Trigger: [when should it start: a new email, a schedule, a button, a form response]
Data: [where the information lives: Excel table name and columns, SharePoint list, Outlook folder]
Rule: [what decision it makes: for example, only rows where Status is not Completed and the date is in the next 14 days]
Output: [what it produces: one email per row, a summary to me, a Teams message]
Boundary: [what it must never do: for example, send to anyone outside the company, delete anything]

First ask me up to five questions about anything unclear. Then give me:
1. The trigger and each action in order, using Power Automate action names
2. Where a condition, loop or variable is needed and why
3. Which connectors are standard and which may need a premium licence
4. What could go wrong (empty data, duplicates, timing, permissions) and how to guard against it
5. A safe test plan that only sends to me
```

Example, filled in for the Chapter 7 capstone:

```text
Trigger: every Monday at 9:00 Malaysia time.
Data: Excel table tblTraining in OneDrive (ParticipantName, Email, CourseTitle, SessionDate, Status).
Rule: only rows where Status is not Completed and SessionDate is within the next 14 days.
Output: one reminder email per matching row, then one summary email to me with the count.
Boundary: never email anyone while testing; send everything to me until I approve it.
```
