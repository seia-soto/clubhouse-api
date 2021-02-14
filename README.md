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
- [API](#api)
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

## Jailbreaking

> Use [Odyssey](https://theodyssey.dev/), if you're on iOS 13.6 or higher.

To jailbreak, I recommend you to use [Unc0ver](https://unc0ver.dev/) instead of others due to stability.
Setup AltServer on your PC or Mac and then install Unc0ver

### iOS 14

> You're not able to use checkm8 exploit if you're on iPhone 11 or higher (higher than A11).

If you're on iOS 14 or higher version, use [Checkra1n](https://checkra.in/) version 0.12.1 to jailbreak.
This this time, you need to disable your iPhone's passcode manually before jailbreaking.
Also, **DO NOT USE LATEST RELEASE** of checkra1n to avoid issue on A11.

### Post installation

If you install OpenSSH server to debug on remote PC, you need to **CHANGE BOTH `root` AND `mobile` USER'S PASSWORD**.

```ash
passwd root
passwd mobile
```

## Setting up MITM proxy

You can set up MITM proxy with following tools:

- [Fiddler](https://www.telerik.com/download/fiddler), [download directly (Windows)](https://telerik-fiddler.s3.amazonaws.com/fiddler/FiddlerSetup.exe).
- [MITM Proxy](https://mitmproxy.org/), [download directly (Windows)](https://snapshots.mitmproxy.org/6.0.2/mitmproxy-6.0.2-windows-installer.exe).

Install toolchains and follow steps to decrypt HTTPS traffics:

### Fiddler

You need to configure fiddler via [the official guide](https://docs.telerik.com/fiddler/Configure-Fiddler/Tasks/ConfigureForiOS).

### MITM Proxy

If you've setup MITM proxy, open `http://mitm.it` on your iPhone, then install certificate.

## Bypassing SSL Pinning

To inspect SSL Pinning, there are ways to bypass it easily.

### ssl-kill-switch

Install required updates from Cydia for security reasons and install Filza File Manager or terminal emulator to install package file manually.
Open following repo and download latest release from it.
If you touch share button and then share the file to filza, you can directly install package file.

- [nabla/ssl-kill-switch2](https://github.com/nabla-c0d3/ssl-kill-switch2)

After installation, turn it on in settings app.

### frida-ios-hook

Install iTunes and Python3 on your PC and open iTunes after install.
Connect to your iPhone shell via methods described in [Wireshark remote debugging](#wireshark-remote-debugging) section.
Clone following repository to some directory:

- [noobpk/frida-ios-hook](https://github.com/noobpk/frida-ios-hook)

After, all things are ready, run script via following command:

```cmd
python3 hook.py -n clubhouse -s frida-scripts\bypass-ssl-ios13.js
```

- The script also works on iOS 14.

## Wireshark remote debugging

By piping stream over SSH, you can also debug your iPhone's traffic with wireshark installed on PC.
Before doing this, install `OpenSSH` and `tcpdump` tweak on your iPhone and install Wireshark on your PC.

You may add following paths to system wide environment variable:

- `C:\Program Files\Wireshark`

After setting up `itunnel-mux` or `3uTools` from below, open new command line window and start debugging with built-in ssh on Windows 10.

```cmd
ssh root@localhost -p 2222 -l root tcpdump -s 0 -U -n -w - -i any not port 22 | wireshark -k -i -
```

### itunnel-mux

Download `itunnel_mux_rev71.zip` from following webpage and add it to path.
At this time, you should install iTunes and Apple Mobile Support before continuing.

- [Google Code Archive/iphonetunnel-usbmuxconnectbyport](https://code.google.com/archive/p/iphonetunnel-usbmuxconnectbyport/downloads)

Open it and start proxy after connecting iPhone.

```cmd
itunnel_mux --iport 22 --lport 22
```

### 3uTools

Also, you can do this easier with 3uTools which only available on Windows.
Download and install it to your PC and connect iPhone via USB.
Then you can go to `Toolbox` tab and click `Open SSH Tunnel` to open SSH port locally.

# API

About the API implemented in this project.
Only special things will be typed.

## `client.getStatic(url)`

`client.getStatic` method will return a `node-fetch` agent which having essential headers to query static files.
For example, you can download profile picture safely by using this method.

```js
const download = url => {
  const fs = require('fs')

  const response = await app.getStatic(url)
  const stream = fs.createWriteStream('./avatar.png')

  return new Promise((resolve, reject) => {
    response.body.pipe(stream)
    response.body.on('error', reject)

    stream.on('finish', resolve)
  })
}
```

# LICENSE

This repository is distributed with MIT License.
