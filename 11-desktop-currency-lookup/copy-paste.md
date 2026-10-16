# 11 - Look Up Currency Rates with a Desktop Flow: Copy-paste

Hover over a grey box and click the copy icon in its top-right corner. Values between percent signs, like `%LoopIndex%`, are Power Automate for desktop variables: paste them exactly as shown.

---

## Flow name (section 11.1)

```text
PA - Currency lookup
```

## Initial URL (section 11.2)

```text
https://www.google.com/
```

## Table name (section 11.4)

```text
Table1
```

## Loop End to (section 11.5)

```text
%LastRowIndex%
```

## Start row in both Read actions, and Row in Write (sections 11.6 and 11.11)

```text
%LoopIndex%
```

## Variable names (section 11.6)

Column 1 (From):

```text
sc
```

Column 2 (To):

```text
ToBeC
```

## Search text (section 11.7)

```text
%sc% to %ToBeC%
```

## Keys to send (section 11.8)

```text
{Enter}
```

## Value to write (section 11.11)

```text
%AttributeValue%
```
