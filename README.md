# styled-suitcss

```shell
npm install styled-suitcss
## yarn add styled-suitcss
```

## Info

### What is the purpose of this library?

The sole purpose of this library is to generate html & css libraries or snippets of code.  
Modern technologies and concepts have enabled us to have a pretty good control over dependencies
and scopes. When these advantages can't be used due to the production environment we face the
same issue that led us to creating these concepts.

### React.js

React helped us get rid of HTML templates and allowed us to define a virtual DOM that could be extended
with JavaScript.

If we remove the entire logic besides the rendering we can still use this main advantage to generate HTML.

> This library is not intended to be used with Reacts mechanism.  
> It attempts to use React to generate HTML and allow setting dynamic states

### Styled components (and others)

The idea of CSS in JS has worn many faces, none of which ever convinced us. Whe the idea of using
JavaScript template helpers, things changed. Before it had not been possible to have such a reliable
dependency management and styling scope without injecting inline styles.

Let's again take away most of the logic here and focus on the basic idea: "define/extend styles on a component level"
and use this feature to generate plain CSS.

> This library does not use [styled-components](https://github.com/styled-components/styled-components).  
> It attempts to mock certain API points but only supports some basic features (some modified)

### Suitcss (naming conventions)

Over time we have seen numerous naming conventions to ensure human readable scoped selectors.  
Suitcss has done a very nice job of adapting this idea so we decided to use its naming conventions.

> This library does not use [suitcss](https://github.com/suitcss).  
> It attempts to follow their [naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)

### Can I use this in production?

We do not advise the use for production purpose.

## CLI tool

```bash
  extract-styled-suitcss "lib/patterns/**/*.js"
```

### Output folder

```bash
  extract-styled-suitcss "lib/patterns/**/*.js" --outDir path/to/dist
  ## extract-styled-suitcss "lib/patterns/**/*.js" -o path/to/dist
```

## Examples

> Look at the [examples](https://github.com/sinnerschrader/styled-ui/tree/master/examples)
> or [tests](https://github.com/sinnerschrader/styled-ui/tree/master/test) for more detail.

### JS input

```jsx
import styled from "styled-suitcss";

export const Button = styled.button({
	_namespace: "my",
	_name: "Button"
})`
    padding: 0.5em 1em;
    background: #ddd;
    color: #000;
    font-size: 1em;
    border: 1px solid #aaa;
    border-radius: 3px;
  
    &:hover {
        background-color: #ccc;
    }
`;
```

### HTML output

> one file per snippet

```html
<button class="my-Button">{{children}}</button>
```

### CSS output

```css
.my-Button {
	padding: 0.5em 1em;
	background: #ddd;
	color: #000;
	font-size: 1em;
	border: 1px solid #aaa;
	border-radius: 3px;
}

.my-Button:hover {
	background-color: #ccc;
}
```
