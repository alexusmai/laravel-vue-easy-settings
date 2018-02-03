# Easy Settings

> Vue application for using together with the Laravel 5 package - [alexusmai/easy-settings](https://github.com/alexusmai/easy-settings)

![Easy Settings Vue App](https://raw.github.com/alexusmai/laravel-vue-easy-settings/master/src/assets/esettings.gif?raw=true)

## Installation

### NPM
```bash
$ npm install laravel-vue-easy-settings --save
```

## Usage

**IF** your App using Vuex store

```javascript
import EasySettings from 'laravel-vue-easy-settings'
import store from './path-to-your-store/store'   // your Vuex store

Vue.use(EasySettings, {store})
```

**ELSE** you need create new vuex instance

```javascript
import Vuex from 'vuex';
import EasySettings from 'laravel-vue-easy-settings'

// create Vuex store, if you don't have it
const store = new Vuex.Store();

Vue.use(EasySettings, {store})
```

`The application store module will be registered under the name 'esettings'`

Now vue component is registered and you can use it in your app
```html
<easy-settings-app></easy-settings-app>
```

Don't forget add a csrf token to head block in your Laravel view
```html
<!-- CSRF Token -->
<meta name="csrf-token" content="{{ csrf_token() }}">
```

Warning! Package use axios (Promise) - use babel-polyfill for ie11

The application uses the bootstrap 4 styles - (/src/assets/styles.css)
If your application already uses these styles, then you do not need to do anything extra.