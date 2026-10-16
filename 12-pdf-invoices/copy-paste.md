# 12 - Read PDF Invoices into Excel: Copy-paste

Hover over a grey box and click the copy icon in its top-right corner. Values between percent signs, like `%Files%`, are Power Automate for desktop variables: paste them exactly as shown.

---

## Flow name (section 12.1)

```text
PA - Invoice log
```

## File filter (section 12.2)

```text
*.pdf
```

## For each, Value to iterate (section 12.4)

```text
%Files%
```

## Extract text from PDF, PDF file (section 12.5)

```text
%CurrentItem%
```

## Parse text (section 12.6)

Text to parse, in all three:

```text
%ExtractedPDFText%
```

Invoice number pattern, then rename Match to `InvoiceNo`:

```text
(?<=Invoice No:\s*)\S+
```

```text
InvoiceNo
```

Invoice date pattern, then rename Match to `InvoiceDate`:

```text
(?<=Invoice Date:\s*)\d{2} \w{3} \d{4}
```

```text
InvoiceDate
```

Total pattern, then rename Match to `InvoiceTotal`:

```text
(?<=Total Due:\s*RM\s*)[\d,.]+
```

```text
InvoiceTotal
```

## Write to Excel worksheet (section 12.8)

Row, in all four:

```text
%FirstFreeRow%
```

Values to write, for columns 1 to 4:

```text
%CurrentItem.Name%
```

```text
%InvoiceNo%
```

```text
%InvoiceDate%
```

```text
%InvoiceTotal%
```
