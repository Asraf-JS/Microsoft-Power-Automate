# 03 - Save Email Attachments Automatically: Copy-paste

Hover over a grey box and click the copy icon in its top-right corner. Everything in the main steps is **text**, typed or pasted straight into a field.

---

## Flow name (text, section 3.1)

```text
PA - Save training PDF attachments
```

## Trigger subject filter (text, section 3.2)

```text
[PA TRAINING]
```

## Condition right value (text, section 3.4)

```text
.pdf
```

---

## Going further (optional)

### Unique file name with a timestamp

Paste into the expression editor (type `/` in File Name, then choose **Insert expression**).

```
concat(formatDateTime(utcNow(),'yyyyMMdd-HHmmss'), '-', item()?['name'])
```

`item()` means "the attachment the loop is on right now", the same thing the **Attachments Name** token points to.
