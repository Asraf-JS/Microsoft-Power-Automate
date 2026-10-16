# 12 - Look Up Currency Rates with a Desktop Flow: Copy-paste

Hover over a grey box and click the copy icon in its top-right corner. Values between percent signs, like `%LoopIndex%`, are Power Automate for desktop variables: paste them exactly as shown.

---

## Flow name (section 12.1)

```text
PA - Currency lookup
```

## Initial URL (section 12.2)

```text
https://www.google.com/
```

## Table name (section 12.4)

```text
Table1
```

## Loop End to (section 12.5)

```text
%LastRowIndex%
```

## Start row in both Read actions, and Row in Write (sections 12.6 and 12.11)

```text
%LoopIndex%
```

## Variable names (section 12.6)

Column 1 (From):

```text
sc
```

Column 2 (To):

```text
ToBeC
```

## Search text (section 12.7)

```text
%sc% to %ToBeC%
```

## Keys to send (section 12.8)

```text
{Enter}
```

## Value to write (section 12.11)

```text
%AttributeValue%
```
