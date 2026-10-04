# 02 - Prepare Your Training Workspace

Every flow in this course reads from or writes to something: a folder, a table, a mailbox, a form, a Teams chat. Set those up first and the later build steps become predictable.

> **Copy-paste values:** the Excel headers, table name and email subject are on the [copy-paste page](./copy-paste.md).

**Estimated time:** 90 minutes

**Your result:** A training folder, an Excel workbook with a table, and safe test data for the first two build exercises.

---

## What You Will Learn

- Create a dedicated training folder structure in OneDrive for Business
- Build an Excel workbook and format its data as a named table
- Prepare a safe test email with sample attachments
- Confirm that Forms, Teams and your Power Automate environment are ready

> **Note:** Use your own training account and the environment your trainer names. Never put real participant information in the practice resources. Use fictional names and test addresses only.

Forms and Teams preparation in this chapter are trainer-led readiness checks, because those destinations depend on your organisation's policy.

---

## 2.1 Create the Training Folders in OneDrive

1. Open OneDrive for Business and select **My files**.
2. Select **Create or upload**, then **Folder**.
3. Name the folder `Power Automate Training` and select **Create**.
4. Open the new folder.
5. Inside it, create two subfolders: `Attachments` and `Reports`.

**Checkpoint:** You can see `Attachments` and `Reports` inside `Power Automate Training`. The Chapter 3 flow writes to Attachments. Summary outputs can go to Reports.

---

## 2.2 Create the Excel Workbook

1. Inside `Power Automate Training`, select **Create or upload**, then **Excel workbook**. Check the breadcrumb first: the workbook is created in whichever folder you're viewing.
2. When Excel for the web opens, select the file name in the title bar and rename it `TrainingRegister`. Excel adds `.xlsx` for you.
3. In Sheet1, enter these headers in row 1:

| TrainingID | ParticipantName | Email | CourseTitle | SessionDate | Status |
|---|---|---|---|---|---|

4. Enter six fictional rows. Include at least two upcoming sessions, one completed session, and one session outside the training week. Use the trainer's approved test addresses in the Email column.
5. Select any cell in the range, choose **Insert > Table**, confirm **My table has headers** is ticked, and select **OK**. Then on the **Table Design** tab, replace the default table name with `tblTraining` and press Enter.

**Checkpoint:** The workbook is named `TrainingRegister.xlsx`, the data is a formatted table named `tblTraining`, and the table has six fictional records.

> **Tip:** Short on time? Your trainer may tell you to use the ready-made [TrainingRegister.xlsx](./TrainingRegister.xlsx) in this folder instead. It already has the `tblTraining` table and six fictional records. Upload it to `Power Automate Training` in OneDrive. Only do this if your trainer says so.

If Power Automate can't find the table later, check three things: the workbook is in OneDrive for Business, the range is formatted as a table, and the table name is exactly `tblTraining`.

---

## 2.3 Prepare a Test Email

1. Open Outlook on the web with the training account.
2. Create a message to your own training mailbox, the one you connect to Power Automate in Chapter 3. Use the subject `[PA TRAINING] Attachment test`.
3. Attach `CourseOutline.pdf` and `TrainerPhoto.jpg` from the [test-files](https://github.com/Asraf-JS/Microsoft-Power-Automate/tree/main/02-prepare-workspace/test-files) folder in this chapter. **Don't send it yet.** Close the message so it's saved in Drafts.

> **Important:** Don't attach real course materials or any file whose name contains a person's name. The filename shows up in run history and in your OneDrive folder.

The Chapter 3 flow only reacts to new messages, so you send this draft during the test in section 3.6.

---

## 2.4 Confirm Forms Readiness

Open Microsoft Forms and confirm the training account can create a form. You build the **Training Request** form in Chapter 6, right before the flow that uses it. It will ask for Requester name, Course, Preferred date and Business reason, with fictional answers only.

---

## 2.5 Confirm the Teams Training Destination

Ask the trainer for the team and channel, or the training chat, and write its name down. The trainer confirms posting access before the Teams exercises: the optional extension in Chapter 4 and the approval messages in Chapter 6.

The Teams connector is standard, but your organisation may restrict posting or require the Workflows app. If you can't post a test message, tell the trainer before building the summary flow.

---

## 2.6 Confirm the Power Automate Environment

1. Return to Power Automate.
2. Check the environment selector near the top of the page.
3. Confirm it matches the environment your trainer gave you.

> **Key point:** OneDrive files, Excel workbooks, Forms and Teams destinations aren't packaged automatically when a solution is moved. Keep a note of where each resource lives. You'll need it in Chapter 9.

---

## Independent Practice

Find the row in `tblTraining` whose Status is Completed. Which later reminder test should exclude it, and why? Then write a second test email without the `[PA TRAINING]` marker, save it as a draft, and predict whether the attachment flow should process it once it's sent.

---

## Lesson Summary

You created a dedicated OneDrive training area with its folders and Excel table, prepared safe inputs for the attachment and summary exercises, confirmed the environment, and noted where the Forms and Teams work will happen. Next you build the flow that saves qualifying email attachments.
