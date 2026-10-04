# 05 - Send Weekly Training Reminders: Copy-paste

Hover over a grey box and click the copy icon in its top-right corner. Anything marked **text** is typed or pasted straight into a field.

---

## Flow name (text, section 5.1)

```text
PA - Weekly training reminders
```

## Email subject start (text, section 5.5)

Paste, then insert **CourseTitle** after it.

```text
[PA TRAINING] Reminder: 
```

## Email body (text, section 5.5)

Paste, then replace each `[Name]` with the matching dynamic content token.

```text
Hello [ParticipantName],

This is your weekly training reminder.

Course: [CourseTitle]
Session date: [SessionDate]
Status: [Status]
Reminder generated: [Converted time]

Please contact the training coordinator if your plans change.
```

## Readable session date (section 5.6)

Type `/` where the SessionDate token was, choose **Insert expression**, paste, then select **Add**.

```
formatDateTime(items('Apply_to_each')?['SessionDate'], 'dd MMM yyyy')
```

> **Note:** If your loop has a different name (for example `Apply_to_each_1`), build the expression by picking **SessionDate** from the Dynamic content tab as in section 5.6 instead of pasting.
