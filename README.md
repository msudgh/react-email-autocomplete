# React Email Autocomplete
An autocomplete React component for email fields inspired by [**`Auto-Email`**](https://github.com/chrisyuska/auto-email) JQuery plugin

## Todo
  - [ ] Improve the speed and performance 

# Usage
To use this component, you should install it by npm:
```bash
$ npm install react-email-autocomplete --save-dev
```

And then use the component like bellow example(Bootstrap control):
```javascript
import React, { Component } from 'react';
import Email from 'react-email-autocomplete';

class App extends Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor="eac-input">Email address</label> 
        <Email className="form-control" placeholder="Enter email"/>
      </div>
    )
  }
}

export default App;
```

Also you can pass a list as your custom domains:
```javascript
class App extends Component {
  render() {
    const customDomains = ['yourdomain.com', 'yourdomain2.com', 'gmail.com', 'yahoo.com']
    return (
      <div className="form-group">
        <label htmlFor="eac-input">Email address</label> 
        <Email className="form-control" placeholder="Enter email" domains={customDomains}/>
      </div>
    )
  }
}
```


The method accepts two parameters, `domains` and `multi-enabled`.

* `domains` is an array of domains to autocomplete with, autocompleting on the first match in the array.  Typing `joe@f` in the above example will first autocomplete to `joe@foo.org`.  After the user types `joe@foob`, the field will autocomplete to `joe@foobar.com`.
* `multi-enabled` is a boolean flag that enables the user to enter multiple emails in the field, separated by a `,` or `;`

# License
This software is released under the [**`MIT License`**](https://msudgh.mit-license.org/).