# Widget Integration Guide

Integrate the widget seamlessly into your website using an `iframe` tag. Follow the steps below to add the widget to your page.

## Steps to Integrate

1. **Add the `iframe` Tag**: Insert an `iframe` tag into your HTML code with the `src` attribute set to `https://DarlingInSteam.github.io/moex-widget`.

2. **Customize Your `iframe`**: You can customize the appearance of the widget by adjusting the `style` attributes of the `iframe` tag.

### Example Code

Here's an example of how to integrate the widget into your webpage:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Widget Integration Example</title>
    <style>
        body {
            background-color: gray;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        iframe {
            background-color: white;
            width: 800px;
            height: 500px;
            border: none;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
    </style>
</head>
<body>
    <iframe src="https://DarlingInSteam.github.io/moex-widget"></iframe>
</body>
</html>
```