# 04 - Create and Distribute an Excel Summary

The coordinator wants a readable list of training sessions on demand, without copying cells into an email by hand. An instant flow reads the register and sends one summary table.

> **Copy-paste values:** the flow name, Select mappings and subject are on the [copy-paste page](./copy-paste.md).

**Estimated time:** 120 minutes

**Your result:** An instant cloud flow that reads the training register, picks useful columns and produces one summary email. A Teams update is an optional extension.

---

## What You Will Learn

- Start a flow on demand with an instant trigger
- Read rows from an Excel table with **List rows present in a table**
- Choose report columns with the **Select** action
- Turn an array into one HTML table and send it in a single email
- Inspect run history to confirm what each action produced

---

## How the Flow Works

**Manually trigger a flow > List rows present in a table > Select > Create HTML table > Send an email (V2)**

The Excel action returns an array of records. Select shapes each record into the columns readers need. Create HTML table turns the whole array into one table. The email action runs once, after the table is complete.

---

## Before You Begin

You need `Power Automate Training/TrainingRegister.xlsx` in OneDrive for Business with a formatted table named `tblTraining`:

| Column | Contents | Used in this chapter for |
|--------|----------|--------------------------|
| TrainingID | TR-001 to TR-006 | The independent practice |
| ParticipantName | Fictional names | A report column |
| Email | Placeholder addresses | Read but deliberately left out of the report |
| CourseTitle | Fictional course names | A report column |
| SessionDate | Real Excel dates | A report column, and date formatting in 4.8 |
| Status | Registered or Completed | A report column |

> **Note:** Addresses like `learner1@example.com` are just data in this chapter. `example.com` is reserved for documentation and can't receive mail. The summary goes to your own training mailbox, not to the people in the table.

> **Tip:** Before each run, finish any cell edit and let Excel save. The connector reads the saved cloud file, so an open edit gives you a stale report.

---

## 4.1 Confirm the Source Table

1. Open `TrainingRegister.xlsx` from the training folder. You built it in section 2.2, so you're only checking it here.
2. Check the header row. All six columns must be present and spelled exactly as above, because the expressions refer to them by name.
3. Select a cell in the data and confirm the table name is exactly `tblTraining`.
4. Confirm `SessionDate` holds real dates, not text, and `Status` uses only Registered or Completed.

> **Key point:** A worksheet name and a table name are different things. The Excel connector needs a formatted table. If the Table dropdown is empty later, this is almost always why.

SessionDate may come back from the connector as a serial number such as `46286`. Section 4.3 sets the date format to prevent that.

---

## 4.2 Create an Instant Cloud Flow

1. Confirm the training environment and select **Create > Instant cloud flow**.
2. Name the flow `PA - Training register summary` and choose **Manually trigger a flow**.
3. Select **Create**.

This trigger starts only when you run it. A new email or an edited spreadsheet won't start it.

---

## 4.3 Read the Excel Records

1. Add **Excel Online (Business) > List rows present in a table**.
2. Set **Location** to **OneDrive for Business**. (The list also shows every group and SharePoint site you belong to.)
3. Set **Document Library** to **OneDrive**. The other two libraries, KARuntime and PersonalCacheLibrary, are internal and won't have your workbook.
4. In **File**, browse to `Power Automate Training` and pick the workbook. Then choose `tblTraining` in **Table**.
5. Under advanced parameters, set **DateTime Format** to **ISO 8601** if it's available.

If Table shows *No items*, stop. The workbook has no formatted table, and reselecting the file won't fix it. Go back to section 2.2.

---

## 4.4 Choose the Report Columns

1. Add **Data Operation > Select** after the Excel action.
2. In **From**, insert the Excel action's **value** output. That's the array of all returned rows.
3. Add these key and value pairs:

| Report heading | Value expression |
|----------------|------------------|
| Participant | `item()?['ParticipantName']` |
| Course | `item()?['CourseTitle']` |
| Session date | `item()?['SessionDate']` |
| Status | `item()?['Status']` |

Readers see four useful columns. Email and the internal row metadata are left out, and Select handles every row without you adding an Apply to each.

---

## 4.5 Build One HTML Table

1. Add **Data Operation > Create HTML table** after Select.
2. In **From**, select **Output** from Select. Leave columns on automatic, since Select already defines the headings.

**Checkpoint:** If an Apply to each appears around this action or the email, you picked a single row field instead of the whole array.

---

## 4.6 Send the Coordinator Summary

1. Add **Office 365 Outlook > Send an email (V2)** after Create HTML table.
2. Set **To** to your own training mailbox and **Subject** to `[PA TRAINING] Training register summary`.
3. In the body, type a short introduction and insert **Output** from Create HTML table below it. Switch the editor to HTML/code mode if needed so the table renders instead of showing raw tags.
4. Select **Save**, run **Flow checker**, and fix anything it reports.

---

## 4.7 Test and Inspect

1. Select **Test > Manually > Test**. This sends a real email, so follow your trainer's instruction before selecting **Run flow**.
2. Open the completed run. Every action has a green check, and Send an email (V2) ran once.
3. Check the Excel output returned six records. Open **Show raw outputs** for Select and confirm the six records have real values, not formula text.
4. Open the email. You should see four headings, six data rows, and one message.

Each manual run sends one current report. Earlier emails stay as historical snapshots.

---

## 4.8 Optional Formatting Practice

Start from the working report. In the HTML/code editor, add a short introduction and modest styling: readable font, strong contrast, a header row and decent cell padding. Email clients treat CSS differently, so check the received message after each change.

The row-count and date-format expressions are on the copy-paste page. Check the Excel output before formatting dates, and remember empty dates need a blank-value check before `formatDateTime`.

---

## 4.9 Optional Teams Update

Trainer-led only, once a permitted destination is confirmed. After the email, add **Microsoft Teams > Post message in a chat or channel**, choose the approved posting identity and destination, and post a short record count plus a OneDrive link to the workbook. Pasting a link doesn't grant access, so check who can open it. Keep the Teams message short rather than reusing the email's HTML table.

---

## Independent Practice

Add Training ID to the report without adding Email. Predict where the change belongs, make it, and verify the received message. Then explain why a six-record table should still produce only one email.

---

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| No Excel table is listed | Workbook location, saved table, table name and connector account |
| One email arrives for every row | Move the email outside any loop and use the Create HTML table output |
| The report includes internal columns | Use Select to define headings and values |
| The email shows HTML tags | The body editor mode and the selected output token |
| A date appears as a number | The DateTime Format setting and the actual run output |
| The report is stale | Finish the Excel edit, wait for save, and run again |
| Teams posting fails | Destination membership, posting identity, policy and Workflows app availability |

---

## Lesson Summary

An instant trigger lets the coordinator decide when to run. Excel supplies the records, Select defines the report columns, and Create HTML table produces one report. Next, a recurrence trigger starts a reminder process on a schedule.

For reference, see the [Excel Online (Business) connector](https://learn.microsoft.com/en-us/connectors/excelonlinebusiness/) and [data operations in Power Automate](https://learn.microsoft.com/en-us/power-automate/data-operations).
