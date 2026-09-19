# Copilot prompts (Chapter 8)

Hover over a grey box and click the copy icon in its top-right corner, then paste into Copilot.

These prompts use fictional details only. Never put confidential information, personal data, passwords or real recipients into a training prompt.

[← Back to course home](../README.md)

---

## 1. Describe the complete business outcome (section 8.2)

Paste into **What will your flow do?** and select **Submit**.

```text
Every Friday at 4:00 PM Singapore time, read rows from the tblTraining table in TrainingRegister.xlsx in OneDrive for Business. Keep rows whose Status is Registered and SessionDate is within the next 14 days. Email the training coordinator a summary count. Do not send participant emails.
```

## 2. Clarify the filter and count (section 8.4)

Paste into **Add more details to improve the flow** and select **Send**.

```text
Use Filter array to keep rows where Status is Registered and SessionDate is between today and 14 days from today. Calculate the count with length(body('FilteredRows')). Send one summary email only to coordinator@example.com. Do not add an Apply to each or any participant email.
```

## 3. Request a streamlined design (section 8.6)

```text
Remove Get file metadata using path because List rows present in a table can select the workbook directly. Keep only Recurrence, List rows present in a table, Filter array named FilteredRows, Compose named Count using length(body('FilteredRows')), and one Send an email action to coordinator@example.com.
```

Remember: select **Cancel** at the end (section 8.8). This exercise is planning only.

[← Back to course home](../README.md)
