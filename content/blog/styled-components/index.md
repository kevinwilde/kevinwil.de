---
title: Styled Components
date: "2019-05-26"
---

At Course Hero, we aren't yet using a CSS-in-JS library. Instead, we have a css framework that is largely based on Bootstrap 4. While CSS-in-JS libraries provide [many benefits](https://www.styled-components.com/docs/basics#motivation) over external stylesheets, and we may eventually use CSS-in-JS, for now our css framework is serving us well.

One benefit our css framework gives us is more consistent styling, in a way that might be more difficult to enforce if we used CSS-in-JS. For example, when we need some margin around an element, the intent is that the developer should only ever use one of the margin classes from our css framework, rather than writing an arbitrary margin rule.