---
title: Enforcing Correlated Types
date: "2020-04-26"
description: ""
---

Occasionally, when creating a React component you have some subset of props that are correlated with each other. This article will explore how to accurately define the type of such a component in TypeScript so that users of the component are guided to correct usage and so that you don't need to include defensive checks within the component.

## Example

Suppose your company has a Dropdown component that has an `items` prop of type `string[]`. This component is used in many, many places across your site. However, you have recently been asked to implement a new feature which includes a fancy dropdown where each item has a bolded title, with a subtitle underneath, and an image to the left.

After thinking about this new design, you have decided that the `items` prop should actually be an array of objects and there should be another prop that takes one of those objects and renders it. At this point, there are of course several options for how you might proceed. You might fork the dropdown implementation and make a new component with the new type for `items` and the new `renderItem` prop. You might change the Dropdown component directly and convert all usages of the Dropdown component to use the new API. Or you might decide that the Dropdown component should support either usage. The right decision will depend on your situation, but let's suppose you want to support either usage.

In order to do so, you change the type of the Dropdown component's props as follows:

```ts
type Props = {

  /* ...other props... */

  items: string[] | any[]
  renderItem?: (item: any) => React.ReactNode
}
```

To elimate the `any`, you use a generic:
```ts
type Props<T> = {

  /* ...other props... */

  items: string[] | T[]
  renderItem?: (item: T) => React.ReactNode
}
```

Then, you realize you can simplify this further to:
```ts
type Props<T> = {

  /* ...other props... */

  // if you pass a string[], TypeScript will infer that
  // T = string so we can remove the union with string[]
  items: T[]
  renderItem?: (item: T) => React.ReactNode
}
```
This is a nice, clean interface, and it satisfies both use cases without producing a type error. You push this into production and move onto the next task. However, about a month later, a coworker approaches you and says they are struggling to get the Dropdown working. They are passing an array of objects for the items but have forgotten to pass the `renderItem` prop. After helping them out, you add a warning in the Dropdown component that detects when the items are objects, and warns that the `renderItem` prop should also be passed.

```ts
if (
  items.length > 0
  && typeof items[0] !== "string"
  && !renderItem
) {
  console.warn(
    "renderItem props is required when items prop is not a string[]"
  )
}
```

But the next week someone else approaches you and says they find the Dropdown component awkward to use. When you ask why, they show you that they have a very simple use case where they are passing an array of strings for the items, but also passing the `renderItem` prop, which is simply `(s) => s` since they just want to display those strings. When you point out that they don't need to pass the `renderItem` prop, they blush and mention they didn't realize this because they found some place in the codebase that was using the Dropdown component with the `renderItem` prop, and they had modelled their code after this usage.

Given that multiple people have now had an issue using the Dropdown component, you take a step back to think about whether you could define the type in such a way that this sort of confusion is elimated. Your type had seemed so simple and elegant, but as you think about it, you realize that it doesn't actually describe the use cases you had laid out in an accurate way.

