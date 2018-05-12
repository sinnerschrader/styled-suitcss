# styled-uikit

Generate UIkits with [react.js](https://reactjs.org/)

Sometimes we don't have the option to use [React](https://reactjs.org/) for projects.

This library attempts to solve a specific problem:  
> **Generating UIkits via [React.js](https://reactjs.org/) with the flavor of [styled-components](https://github.com/styled-components/styled-components)**

## Info

* use [React.js](https://reactjs.org/)
* 💅 similar syntax and API as [styled-components](https://github.com/styled-components/styled-components)
* 👑 have control over the generated classNames
* 💉 drug-free classNames (no hash)
* 📝 generate HTML snippets/templates
* 📝 generate CSS components/libraries
* 📝 Server side rendering

> This library does not use [styled-components](https://github.com/styled-components/styled-components).  
> It attempts to mock certain API points but only supports some basic features (some modified)

```jsx
import styled from 'styled-uikit';
import {colors} from './designkit';

export const Card = styled.artice({
  _name: "Card"
})`
  margin: 1em;
  padding: 1em;
  border-radius: 3px;
  backgrond: #fff;
  color: #000;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
`

export const Button = styled.button({
    _name: "button"
})`
    padding: 0.5em 1em;
    margin: 0.5em;
    background: #ddd;
    color: #000;
    font-size: 1em;
    border: 1px solid #aaa;
    border-radius: 3px;
  
    &:hover {
        background-color: #ccc;
    }
    
    &:active {
        background-color: #bbb;
    }
`

export const PrimaryButton = Button.extend({
  _name: "primary"
})`
  background-color: ${colors.primary.back};
  color: ${colors.primary.front};
`;

export const CardButton = Button.extend({
  _namespace: "Card"
})`
  width: 100%;
  margin: 0.5em 0;
`;

export const PrimaryCardButton = PrimaryButton.extend({
  _namespace: "Card"
})`
  width: 100%;
  margin: 0.5em 0;
`;

```

## HTML snippets

```html
<button class="Button">Click Me!</button>
<button class="Button Button--primary">Click Me!</button>
<article class="Card">
  <button class="Button Card-Button">Cancel</button>
  <button class="Button Button--primary Card-Button--primary">Submit</button>
</article>
```
