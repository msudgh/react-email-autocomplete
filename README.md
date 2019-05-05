# React Email Autocomplete
An autocomplete React component for email fields inspired by [**`Auto-Email`**](https://github.com/chrisyuska/auto-email) JQuery plugin

## Todo
  - [✔] Improve the speed and performance 

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
If you want to use it with [Formik](https://jaredpalmer.com/formik/docs/api/formik) you just need to add the *onChange* prop

```javascript
class App extends Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor="eac-input">Email address</label> 
        <Formik>
          {(props) => {
            const {
              handleSubmit,
              handleBlur,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Email
                  onBlur={handleBlur}
                  name="email"
                  value={values.email}
                  onChange={handleChange} //The Formik custom onChange
                  />
              </form>
            );
          }}
          </Formik>
          
      </div>
    )
  }
```

# License
This software is released under the [**`MIT License`**](https://msudgh.mit-license.org/).