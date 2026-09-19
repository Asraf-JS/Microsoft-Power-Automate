# Copy-paste expressions

Hover over a grey box and click the copy icon in its top-right corner. Paste expressions into the **Expression** tab of the dynamic content panel (type `/` in a field, then choose **Insert expression**).

Anything marked **text** is typed or pasted straight into a field, not the expression editor.

[← Back to course home](../README.md)

---

## Chapter 2: Prepare your training workspace

### Excel column headers (section 2.2)

Click cell A1 in Sheet1, then paste. Each header lands in its own column.

```text
TrainingID	ParticipantName	Email	CourseTitle	SessionDate	Status
```

### Table name (text)

```text
tblTraining
```

### Test email subject (text, section 2.3)

```text
[PA TRAINING] Attachment test
```

---

## Chapter 3: Save email attachments automatically

### Flow name (text)

```text
PA - Save training PDF attachments
```

### Trigger subject filter (text, section 3.2)

```text
[PA TRAINING]
```

### Condition left value: current attachment name (section 3.4)

```
item()?['name']
```

### Create file content (section 3.5)

```
item()?['contentBytes']
```

### Unique file name with a timestamp (section 3.8)

```
concat(formatDateTime(utcNow(),'yyyyMMdd-HHmmss'), '-', item()?['name'])
```

---

## Chapter 4: Create and distribute an Excel summary

### Flow name (text)

```text
PA - Training register summary
```

### Select mapping values (section 4.4)

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

### Email subject (text, section 4.6)

```text
[PA TRAINING] Training register summary
```

### Optional row count (section 4.8)

Works only if the Select action still has its default name.

```
length(body('Select'))
```

### Optional date format (section 4.8)

Use this in Select instead of the plain Session date value, only after checking the run output.

```
formatDateTime(item()?['SessionDate'],'dd MMM yyyy')
```

---

## Chapter 5: Send weekly training reminders

### Flow name (text)

```text
PA - Weekly training reminders
```

### Apply to each input (section 5.5)

```
outputs('List_rows_present_in_a_table')?['body/value']
```

### Email To (section 5.6)

```
item()?['Email']
```

### Email Subject (section 5.6)

```
concat('[PA TRAINING] Reminder: ', item()?['CourseTitle'])
```

### Email Body (section 5.6)

```
concat('<p>Hello ', item()?['ParticipantName'], ',</p><p>This is your weekly training reminder.</p><p><strong>Course:</strong> ', item()?['CourseTitle'], '<br><strong>Session date:</strong> ', item()?['SessionDate'], '<br><strong>Status:</strong> ', item()?['Status'], '<br><strong>Reminder generated:</strong> ', body('Convert_time_zone'), '</p><p>Please contact the training coordinator if your plans change.</p>')
```

---

## Chapter 6: Process a training approval

### Flow name (text)

```text
PA - Training request approval
```

### Form description (text, section 6.1)

```text
Submit a fictional training request for the Power Automate approval exercise.
```

### Course choices (text, section 6.1)

```text
Power Automate Basics
Approval Workflows
Excel Reporting
```

### Approval title (text, section 6.5)

```text
[PA TRAINING] Training request
```

### Condition right value (text, section 6.6)

```text
Approve
```

### Teams messages (text, sections 6.7 and 6.8)

Type the text, then insert **Course** from Get response details after it.

```text
Training request approved for 
```

```text
Training request rejected for 
```

---

## Chapter 7: Capstone

### Flow name for the copy (text, section 7.1)

```text
PA - Weekly training capstone
```

### Filter array action name (text, section 7.3)

```text
Filter upcoming incomplete training
```

### Filter array condition, advanced mode (section 7.3)

```
@and(
not(equals(toLower(trim(item()?['Status'])), 'completed')),
greaterOrEquals(ticks(item()?['SessionDate']), ticks(startOfDay(utcNow()))),
lessOrEquals(ticks(item()?['SessionDate']), ticks(addDays(startOfDay(utcNow()), 14)))
)
```

### Variable name (text, section 7.4)

```text
ReminderCount
```

### Apply to each input (section 7.5)

```
body('Filter_upcoming_incomplete_training')
```

### Coordinator summary subject (text, section 7.9)

```text
[PA TRAINING] Weekly reminder summary
```

### Coordinator summary body (text, section 7.9)

Paste the first part, insert **ReminderCount** from dynamic content, then paste the second part.

```text
The weekly training reminder flow prepared 
```

```text
 reminder(s) for upcoming incomplete sessions in the next 14 days.
```

### No-records Compose input (text, section 7.10)

```text
No upcoming incomplete training records were found for the next 14 days.
```

---

## Chapter 9: Move automations with solutions

### Solution names (text, section 9.2)

Display name:

```text
Power Automate Training Migration
```

Name:

```text
PowerAutomateTrainingMigration
```

[← Back to course home](../README.md)
