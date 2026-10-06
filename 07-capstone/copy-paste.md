# 07 - Capstone: Copy-paste

Hover over a grey box and click the copy icon in its top-right corner. Everything in the main steps is **text**, typed or pasted straight into a field.

---

## Flow name for the copy (text, section 7.1)

```text
PA - Weekly training capstone
```

## Filter array (text, section 7.2)

Action name:

```text
Filter out completed training
```

Right value:

```text
Completed
```

## Variable (text, section 7.4)

Action name:

```text
Initialize reminder count
```

Variable name:

```text
ReminderCount
```

## Date condition name (text, section 7.6)

```text
Is the session in the next 14 days
```

## Current row's session date (section 7.6)

Click the left **Choose a value** box of each condition row and select the **fx** button beside it (or type `/` and choose **Insert expression**). Paste, then select **Add**. The box shows a pink token that may read **SessionDate** or **items(...)**: both are correct. If your loop has a different name (for example Apply_to_each_1), change the name in the expression to match.

```
items('Apply_to_each')?['SessionDate']
```

## Summary condition name (text, section 7.8)

```text
If reminders were prepared
```

## Coordinator summary (text, section 7.9)

Action name:

```text
Send coordinator summary
```

Subject:

```text
[PA TRAINING] Weekly reminder summary
```

Body: paste the first part. Select the lightning bolt (or type `/` and choose **Insert dynamic content**) and pick **ReminderCount** under *Variables*. Then paste the second part.

```text
The weekly training reminder flow prepared 
```

```text
 reminder(s) for upcoming sessions in the next 14 days.
```

## No-records Compose (text, section 7.10)

Action name:

```text
No upcoming records
```

Inputs:

```text
No upcoming training records were found for the next 14 days.
```

---

## Going further (optional)

### One filter that does it all

Replaces both Filter array and the date condition. In Filter array, choose **Edit in advanced mode** and paste. It ignores capital letters and stray spaces in Status, and compares dates from the start of today.

```
@and(
not(equals(toLower(trim(item()?['Status'])), 'completed')),
greaterOrEquals(ticks(item()?['SessionDate']), ticks(startOfDay(utcNow()))),
lessOrEquals(ticks(item()?['SessionDate']), ticks(addDays(startOfDay(utcNow()), 14)))
)
```
