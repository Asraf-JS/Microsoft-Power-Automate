# 04 - Create and Distribute an Excel Summary: Copy-paste

Hover over a grey box and click the copy icon in its top-right corner. Anything marked **text** is typed or pasted straight into a field.

---

## Flow name (text, section 4.2)

```text
PA - Training register summary
```

## Select keys (text, section 4.4)

Type each key, then insert the matching column from dynamic content as its value.

```text
Participant
```

```text
Course
```

```text
Session date
```

```text
Status
```

## Email subject (text, section 4.6)

```text
[PA TRAINING] Training register summary
```

## Email introduction (text, section 4.6)

```text
Here is the current training register.
```

## Your first expression: count the rows (section 4.7)

Type `/` in the Body, choose **Insert expression**, paste, then select **Add**. Works if the Select action still has its default name.

```
length(body('Select'))
```
