# 07 - Capstone: Copy-paste

Hover over a grey box and click the copy icon in its top-right corner. Paste expressions into the **Expression** tab of the dynamic content panel (type `/` in a field, then choose **Insert expression**).

Anything marked **text** is typed or pasted straight into a field, not the expression editor.

---

## Flow name for the copy (text, section 7.1)

```text
PA - Weekly training capstone
```

## Filter array action name (text, section 7.3)

```text
Filter upcoming incomplete training
```

## Filter array condition, advanced mode (section 7.3)

```
@and(
not(equals(toLower(trim(item()?['Status'])), 'completed')),
greaterOrEquals(ticks(item()?['SessionDate']), ticks(startOfDay(utcNow()))),
lessOrEquals(ticks(item()?['SessionDate']), ticks(addDays(startOfDay(utcNow()), 14)))
)
```

## Initialize variable action name (text, section 7.4)

```text
Initialize reminder count
```

## Variable name (text, section 7.4)

```text
ReminderCount
```

## Apply to each input (section 7.5)

```
body('Filter_upcoming_incomplete_training')
```

## Condition name (text, section 7.8)

```text
If reminders were prepared
```

## Coordinator summary action name (text, section 7.9)

```text
Send coordinator summary
```

## Coordinator summary subject (text, section 7.9)

```text
[PA TRAINING] Weekly reminder summary
```

## Coordinator summary body (text, section 7.9)

Paste the first part, insert **ReminderCount** from dynamic content, then paste the second part.

```text
The weekly training reminder flow prepared 
```

```text
 reminder(s) for upcoming incomplete sessions in the next 14 days.
```

## No-records Compose name (text, section 7.10)

```text
No upcoming records
```

## No-records Compose input (text, section 7.10)

```text
No upcoming incomplete training records were found for the next 14 days.
```
