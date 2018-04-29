Zephyr
====================

## Overview

- Loads custom post types through React.
- These post types can be filtered, through any query combination that could be achieved through WP_Query.
- Fetched posts will be inserted into the DOM.
- Any markup presented in the plugin will be overwriteable.
- Any actions and filters added by the plugin will be removable.

## Admin Panel

- a Zephyr (TBD) object can be created, with configuration settings.
- Filters can be configured, similar to a WP_Query.
- Post types to be included can be configured.
- When the filter gets submitted (on change, or on submit click.)

## Getting Started

1. Make sure that you have [Node.js](https://nodejs.org/en/) installed.
2. Navigate to the plugin directory, install `npm` dependencies, and run the dev build command:

```
cd /path/to/wordpress/wp-content/plugins/wp-react-boilerplate
npm install
npm run dev
```

## Commands

`npm install` - Install dependencies

`npm run build` – Generate production versions of static assets.

`npm run dev` - Start webpack in "watch" mode so that the assets are automatically compiled when a file changes.

## Documentation

* [Writing Code](./docs/writing-code.md)


