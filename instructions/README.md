# AppSync Workshop
AWS Workshop migrating an application with RESTful API's to use GraphQL API's with AWS Appsync and Amplify

## Viewing the Workshop
This workshop is deployed at #TODO-- if you would like to run through the workshop, please visit this URL.

If you'd like to make edits to the workshop to suggest a change, see the build instructions below.

## Building the workshop static site with Hugo

#### Install Hugo:
On a mac:

`brew install hugo`

On Linux:
  - Download from the releases page: https://github.com/gohugoio/hugo/releases/tag/v0.37
  - Extract and save the executable to `/usr/local/bin`

#### Clone this repo:
From wherever you checkout repos:
`git clone https://github.com/lucasschejtman/resttogql-workshop.git`

#### Clone the theme submodule:

```sh
git submodule init
git submodule update --checkout --recursive
```

#### Install node packages:

`npm install`

#### Run Hugo locally:

`npm run server`
or
`npm run test` to see stubbed in draft pages.

#### View Hugo locally:
Visit http://localhost:1313/ to see the site.

#### Making Edits:
As you save edits to a page, the site will live-reload to show your changes.

note: shift-reload may be necessary in your browser to reflect the latest changes.

## License Summary

This sample code is made available under a modified MIT license. See the LICENSE file.

