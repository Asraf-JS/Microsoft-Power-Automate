# 04 - Create and Distribute an Excel Summary: Copy-paste

Hover over a grey box and click the copy icon in its top-right corner. Paste expressions into the **Expression** tab of the dynamic content panel (type `/` in a field, then choose **Insert expression**).

Anything marked **text** is typed or pasted straight into a field, not the expression editor.

---

## Flow name (text, section 4.2)

```text
PA - Training register summary
```

## Select mapping values (section 4.4)

Participant:

```
item()?['ParticipantName']
```

Course:

```
item()?['CourseTitle']
```

Session date:

```
item()?['SessionDate']
```

Status:

```
item()?['Status']
```

## Email subject (text, section 4.6)

```text
[PA TRAINING] Training register summary
```

## Optional row count (section 4.8)

Works only if the Select action still has its default name.

```
length(body('Select'))
```

## Optional date format (section 4.8)

Use this in Select instead of the plain Session date value, only after checking the run output.

```
formatDateTime(item()?['SessionDate'],'dd MMM yyyy')
```
