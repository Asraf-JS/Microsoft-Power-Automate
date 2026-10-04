# 08 - My Morning Briefing: Variables and Parallel Branches

Every morning you check the weather, your calendar and your inbox before the day starts. This flow does all three at once and sends you one email. It only reads your own data and only emails you, so it's safe to build in a live environment.

> **Copy-paste values:** the variable names, branch text and email body are on the [copy-paste page](./copy-paste.md).

**Estimated time:** 60 minutes

**Your result:** A scheduled flow that runs on weekday mornings, looks up the weather, your meetings and your important unread email in three parallel branches, and sends you one briefing email.

---

## What You Will Learn

- Create variables with **Initialize variable** and explain why they live at the top of a flow
- Change variables with **Increment variable**, **Append to string variable** and **Set variable**
- Run independent steps side by side with **parallel branches**
- Bring parallel branches back together before a final step
- Use a variable's value in a condition and an email

---

## How the Flow Works

```
Recurrence
  > Initialize four variables
  > Three parallel branches:
      Weather:  Get current weather
      Meetings: Current time > Get future time > Get calendar view > loop (count + list)
      Email:    Get emails > loop (list)
  > Condition: more than 4 meetings? > Set the subject
  > Send me the briefing
```

The three lookups don't depend on each other. The weather doesn't need your calendar and your calendar doesn't need your inbox. When steps are independent, they can run **in parallel**, side by side, instead of waiting in a queue. The flow only moves on to the email once all three branches have finished.

> **Note:** Your trainer has confirmed that MSN Weather, Office 365 Outlook and the Date Time actions are allowed in your environment. Nothing in this flow changes your calendar or mailbox.

---

## 8.1 Create the Scheduled Flow

1. Select **Create** > **Scheduled cloud flow**.
2. In **Flow name**, enter `PA - My morning briefing`.
3. Set **Repeat every** to **1 Week**, tick **M T W T F**, and set the time to **8:00 AM**.
4. Select **Create**.
5. Open **Recurrence** and confirm the **Time zone** is **(UTC+08:00) Kuala Lumpur, Singapore** and the preview reads 8:00 on Monday to Friday.

![Recurrence set to weekly on Monday to Friday at 8:00 in the Kuala Lumpur time zone](./images/08-01-recurrence.png)

*Weekday mornings at 8:00, Malaysia time.*

---

## 8.2 Create the Variables

A **variable** is a named box that holds a value and can change while the flow runs. You've used one already: ReminderCount in Chapter 7. This flow uses four, of two types.

| Name | Type | Starting value | What it's for |
|------|------|----------------|---------------|
| MeetingCount | Integer | `0` | Counts today's meetings |
| MeetingList | String | *(leave empty)* | Collects the meeting names |
| EmailList | String | *(leave empty)* | Collects the important email subjects |
| BriefingSubject | String | `Your day ahead` | The email subject. May change later |

1. Below Recurrence, add **Initialize variable** (under **Variables**).
2. Set **Name** `MeetingCount`, **Type** **Integer**, **Value** `0`.
3. Add three more **Initialize variable** actions, one below the other, for the other rows in the table.

![Four Initialize variable actions stacked below Recurrence](./images/08-02-variables.png)

*All four variables are created before anything else happens.*

> **Key point:** Initialize variable only works at the top level of a flow, not inside a loop, condition or branch. So every variable is created first, even ones you won't use until later.

---

## 8.3 Branch 1: The Weather

1. Below the last **Initialize variable**, select **+** > **Add an action**.
2. Search for `MSN Weather` and select **Get current weather**.
3. Set **Location** to `Kuala Lumpur` and **Units** to **Metric**.

![Get current weather with Location Kuala Lumpur and Units Metric](./images/08-03-weather.png)

*One action. Its values (conditions, temperature) are used in the email later.*

---

## 8.4 Branch 2: Your Meetings

This branch starts *beside* the weather, not below it.

