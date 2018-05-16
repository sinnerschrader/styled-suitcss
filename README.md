# styled-suitcss

```shell
npm install styled-suitcss
## yarn add styled-suitcss 
```

This library attempts to solve a specific problem:  
> **Create UIkits via [React.js](https://reactjs.org/) with the flavor of [styled-components](https://github.com/styled-components/styled-components) and  [suitcss naming](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)**

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

## CLI tool

```shell
  extract-styled-suitcss "lib/patterns/**/*.js"
```

## Examples

### JSX input

```jsx
import styled, {keyframes} from 'styled-suitcss';
import {colors} from './designkit';

export const Card = styled.article({
  _name: "Card"
})`
  margin: 1em;
  padding: 1em;
  border-radius: 3px;
  background: #fff;
  color: #000;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
`

const blink = keyframes({
  _namespace: "Animation",
  _name: "Blink"
})`
  from {
        opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Button = styled.button({
    _name: "Button"
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
    
    &.is-selected {
        box-shadow: 0 0 0 4px ${colors.selection};
    }
    
    &.is-blinking {
        animation: ${blink} 0.5s steps(2, end) infinite alternate;
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


### HTML snippets

> one file per snippet

```html
<button class="Button is-selected"></button>
<button class="Button Button--primary is-blinking"></button>
<article class="Card"></article>
<button class="Button Button--primary Card-Button--primary"></button>
<button class="Button Card-Button"></button>
```


### CSS library

```css
.Button {
    padding: 0.5em 1em;
    margin: 0.5em;
    background: #ddd;
    color: #000;
    font-size: 1em;
    border: 1px solid #aaa;
    border-radius: 3px;
}

.Button:hover {
    background-color: #ccc;
}

.Button:active {
    background-color: #bbb;
}

.Button.is-selected {
    box-shadow: 0 0 0 4px pink;
}

.Button.is-blinking {
    -webkit-animation: Animation-Blink 0.5s steps(2, end) infinite alternate;
    animation: Animation-Blink 0.5s steps(2, end) infinite alternate;
}

.Card {
    margin: 1em;
    padding: 1em;
    border-radius: 3px;
    background: #fff;
    color: #000;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
}

.Button--primary {
    background-color: red;
    color: white;
}

.Card-Button {
    width: 100%;
    margin: 0.5em 0;
}

.Card-Button--primary {
    width: 100%;
    margin: 0.5em 0;
}

@-webkit-keyframes Animation-Blink {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

@keyframes Animation-Blink {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

```