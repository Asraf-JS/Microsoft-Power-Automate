# 03 - Save Email Attachments Automatically

Your first build: an automated flow that watches for training emails and saves only the PDF attachments to OneDrive.

> **Copy-paste values:** the flow name, subject filter and expressions are on the [copy-paste page](./copy-paste.md).

**Estimated time:** 120 minutes

**Your result:** An automated cloud flow that examines new training emails and saves only PDF attachments to OneDrive for Business.

**Connectors:** Office 365 Outlook and OneDrive for Business, both standard.

---

## What You Will Learn

- Create an automated cloud flow from a business requirement
- Configure an Outlook trigger with a subject filter
- Process several attachments with **Apply to each**
- Use a condition to select PDF files
- Create a file in a OneDrive folder
- Test a matching and a non-matching case, then inspect run history

---

## Before You Begin

Complete Chapter 2. Check that the `Attachments` folder exists and the test email from section 2.3 is saved in Drafts. That draft uses the subject `[PA TRAINING] Attachment test` and has two fictional attachments from the Chapter 2 [test-files](https://github.com/Asraf-JS/Microsoft-Power-Automate/tree/main/02-prepare-workspace/test-files) folder:

| File | Purpose |
|------|---------|
| CourseOutline.pdf | The attachment that should be saved |
| TrainerPhoto.jpg | The attachment that should be skipped |
| SessionNotes.docx | Used only in the independent practice |

> **Note:** OneDrive never silently overwrites a file. If you run the test twice with the same attachment, Create file either fails with a duplicate-name error or OneDrive saves `CourseOutline (1).pdf`. Both are correct behaviour. Delete the file from Attachments before a repeat test, or see section 3.8.

**The rule:** when a new email arrives with `[PA TRAINING]` in the subject, examine each attachment. If its name ends in `.pdf`, create a file in the Attachments folder.

---

## 3.1 Create the Automated Cloud Flow

1. Open Power Automate and confirm the correct environment.
2. Select **Create**, then **Automated cloud flow**.
3. Name the flow `PA - Save training PDF attachments`.
4. Search for and select the trigger **When a new email arrives (V3)** from **Office 365 Outlook**.
5. Select **Create**. The designer opens with only the trigger on the canvas.

---

## 3.2 Configure the Trigger

1. Set **Include Attachments** to **Yes**.
2. Set **Folder** to **Inbox**.
3. In **Subject Filter**, enter `[PA TRAINING]`.
4. Set **Only with Attachments** to **Yes**. If a field is hidden, use **Show all** under Advanced parameters.
5. Select **Save**.

**Checkpoint:** The trigger saves without a red validation message. The flow only starts for *new* matching messages. It doesn't go back and process mail already in the inbox.

---

## 3.3 Add Apply to Each

1. Select the **+** insertion button.
2. Search for **Apply to each** and select the Control action.
3. In **Select an output from previous steps**, choose the trigger's **Attachments** dynamic content.

If the Attachments token isn't offered, go back to the trigger and confirm Include Attachments is set to Yes.

---

## 3.4 Add the PDF Condition

1. Inside the loop, select **Add an action**.
2. Search for **Condition** and choose the Control condition.
3. In the left value, select **Attachments Name**. If the token picker is awkward, type `/`, choose **Insert expression**, and enter `item()?['name']`. That reads the current attachment in the loop.
4. Set the comparison to **ends with**.
5. Enter `.pdf` in the right value.
6. In the **True** branch, select **Add an action**.

---

## 3.5 Create the OneDrive File

1. Search for **OneDrive for Business**, then pick **Create file** from that connector's group.

> **Tip:** Search by connector name, not action name. Several connectors have an action called Create file, and it's easy to grab the wrong one.

2. In **Folder Path**, select `Attachments` under `Power Automate Training`.
3. In **File name**, select the current attachment's **Name**.
4. In **File content**, select the current attachment's **Content**, or use the expression `item()?['contentBytes']`. After you reopen the designer these may display as `name` and `contentBytes`. Same properties.
5. Leave the **False** branch empty. That's the deliberate decision to skip non-PDF files.
6. Check that Create file sits inside True and that False has no actions.
7. Select **Save**, open **Flow checker**, and confirm 0 errors and 0 warnings.

---

## 3.6 Test a Positive Case

1. Select **Test**, choose **Manually**, then **Test**. (Automatically is greyed out on a new flow because it replays a previous run.)
2. Wait for the banner asking you to send a new email. The flow is now listening.
3. Open the draft from section 2.3 and send it.
4. When the run finishes, open it. The loop counter reads **2 of 2**, and Create file succeeded.
5. Open the Attachments folder in OneDrive. The PDF is there. No image file was created.

---

## 3.7 Test a Negative Case

You don't need another email. The mixed test already produced both outcomes.

1. Open the same run.
2. In Apply to each, switch the iteration counter from 2 to 1.
3. Select **Condition** and read **expressionResult**. It's `false`, Create file shows a skip marker, and the False branch reports *No Actions*.
4. Check the Attachments folder again. Only the PDF is there.

> **Key point:** A run can succeed while deliberately producing nothing. *Succeeded* means the process completed, not that every branch created an output.

Optional: send `[PA TRAINING] Image-only test` with only `TrainerPhoto.jpg` attached. The run succeeds and creates nothing.

---

## 3.8 Decide What Happens to Duplicate Names

Your flow uses the attachment's own name, so the same attachment arriving twice targets the same path. Pick a policy on purpose:

| Policy | How | When it suits |
|--------|-----|---------------|
| Keep one copy | Delete the file from Attachments before re-testing | Classroom testing |
| Let OneDrive number them | Change nothing | Quick repeat tests where clutter doesn't matter |
| Make every name unique | Put a timestamp expression in File name | A real process where two senders may use the same file name |

The timestamp expression is on the copy-paste page. It produces names like `20260913-094512-CourseOutline.pdf`. `utcNow()` returns UTC, not local time. Chapter 5 covers time zone conversion.

---

## Independent Practice

Change the condition to save `.docx` attachments instead of PDFs. Send one test email with both `SessionNotes.docx` and `CourseOutline.pdf`. Predict which file appears, run it, then restore the `.pdf` rule.

---

## Tips and Troubleshooting

| Problem | Check |
|---------|-------|
| The flow doesn't run | The message must be new, contain `[PA TRAINING]` in the subject, and reach the mailbox used by the Outlook connection |
| Attachments token is missing | Turn on Include Attachments in the trigger, save, and reopen the loop input |
| The loop runs but creates nothing | Inspect the condition. Left value is the attachment name, right value is `.pdf`. The comparison isn't case-sensitive |
| Create file fails | OneDrive connection, folder path, file name and file content token |
| Duplicate file error | Use a unique test file name or add the timestamp expression |
| The JPG is saved | Create file is outside the condition. Move it into True |

---

## Lesson Summary

This flow combines an event trigger, a loop over attachments, a condition for the business rule and a OneDrive action for the result. You tested both a file-producing path and a successful no-output path. Next, an instant flow reads the Excel table and sends a summary.
