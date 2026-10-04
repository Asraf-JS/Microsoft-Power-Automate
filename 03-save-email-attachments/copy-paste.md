# 03 - Save Email Attachments Automatically: Copy-paste

Hover over a grey box and click the copy icon in its top-right corner. Paste expressions into the **Expression** tab of the dynamic content panel (type `/` in a field, then choose **Insert expression**).

Anything marked **text** is typed or pasted straight into a field, not the expression editor.

---

## Flow name (text, section 3.1)

```text
PA - Save training PDF attachments
```

## Trigger subject filter (text, section 3.2)

```text
[PA TRAINING]
```

## Condition left value: current attachment name (section 3.4)

```
item()?['name']
```

## Condition right value (text, section 3.4)

```text
.pdf
```

## Create file content (section 3.5)

```
item()?['contentBytes']
```

## Unique file name with a timestamp (section 3.8)

```
concat(formatDateTime(utcNow(),'yyyyMMdd-HHmmss'), '-', item()?['name'])
```

## Optional image-only test subject (text, section 3.7)

```text
[PA TRAINING] Image-only test
```
