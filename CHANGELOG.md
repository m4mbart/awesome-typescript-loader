<a name"0.19.0"></a>
## 0.19.0 (2016-02-29)


<a name"0.18.0"></a>
## 0.18.0 (2016-02-29)


<a name"0.18.0"></a>
## 0.18.0 (2016-02-29)

-Fixed Typescript 1.8

<a name"0.17.0"></a>
## 0.17.0 (2016-02-29)


<a name"0.16.0"></a>
## 0.16.0 (2016-02-29)


<a name"0.15.0"></a>
## 0.15.0 (2016-02-29)


<a name"0.14.1"></a>
### 0.14.1 (2015-10-31)


#### Bug Fixes

* ***:**
  * correctly process jsx option ([f7ae91c4](https://github.com/s-panferov/awesome-typescript-loader/commit/f7ae91c4))
  * fix unrecoverable error during watch ([6f7ad270](https://github.com/s-panferov/awesome-typescript-loader/commit/6f7ad270))
  * watch tsx files too ([cc494a3b](https://github.com/s-panferov/awesome-typescript-loader/commit/cc494a3b))
* **index:**
  * correct work with a promise chain ([c20d684c](https://github.com/s-panferov/awesome-typescript-loader/commit/c20d684c))
  * use try-catch instead of if when resolving lib files ([946fc850](https://github.com/s-panferov/awesome-typescript-loader/commit/946fc850))
  * don't call the callback twice ([3abf8e48](https://github.com/s-panferov/awesome-typescript-loader/commit/3abf8e48))


#### Features

* ***:**
  * bump dev typescript ([b29a73d7](https://github.com/s-panferov/awesome-typescript-loader/commit/b29a73d7))
  * bump typescript ([b2115448](https://github.com/s-panferov/awesome-typescript-loader/commit/b2115448))
  * remove outdated examples; we need tests instead ([26ef32ea](https://github.com/s-panferov/awesome-typescript-loader/commit/26ef32ea))
  * update module resolution logic according to https://github.com/Microsoft/TypeScr ([59ff7f77](https://github.com/s-panferov/awesome-typescript-loader/commit/59ff7f77))
  * checker in sep. process now runs only with ForkCheckerPlugin ([85e9e1bc](https://github.com/s-panferov/awesome-typescript-loader/commit/85e9e1bc))
  * pass resolution info into the checker ([266ec78e](https://github.com/s-panferov/awesome-typescript-loader/commit/266ec78e))
  * implement node-style module resolution ([77a67df8](https://github.com/s-panferov/awesome-typescript-loader/commit/77a67df8))
  * read `.d.ts` files from `tsconfig.json` ([d4025d30](https://github.com/s-panferov/awesome-typescript-loader/commit/d4025d30))
  * implement file cache ([358441a8](https://github.com/s-panferov/awesome-typescript-loader/commit/358441a8))
  * ignore null source maps ([42433c9b](https://github.com/s-panferov/awesome-typescript-loader/commit/42433c9b))
  * learn loader to pick-up precompiled files if any ([71935896](https://github.com/s-panferov/awesome-typescript-loader/commit/71935896))
  * support the new libs path ([c224f05d](https://github.com/s-panferov/awesome-typescript-loader/commit/c224f05d))
  * externals is an array now ([69cadb52](https://github.com/s-panferov/awesome-typescript-loader/commit/69cadb52))
  * rewriteImports is an array now ([8f7f4555](https://github.com/s-panferov/awesome-typescript-loader/commit/8f7f4555))
  * use a compiler from a client app ([cae4d00f](https://github.com/s-panferov/awesome-typescript-loader/commit/cae4d00f))
  * add alias example ([ca86fd71](https://github.com/s-panferov/awesome-typescript-loader/commit/ca86fd71))
  * now we can start ckecker in a separate process ([2cdb8f4b](https://github.com/s-panferov/awesome-typescript-loader/commit/2cdb8f4b))
  * impl JSX support ([849e506b](https://github.com/s-panferov/awesome-typescript-loader/commit/849e506b))
* **cache:** use sha512 ([48692dd2](https://github.com/s-panferov/awesome-typescript-loader/commit/48692dd2))
* **checker:** fix compiler reference ([8dcad5d2](https://github.com/s-panferov/awesome-typescript-loader/commit/8dcad5d2))
* **runtime:** add require signature for AMD ([970ff875](https://github.com/s-panferov/awesome-typescript-loader/commit/970ff875))


<a name"0.14.0"></a>
## 0.14.0 (2015-09-17)


#### Features

* ***:**
  * remove outdated examples; we need tests instead ([26ef32ea](https://github.com/s-panferov/awesome-typescript-loader/commit/26ef32ea))
  * update module resolution logic according to https://github.com/Microsoft/TypeScr ([59ff7f77](https://github.com/s-panferov/awesome-typescript-loader/commit/59ff7f77))


<a name"0.14.0-rc.1"></a>
### 0.14.0-rc.1 (2015-09-15)


#### Features

* **cache:** use sha512 ([48692dd2](https://github.com/s-panferov/awesome-typescript-loader/commit/48692dd2))


<a name"0.14.0-rc.0"></a>
### 0.14.0-rc.0 (2015-09-10)


#### Features

* ***:** checker in sep. process now runs only with ForkCheckerPlugin ([85e9e1bc](https://github.com/s-panferov/awesome-typescript-loader/commit/85e9e1bc))


<a name"0.13.1"></a>
### 0.13.1 (2015-09-03)


#### Features

* ***:** pass resolution info into the checker ([266ec78e](https://github.com/s-panferov/awesome-typescript-loader/commit/266ec78e))


<a name"0.12.0"></a>
## 0.12.0 (2015-08-14)


#### Features

* ***:** read `.d.ts` files from `tsconfig.json` ([d4025d30](https://github.com/s-panferov/awesome-typescript-loader/commit/d4025d30))


<a name"0.12.0-rc.2"></a>
### 0.12.0-rc.2 (2015-08-12)


#### Features

* ***:** implement file cache ([358441a8](https://github.com/s-panferov/awesome-typescript-loader/commit/358441a8))


<a name"0.12.0-rc.1"></a>
### 0.12.0-rc.1 (2015-08-10)


#### Features

* ***:** ignore null source maps ([42433c9b](https://github.com/s-panferov/awesome-typescript-loader/commit/42433c9b))


<a name"0.12.0-rc.0"></a>
### 0.12.0-rc.0 (2015-08-10)


#### Features

* ***:** learn loader to pick-up precompiled files if any ([71935896](https://github.com/s-panferov/awesome-typescript-loader/commit/71935896))


<a name"0.11.3"></a>
### 0.11.3 (2015-08-06)


#### Bug Fixes

* **index:** correct work with a promise chain ([c20d684c](https://github.com/s-panferov/awesome-typescript-loader/commit/c20d684c))


<a name"0.11.2"></a>
### 0.11.2 (2015-08-04)


#### Bug Fixes

* **index:** use try-catch instead of if when resolving lib files ([946fc850](https://github.com/s-panferov/awesome-typescript-loader/commit/946fc850))


<a name"0.11.1"></a>
### 0.11.1 (2015-08-02)


<a name"0.11.0"></a>
## 0.11.0 (2015-08-02)


#### Features

* ***:** support the new libs path ([c224f05d](https://github.com/s-panferov/awesome-typescript-loader/commit/c224f05d))


<a name"0.11.0-rc.0"></a>
### 0.11.0-rc.0 (2015-07-31)


#### Features

* ***:** externals is an array now ([69cadb52](https://github.com/s-panferov/awesome-typescript-loader/commit/69cadb52))


<a name"0.9.1"></a>
### 0.9.1 (2015-07-24)


#### Features

* **checker:** fix compiler reference ([8dcad5d2](https://github.com/s-panferov/awesome-typescript-loader/commit/8dcad5d2))


<a name"0.9.0"></a>
## 0.9.0 (2015-07-24)


#### Bug Fixes

* **index:** don't call the callback twice ([3abf8e48](https://github.com/s-panferov/awesome-typescript-loader/commit/3abf8e48))


#### Features

* ***:** use a compiler from a client app ([cae4d00f](https://github.com/s-panferov/awesome-typescript-loader/commit/cae4d00f))


<a name"0.8.0"></a>
## 0.8.0 (2015-07-23)


#### Features

* ***:** add alias example ([ca86fd71](https://github.com/s-panferov/awesome-typescript-loader/commit/ca86fd71))
* **runtime:** add require signature for AMD ([970ff875](https://github.com/s-panferov/awesome-typescript-loader/commit/970ff875))


<a name"0.7.1"></a>
### 0.7.1 (2015-07-18)


#### Bug Fixes

* ***:** fix unrecoverable error during watch ([6f7ad270](https://github.com/s-panferov/awesome-typescript-loader/commit/6f7ad270))


<a name"0.7.0"></a>
## 0.7.0 (2015-07-18)


<a name"0.5.4"></a>
### 0.5.4 (2015-06-09)


<a name"0.5.3"></a>
### 0.5.3 (2015-06-05)


#### Features

* ***:** propper instance init ([d681689d](https://github.com/s-panferov/awesome-typescript-loader/commit/d681689d))


<a name"0.5.2"></a>
### 0.5.2 (2015-05-30)


#### Features

* **helpers:** recompile files ([78b13a14](https://github.com/s-panferov/awesome-typescript-loader/commit/78b13a14))


<a name"0.5.1"></a>
### 0.5.1 (2015-05-30)


#### Features

* **helpers:** add +1 to line because they are zero-based in TS ([76efd423](https://github.com/s-panferov/awesome-typescript-loader/commit/76efd423))


<a name"0.5.0"></a>
## 0.5.0 (2015-05-30)


#### Features

* ***:** play well with ExtractTextPlugin ([33807f1b](https://github.com/s-panferov/awesome-typescript-loader/commit/33807f1b))


<a name"0.4.0"></a>
## 0.4.0 (2015-05-30)


#### Features

* ***:**
  * add tsconfig support and return ts-jsx-loader back ([c03c73e1](https://github.com/s-panferov/awesome-typescript-loader/commit/c03c73e1))
  * refactor and impl separate file analyzer ([8964d3d7](https://github.com/s-panferov/awesome-typescript-loader/commit/8964d3d7))


<a name"0.3.1"></a>
### 0.3.1 (2015-05-11)


<a name"0.3.0"></a>
## 0.3.0 (2015-05-11)


#### Features

* ***:** use new just-emit workflow; this must be much faster too ([9d3a9961](https://github.com/s-panferov/awesome-typescript-loader/commit/9d3a9961))


