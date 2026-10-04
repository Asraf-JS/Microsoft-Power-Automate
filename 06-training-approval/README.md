# 06 - Process a Training Approval

A training request needs a person to say yes or no before anything is confirmed. This flow collects the request with Microsoft Forms, asks an approver to decide, and posts a different Teams message for each outcome.

> **Copy-paste values:** the flow name, form text, approval title and messages are on the [copy-paste page](./copy-paste.md).

**Estimated time:** 75 minutes

**Your result:** An automated cloud flow that reads a Forms response, asks a person to approve or reject it, and prepares a different Teams message for each outcome.

---

## What You Will Learn

- Start a flow when a Microsoft Forms response is submitted
- Retrieve the answers with **Get response details**
- Request a decision with **Start and wait for an approval**
- Branch on the approval outcome and post a different Teams message for each result

---

## How the Flow Works

**When a new response is submitted > Get response details > Start and wait for an approval > Condition > Approved or rejected Teams message**

The Forms trigger only supplies a response ID. Get response details uses that ID to fetch the answers. The approval action pauses the flow until someone decides. The Condition reads the approval **Outcome** and sends the flow down True or False.

---

## Before You Begin

You need Microsoft Forms, Approvals and Microsoft Teams through your work or school account. Your trainer names an approved test approver and Teams destination before any live test.

> **Important:** The screenshots use `approver@example.com`, a documentation placeholder. Replace it with a trainer-approved account before testing. Don't submit the form or run the flow while the placeholder is still there.

---

## 6.1 Prepare the Request Form

