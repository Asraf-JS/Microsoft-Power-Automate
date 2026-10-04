# 05 - Send Weekly Training Reminders: Copy-paste

Hover over a grey box and click the copy icon in its top-right corner. Paste expressions into the **Expression** tab of the dynamic content panel (type `/` in a field, then choose **Insert expression**).

Anything marked **text** is typed or pasted straight into a field, not the expression editor.

---

## Flow name (text, section 5.2)

```text
PA - Weekly training reminders
```

## Apply to each input (section 5.5)

```
outputs('List_rows_present_in_a_table')?['body/value']
```

## Email To (section 5.6)

```
item()?['Email']
```

## Email Subject (section 5.6)

```
concat('[PA TRAINING] Reminder: ', item()?['CourseTitle'])
```

## Email Body (section 5.6)

```
concat('<p>Hello ', item()?['ParticipantName'], ',</p><p>This is your weekly training reminder.</p><p><strong>Course:</strong> ', item()?['CourseTitle'], '<br><strong>Session date:</strong> ', item()?['SessionDate'], '<br><strong>Status:</strong> ', item()?['Status'], '<br><strong>Reminder generated:</strong> ', body('Convert_time_zone'), '</p><p>Please contact the training coordinator if your plans change.</p>')
```