The way the Dropdown component is implemented requires the `renderItem` prop when `items` is an array of anything other than strings, and it ignores the `renderItem` prop when `items` is an array of strings. (You could implement this in a different way so that you can still have a custom way of rendering items even they are an array of strings, but let's stick with this implementation for the sake of the story.)

However, the type of Dropdown doesn't convey this. The type simply states that
<br/>
&nbsp; 1. `items` is required and is of type `T[]` for some `T`
<br />
&nbsp; 2. `renderItem` is optional and is of `(item: T) => React.ReactNode`.

Thus, passing an array of objects without passing `renderItem` satisfies the type, and passing an array of strings while passing `renderItem` also satisfies the type.

A more accurate way to define the type is:
```ts
type Props<T> = {

  /* ...other props... */

} & (
  | {
      items: string[]
      renderItem?: never
    }
  | {
      items: Exclude<T, string>[]
      renderItem: (item: Exclude<T, string>) => React.ReactNode
    }
)
```
This accurately conveys that when items is of type `string[]` you should not pass `renderItem`, but when items is not an array of strings, `renderItem` is required. You will get a type error if you leave it off.

With this type definition, there is less confusion about how to use these props and you can even remove the defensive check you added previously to warn that the `renderItem` prop should be passed when `items` is not an array of strings because TypeScript will enforce this for you.

## Other examples

### Chakra UI Accordion

[Chakra UI](https://chakra-ui.com/) -- an excellent React component library -- contains an Accordion component that supports an `allowMultiple` prop. They [describe](https://chakra-ui.com/accordion#expand-multiple-items-at-once) the usage of this prop in their documentation as follows:

> If you set `allowMultiple` to true then the accordion will permit multiple items to be expanded at once.
<br/>
If you pass this prop, ensure that the index or defaultIndex prop is an array.

However the type definition for Accordion's props contains

```ts
allowMultiple?: boolean;
index?: number | number[];
defaultIndex?: number | number[];
```

Based on this description, we could write a more accurate type:

```ts
(
  | {
      allowMultiple?: false
      index?: number
      defaultIndex?: number
    }
  | {
      allowMultiple: true
      index: number[]
      defaultIndex: number[]
    }
)
```
In fact, I would guess that even further, one should not pass both `index` and `defaultIndex`. We could define this as:
```ts
(
  | ({ allowMultiple?: false } & (
      | { index: number }
      | { defaultIndex?: number }
    ))
  | ({ allowMultiple: true } & (
      | { index: number[] }
      | { defaultIndex?: number[] }
    ))
)
```

### Course Hero Expandable Rich Text Editor

A separate example which I found in the Course Hero codebase involved a rich text editor which was used in multiple places across the product. In general, it was basically used as a feature-rich textarea, but in one place, it was used within a sidebar and supported an expand/collapse functionality. The type defintion for the component's props included:

```ts
type Props = {

  /* ...other props... */

  // If isExpanded is passed, you should also pass toggleExpand
  isExpanded?: boolean
  toggleExpand?: () => void
}
```

While the comment is helpful, we can do better by actually enforcing this requirement through the type definition in a similar way as the previous examples.

```ts
type Props = {

  /* ...other props... */

} & (
  | {}
  | {
      isExpanded: boolean
      toggleExpand: () => void
    }
)
```

One minor point that arises with the above type definition is that it can be slightly annoying to access the `isExpanded` prop or `toggleExpanded` prop. Before accessing it, you must convince TypeScript that you are in the case where that prop exists.

```ts
function RichTextEditor(props: Props) {
  // Type error: Property 'toggleExpand' does not exist on type 'Props'.
  const x = props.toggleExpand

  // Using destructuring doesn't change anything. Still the same error
  const { toggleExpand } = props

  // Can't even check this way. Still the same error
  if (props.toggleExpand) {
    const x = props.toggleExpand
  }

  // This works, but mildly annoying
  if ('toggleExpand' in props) {
    // No type error
    const x = props.toggleExpand
  }
}
```

One way to get around this while not affecting how the component can be used is to make these props optional and of type `never` instead of leaving them off:
```ts
type Props = {

  /* ...other props... */

} & (
  | {
      isExpanded?: never
      toggleExpand?: never
    }
  | {
      isExpanded: boolean
      toggleExpand: () => void
    }
)
```

## Final thoughts

In the Dropdown example above, the usage of `items` and `renderItem` was probably fairly clear even with the inferior type definition. The examples of coworkers being baffled about how to use the component may have seemed a bit unrealistic since it wouldn't take much effort to figure out how those two props should be used. However, this was a simple example to illustrate the more general pattern which can be applied in cases where there is some relationship between two (or more) props that may not be so obvious.

I would also mention that although this article framed this problem in terms of correlated React component props, it applies generally to function arguments, struct definitions, etc. Anytime you have multiple arguments/properties/fields that have some relationship to each other, you should think about how to accurately define their type such that their relationship is part of the type definition.
