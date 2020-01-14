---
title: ClassNamed Components
date: "2019-06-08"
description: ""
---

At Course Hero, we aren't currently using a CSS-in-JS library. Instead, we have a css framework that is largely based on Bootstrap 4. While CSS-in-JS libraries provide [many benefits](https://www.styled-components.com/docs/basics#motivation) over external stylesheets, and we may eventually use CSS-in-JS, for now our css framework is serving us well.

One benefit our css framework gives us is more consistent styling, in a way that might be more difficult to enforce if we used CSS-in-JS. For example, when we need some margin around an element, the intent is that the developer should only ever use one of the margin classes from our css framework, rather than writing an arbitrary margin rule. This has greatly improved the design consistency on our pages. Previously, it was not uncommon to see some element that has a margin of 47px or some other seemingly random number.

Although there are clear differences between using our css framework and using CSS-in-JS, I actually find the authoring experience quite similar. Since our css framework has utility classes for all the common css rules, using those classes inside a component has a similar feel to writing your styles directly in the component as you might do with CSS-in-JS. For example, with [Emotion](https://emotion.sh/docs/introduction) you might write

```jsx
<div
  css={{
    margin: '1.5rem',
    padding: '1rem',
    border: '1px solid #dee2e6',
  }}
>
  blah blah blah
</div>
```

and with Bootstrap 4, you would write
```jsx
<div className="m-4 p-3 border">
  blah blah blah
</div>
```

Once you get the hang of all the utility classes, the development experience starts to feel pretty nice. You can adjust the styling of your component without having to switch to another file.

As your design gets a little more complex, though, your className becomes a little longer. Pretty soon you're writing lines like this.
```jsx
<div className="d-none d-md-block p-0 rounded border border-warning position-fixed mb-3">
  blah blah blah
</div>
```
Then maybe you come back to that component a couple weeks later and someone else has added to it. The render method has gotten long. Once you have some nested elements, all with long classNames, your react component starts looking pretty sloppy.

Of course, breaking down the component into smaller pieces helps significantly, but maybe we can also take some inspiration from [styled-components](https://www.styled-components.com/). With styled-components, you write something like this.
```jsx
const Wrapper = styled.div`
  padding: 0;
  border-radius: 0.25rem;
  border: 1px solid yellow;
  position: fixed;
  margin-bottom: 1rem;
`

// Then use it in your render method like
<Wrapper>
  blah blah blah
</Wrapper>
```

This keeps your render method very clean, and the styles are still colocated with the component. Can we do something similar when we're using a css framework? Of course!
```jsx
const Wrapper = ({ children }) => (
  <div className="d-none d-md-block p-0 rounded border border-warning position-fixed mb-3">
    {children}
  </div>
)

// Then use it in your render method like
<Wrapper>
  blah blah blah
</Wrapper>
```

Doing this can greatly improve the readability of your render method.

However, the API for styled-components is a little nicer because you don't have to manually say that you want to render `props.children` every time you make a styled component. So let's create a function that allows us to write
```jsx
const Wrapper =
  classNamedComponent('div', "d-none d-md-block p-0 rounded border border-warning position-fixed mb-3")
```

Implementing `classNamedComponent` is fairly straightforward.
```jsx
const classNamedComponent = (Element, className) => ({ children }) => (
  <Element className={className}>{children}</Element>
)
```

But now, we have lost the ability to change the className based on props. In our previous, more verbose implementation, it was easy. For example, we can change the border color based on an error prop.
```jsx
const Wrapper = ({ children, error }) => (
  <div className={`d-none d-md-block p-0 rounded border ${
      error ? 'border-warning' : 'border-succes'
    } position-fixed mb-3`}>
    {children}
  </div>
)
```

But how would we do this with our `classNamedComponent` version? Again, we can take inspiration from styled-components. The library uses tagged template literals to enable you to pass functions to your styled component, and that's what we'll need to do to. Max Stoiber, the creator of styled-components, wrote a [blog post](https://mxstbr.blog/2016/11/styled-components-magic-explained/) explaining how it works in depth. I also found [this article](https://medium.com/styled-components/how-styled-components-works-618a69970421) that gives a simplified implementation of styled-components. Using that article as a starting point, I modified the `classNamedComponent` function so that it can be used like
```jsx
const Wrapper = classNamedComponent('div')`
  d-none
  d-md-block
  p-0
  rounded
  border
  ${({ error }) => error ? 'border-warning' : 'border-success'}
  position-fixed
  mb-3
`
```

Here's the implementation
```jsx
const classNamedComponent = (Element) => (strs, ...exprs) => (props) => {
  const result = [props.className, strs[0]]
  for (let index = 0; index < exprs.length; index++) {
    const expr = exprs[index]
    const value = typeof expr === 'function' ? expr(props) : expr
    result.push(value, strs[index+1])
  }

  return (
    <Element
      {...props}
      className={
        result
          .filter(Boolean)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim()
      }
    />
  )
}
```

Note that for simplicity, I'm passing all the props through to the element. In reality, you'd want to use [@emotion/is-prop-valid](https://www.npmjs.com/package/@emotion/is-prop-valid) (or something similar) the way that [styled-components does](https://github.com/styled-components/styled-components/blob/7002c1e4a52a84be42f607ca7cc3bdbea22f2a24/packages/styled-components/src/models/StyledComponent.js#L144).

Overall, this was a fun exercise in thinking about developer experience when writing and styling react components, and it also gave me the chance to get a deeper understanding of how the styled-components library works.