1. Go to [forms.office.com](https://forms.office.com) and sign in with your training account.
2. Select **New Form**.
3. Select **Untitled form** at the top and type `Training Request`. In the description box under it, paste the description from the copy-paste page.
4. Select **Add new question** (or the **+**), then **Text**. Type `Requester name` as the question and switch on **Required** at the bottom of the question.
5. Select **Add new question** > **Choice**. Type `Course` as the question, then type the three options from the copy-paste page (Power Automate Basics, Approval Workflows, Excel Reporting), one per option box. Switch on **Required**.
6. Select **Add new question** > **Date**. Type `Preferred date` and switch on **Required**.
7. Select **Add new question** > **Text**. Type `Business reason`, switch on **Long answer** and **Required**.

Forms saves as you go. There's no Save button.

![Microsoft Forms editor showing the Training Request form with four required questions](./images/06-01-form.png)

*Four required questions. The red asterisk marks each one as required.*

**Checkpoint:** All four questions show the red required marker. A missing answer gives the approver an incomplete card.

---

## 6.2 Create the Automated Flow

1. In Power Automate, select **Create** on the left, then the **Automated cloud flow** tile.
2. In **Flow name**, enter `PA - Training request approval`.
3. In the trigger search box, type `Forms` and select **When a new response is submitted** (Microsoft Forms).
4. Select **Create**.

![Build an automated cloud flow dialog with the flow name and When a new response is submitted selected](./images/06-02-create-flow.png)

*The Forms trigger starts the flow whenever the form gets a response.*

---

## 6.3 Select the Form

1. Select the trigger on the canvas.
2. Open the **Form Id** dropdown and select **Training Request**.

![When a new response is submitted trigger with Form Id set to Training Request](./images/06-03-trigger.png)

*After saving, Form Id shows the form's long internal ID instead of its name. That's normal.*

If the form isn't listed, check that you own or can access it, refresh the list, and confirm the Forms connection uses the right account.

---

## 6.4 Retrieve the Answers

1. Below the trigger, add **Get response details** (Microsoft Forms).
2. Open **Form Id** and select **Training Request** again.
3. Click into **Response Id**, open the dynamic content picker, and select **Response Id** from *When a new response is submitted*.

![Get response details with Form Id Training Request and the Response Id token](./images/06-04-response-details.png)

*The Response Id token links this step to the exact submission that started the flow.*

The trigger only says a response exists. Get response details returns the individual answers so later actions can use them.

---

## 6.5 Request the Decision

1. Below Get response details, add **Start and wait for an approval** (Approvals).
2. Set **Approval type** to **Approve/Reject - First to respond**. If your list doesn't have it, choose **Basic**.
3. In **Title**, enter `[PA TRAINING] Training request`.
4. In **Assigned to**, type the trainer-approved approver's name or email and select them from the list.
5. In **Details**, paste the details template from the copy-paste page. After each label, insert the matching answer from *Get response details*: **Requester name**, **Course**, **Preferred date**, **Business reason**.

![Start and wait for an approval with type, title, assigned to and Details containing the four answers](./images/06-05-approval.png)

*Each label in Details is followed by its answer. In the picker the answers show their question names; after saving they show as codes like `body/r96281c9…`.*

**Checkpoint:** Use the values from **Get response details**, not similarly named values from another action.

---

## 6.6 Branch on the Outcome

1. Below the approval, add **Condition** (Control).
2. In the left box, insert **Outcome** from *Start and wait for an approval*. (After saving it shows as `body/outcome`.)
3. Leave the middle box on **is equal to**.
4. In the right box, type `Approve`.

![Condition with the Outcome token, is equal to, and Approve](./images/06-06-condition.png)

*An Approve outcome goes to True. Anything else goes to False.*

> **Key point:** The text must be exactly `Approve`. A typo or a trailing space sends every approval down the False branch.

---

## 6.7 Prepare the Approved Message

1. Select the **+** inside the green **True** box and add **Post message in a chat or channel** (Microsoft Teams).
2. Set **Post as** to **Flow bot** and **Post in** to **Chat with Flow bot**.
3. In **Recipient**, type the trainer-approved Teams account and select it from the list.
4. In **Message**, type `Training request approved for ` and insert **Course** from *Get response details*.

![Post message in a chat or channel in the True branch with Flow bot settings and the approved message](./images/06-07-teams-approved.png)

*The True branch posts the approved message.*

---

## 6.8 Prepare the Rejected Message

1. Select the **+** inside the red **False** box and add a second **Post message in a chat or channel**.
2. Use the same **Post as**, **Post in** and **Recipient** as section 6.7.
3. In **Message**, type `Training request rejected for ` and insert **Course**.

A production process would also handle outcomes like cancelled or timed-out approvals. This exercise sticks to the two standard Approve and Reject buttons.

---

## 6.9 Save and Check the Flow

1. Select **Save** and open **Flow checker**. Fix every error before testing.
2. Confirm the canvas: three steps before the Condition, and one Teams action in each branch.

![The complete approval flow with a Teams action in each branch of the condition](./images/06-08-full-flow.png)

*Three steps, then one Teams message per branch.*

---

## Trainer-Controlled Test

Testing creates an approval request and may post to Teams. Replace both `approver@example.com` placeholders first and confirm the recipient is ready. Then, with the trainer's go-ahead:

1. Submit one fictional Training Request response.
2. Approve it, and check the True branch and the approved Teams message.
3. Submit a second fictional response.
4. Reject it, and check the False branch and the rejected Teams message.

After each test, open run history and confirm the right branch succeeded while the other was skipped.

---

## Independent Practice

Without running the flow, change the approval title so it also includes the **Course** value. Which action supplies that value, and why can't the trigger supply it on its own?

---

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| Training Request isn't in Form Id | Form ownership or access, the Forms connection account, and a refreshed list |
| The approval has no request details | Get response details Form Id, the Response Id token and the Details tokens |
| The flow waits forever | The assigned approver, the notification, and whether a decision was made |
| An approval goes down False | The Outcome token, *is equal to*, and the exact text `Approve` |
| Teams can't resolve the recipient | Replace the placeholder with a trainer-approved account |
| No Teams message appears | The branch taken, Teams connection, Post in setting, recipient and the action result |
| Flow checker is clean but you can't test | Flow checker checks structure only, not placeholder recipients or policy |

---

## Lesson Summary

A Forms trigger starts the flow with a response ID, Get response details turns it into usable answers, Start and wait for an approval records a human decision, and a Condition routes the request to the matching branch. The flow is ready for a trainer-controlled test once approved recipients replace the placeholders.