1. Select the **+** between the last **Initialize variable** and **Get current weather** (right-click it if a menu doesn't open), then choose **Add a parallel branch**.

![The plus menu between two actions showing Add an action and Add a parallel branch](./images/08-04-add-parallel.png)

*Add a parallel branch starts a new column next to the existing one.*

2. In the new branch, add **Current time** (under **Date Time**).
3. Below it, add **Get future time** (under **Date Time**). Set **Interval** `12`, **Time unit** **Hour**.
4. Below it, add **Get calendar view of events (V3)** (Office 365 Outlook):

| Field | Value |
|-------|-------|
| Calendar Id | Calendar |
| Start Time | **Current time** from dynamic content |
| End Time | **Future time** from dynamic content |

5. Below it, add **Apply to each** (under **Control**). In **Select an output from previous steps**, insert **body/value** from *Get calendar view of events (V3)*. That's the list of events.
6. Inside the loop, add **Increment variable**. Select **MeetingCount**, value `1`.
7. Inside the same loop, below Increment, add **Append to string variable**. Select **MeetingList**. In **Value**, type `<br>• ` and then insert **Subject** from *Get calendar view of events (V3)*.

![The meetings branch: Current time, Get future time, Get calendar view of events, and a loop with Increment variable and Append to string variable](./images/08-05-meetings-branch.png)

*Each meeting adds one to the count and one line to the list.*

> **Tip:** Email bodies are written in HTML, the language of web pages. `<br>` is HTML for "new line", so each meeting starts on its own line in the email.

---

## 8.5 Branch 3: Important Unread Email

1. Add a third parallel branch the same way: **+** on the arrow below the last **Initialize variable** > **Add a parallel branch**.
2. Add **Get emails (V3)** (Office 365 Outlook):

| Field | Value |
|-------|-------|
| Folder | Inbox |
| Fetch Only Unread Messages | Yes |
| Importance | High |
| Top | 5 |

3. Below it, add **Apply to each** and insert **body/value** from *Get emails (V3)*.
4. Inside the loop, add **Append to string variable**. Select **EmailList**. In **Value**, type `<br>• `, insert **Subject**, type ` (from `, insert **From**, type `)`.

![Three branches side by side: weather, meetings and email](./images/08-06-three-branches.png)

*Three independent branches, running at the same time. The lines curving into the meetings loop are explained in section 8.6.*

> **Key point:** Each branch writes to its **own** variable. If all three appended to one shared variable, the sections would arrive in whatever order the branches happened to finish. Separate variables keep the email in a fixed order.

---

## 8.6 Bring the Branches Back Together

The next step must wait until all three branches have finished.

1. At the bottom of the **meetings** branch, below its loop, add a **Condition**. Rename it `Busy day`.
2. Open the Condition's **Settings** tab. Under **Run after**, select **Select actions** and tick the last action of each branch: **Get current weather**, the meetings **Apply to each**, and the email **Apply to each 1**. Leave **Is successful** ticked for each.
3. Check the **Run after** list shows all three actions, then **Save**.

![Busy day selected with Settings open, showing Run after set to Apply to each, Get current weather and Apply to each 1](./images/08-07-join.png)

*Run after lists one action from each branch, so Busy day waits for the slowest branch.*

> **Note:** The designer draws the lines from the weather and email branches into the side of the meetings loop, not into Busy day. That's just how it lays out the picture. The **Run after** list is what actually controls the order, so trust that, not the lines.

---

## 8.7 Change the Subject on a Busy Day

1. In **Busy day**, insert **MeetingCount**, choose **is greater than**, type `4`.
2. In the **True** branch, add **Set variable**. Select **BriefingSubject**. In **Value**, type `Busy day ahead: `, insert **MeetingCount**, type ` meetings`.
3. Leave **False** empty. The subject keeps its starting value, *Your day ahead*.

![Busy day condition with MeetingCount is greater than 4 and Set variable in the True branch](./images/08-08-set-variable.png)

*Set variable replaces a variable's value. Append adds to it. Increment adds to a number.*

---

## 8.8 Send the Briefing

1. Below **Busy day** (outside it), add **Send an email (V2)** (Office 365 Outlook).
2. **To:** your own email address.
3. **Subject:** insert **BriefingSubject**.
4. **Body:** type the text below and insert the tokens shown in brackets. The weather values come from *Get current weather*. The rest are under *Variables*.

> Good morning,
>
> Weather in Kuala Lumpur: **[Conditions]**, **[Temperature]**°C
>
> Meetings in the next 12 hours (**[MeetingCount]**):**[MeetingList]**
>
> Important unread email:**[EmailList]**

![Send an email (V2) with BriefingSubject in the subject and the body built from weather values and variables](./images/08-09-email.png)

*Variables drop into the email like any other dynamic content.*

5. Select **Save** and open **Flow checker**. Fix anything it reports.

---

## 8.9 Test It

This flow only emails you, so you can test it yourself.

1. Select **Test** > **Manually** > **Test** > **Run flow**.
2. Open the run. Notice that the three branches started at almost the same moment.
3. Select **Busy day** and check which branch it took. Select a **Set variable** or **Increment variable** step to see the value it stored.
4. Open the email in Outlook.

![The briefing email in Outlook showing weather, the meeting list and important unread email](./images/08-10-email-received.png)

*Your briefing. Each section came from a different branch.*

If you have no meetings or no important unread email, those lists are simply empty and the count reads 0. That's correct.

---

## Independent Practice

Add a fourth parallel branch that counts up to 25 unread emails of any importance. Create an Integer variable `UnreadCount` at the top, use **Get emails (V3)** with **Fetch Only Unread Messages** set to Yes and **Top** set to 25, and increment the variable for each email. Add a line to the briefing: *Unread email: [UnreadCount]*.

---

> **Going further: skip empty sections.** Use a condition with **EmailList** *is equal to* (leave the right side empty) to set EmailList to `<br>Nothing urgent. Enjoy your morning.` when there's no important email. Optional.

---

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| Initialize variable isn't offered | You're inside a branch or loop. Add it below Recurrence |
| Get current weather is blocked | Your environment may block MSN Weather. Ask the trainer, or skip branch 1 |
| The meeting list is empty but you have meetings | Start Time is **Current time**, End Time is **Future time**, Calendar Id is **Calendar** |
| Meetings and email appear on one line | The `<br>` is missing at the start of the Append value |
| The email sends before a branch finishes | Busy day's **Run after** must include the last action of every branch |
| The subject never changes | Set variable is in the True branch, and the condition uses MeetingCount *is greater than* 4 |
| Times look eight hours off | The meeting window uses UTC from Current time. For a briefing, a 12-hour window still covers your day |

---

## Lesson Summary

Variables give a flow named boxes that change as it runs. You created four at the top, then used **Increment** to count, **Append** to build lists and **Set** to replace a value. Parallel branches let independent lookups run side by side, each writing to its own variable, and a join makes the final email wait for all of them. Next, you'll ask Copilot to plan a flow for you, and review what it suggests.
