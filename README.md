[Enketo Smart Paper](http://enketo.org) [![Build Status](https://travis-ci.org/MartijnR/enketo.png)](https://travis-ci.org/MartijnR/enketo-core)
======

Enketo Smart Paper runs next generation web forms that were built according to the open-source OpenRosa XForm format. This is the advanced and popular form format used by [ODK](http://opendatakit.org), [Formhub](https://formhub.org) and [CommCare](http://www.commcarehq.org/home/). 

This repository is a PHP-wrapper around Enketo Smart Paper and adds the ability to launch offline and persistently store data offline in the browser. It also provides the communication with OpenRosa compliant servers such as [ODK Aggregate](http://opendatakit.org/use/aggregate/) and [Formhub](https://formhub.org). The OpenRosa APIs are described [here](https://bitbucket.org/javarosa/javarosa/wiki/OpenRosaAPI).

Enketo is currently deployed as a paid service on [enketo.org](http://enketo.org) and as a free service on [formhub.org](http://formhub.org). Follow the latest news about enketo on our [blog](http://blog.enketo.org) and on [@enketo](https://twitter.com/enketo).

Related Projects
-----------
* [Enketo Core](https://github.com/MartijnR/enketo-core) - used inside this repo
* [XPathJS OpenRosa](https://github.com/MartijnR/xpathjs_javarosa) - XPath Evaluator used inside enketo-core
* [Wicked Good XPath OpenRosa](https://github.com/kirang20/wgxp-java-rosa) - a much faster replacement XPath Evaluator under development
* [Enketo XSLT](https://github.com/MartijnR/enketo-xslt) - used inside this repo
* [Enketo Dristhi](https://github.com/MartijnR/enketo-dristhi) used in [Dristhi](https://play.google.com/store/apps/details?id=org.ei.drishti)
* [Manifest Builder](https://github.com/MartijnR/Manifest-Builder) - used inside this repo
* [File Manager](https://github.com/MartijnR/file-manager) - used inside this repo
* [enketo-xslt-transformer-php] - To follow
* [enketo-xslt-transformer-node] - To follow

API Documentation
--------------
Instead of installing and maintaining Enketo yourself you should consider using [enketo.org](https://enketo.org)'s API after opening an enketo.org [account](https://accounts.enketo.org). The [API documentation](http://apidocs.enketo.org) describes how you can easily achieve the same level of integration that currently exists on [formhub.org](https://formhub.org) with ODK Aggregate or any other OpenRosa-compliant server.

Browser support
---------------
* IE is only supported from version 10 onwards (older versions do not support the required technologies). 
* Chrome, Firefox, Safari for both desktop and mobile devices are supported. Chrome is recommended at the moment.

Frequently Asked Questions
---------------------------
##### How to install this thing?
After a year without meaningful code contributions and without a stable source of revenue, a new strategy was adopted to make the Enketo project sustainable. We are no longer encouraging or supporting self-installation of this PHP app. Instead the enketo repository has been split up into various easy-to-use open-source libraries that can serve as building blocks for creating your own enketo-powered app (see Related Projects above). We would like to encourage you to use these libraries, welcome contributions and will gladly help out if you experience issues. License of this PHP app is subject to change in the future.
##### Why are file-upload inputs greyed out and not usable?
File uploads are only experimentially supported on Chrome (except on iOS) and Opera desktop at the moment. It uses the still experimental FileSytem API to ensure that Enketo forms work offline. If file uploads (images/sound/video) are important, ODK Collect may be a better option. Alternatively, it would be easy to develop an online-only version of Enketo using [Enketo Core](https://github.com/MartijnR/enketo-core) with full cross-browser support for file uploads.
##### Why is form authentication not working on my own installation?
This is a separate module that is currently not open-source. 

Development
-----------
* Code contributions for [Enketo Core](https://github.com/MartijnR/enketo-core) and its dependencies (see above under Related Projects) are very welcome. See those repos for more information.
* [Issue Tracker on /mobilabs](https://github.com/modilabs/enketo/issues) and on [/martijnr](https://github.com/MartijnR/enketo/issues)

Acknowledgements
----------------
I would like to acknowledge and thank the indirect contribution by the creators of the following excellent works that were used in the project:

* [Code Igniter](http://codeigniter.com) by EllisLab
* [vkbeautify](https://github.com/vkiryukhin/vkBeautify) by Vadim Kiryukhin
* many more