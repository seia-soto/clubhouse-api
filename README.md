# Seia-Soto/Clubhouse-API

The API wrapper for Clubhouse application (drop-in audio chat) based on online private API documentation and pwned soruces by myself.

> **Warning**
>
> This API client comes without any warrenty.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Reverse Engineering](#reverse-engineering)
- [LICENSE](#LICENSE)

----

# Installation

To install this repository as your dependency, use following command with authorized git client:

```ash
yarn add git+https://github.com/Seia-Soto/clubhouse-api#[TAG]
```

# Usage

For working example, you can refer `/example` folder of this repository.
Also, about parameters for each API call functions, you need to inspect functions manually with notes that included with functions.

# Scripts

## `yarn example`

Runs example code.

## `yarn profile`

Create new prorfile JSON data by authenticating manually on command line shell.

# Reverse Engineering

To reverse engineer Clubhouse audio chat application, only thing we need is jailbroken device.
Because there is nothing else except for SSL certificate pinning and we can bypass it even on iOS 14 which is the latest release of iOS by installing some tweaks.

## Preparation

### Jailbreaking

> Use [Odyssey](https://theodyssey.dev/), if you're on iOS 13.6 or higher.

To jailbreak, I recommend you to use [Unc0ver](https://unc0ver.dev/) instead of others due to stability.
Setup AltServer on your PC or Mac and then install Unc0ver

#### iOS 14

> You're not able to use checkm8 exploit if you're on iPhone 11 or higher (higher than A11).

If you're on iOS 14 or higher version, use [Checkra1n](https://checkra.in/) version 0.12.1 to jailbreak.
This this time, you need to disable your iPhone's passcode manually before jailbreaking.
Also, **DO NOT USE LATEST RELEASE** of checkra1n to avoid issue on A11.

#### Post installation

If you install OpenSSH server to debug on remote PC, you need to **CHANGE BOTH `root` AND `mobile` USER'S PASSWORD**.

### Installing tweaks

> Install Cydia from Checkra1n Loader if you're using checkra1n.

Install required updates from Cydia for security reasons and install Filza File Manager or terminal emulator to install package file manually.
Open following repo and download latest release from it.
If you touch share button and then share the file to filza, you can directly install package file.

- [nabla/ssl-kill-switch2](https://github.com/nabla-c0d3/ssl-kill-switch2)

### Setting up MITM proxy

You can set up MITM proxy with following tools:

- [Fiddler](https://www.telerik.com/download/fiddler), [download directly (Windows)](https://telerik-fiddler.s3.amazonaws.com/fiddler/FiddlerSetup.exe).
- [MITM Proxy](https://mitmproxy.org/), [download directly (Windows)](https://snapshots.mitmproxy.org/6.0.2/mitmproxy-6.0.2-windows-installer.exe).

Install toolchains and follow steps to decrypt HTTPS traffics:

#### Fiddler

You need to configure fiddler via [the official guide](https://docs.telerik.com/fiddler/Configure-Fiddler/Tasks/ConfigureForiOS).

#### MITM Proxy

If you've setup MITM proxy, open `https://mitm.it` on your iPhone, then install certificate.

# LICENSE

This repository is distributed with MIT License.
