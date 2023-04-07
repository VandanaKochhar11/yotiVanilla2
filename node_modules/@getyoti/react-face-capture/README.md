# Yoti Face capture integration

The purpose of this module is to capture a face and return the output image.

## CHANGELOG

Please check the [CHANGELOG](https://github.com/getyoti/web-fcm-demo/blob/main/docs/FCM-CHANGELOG.md)
to review release changes, issues, fixes, and possible breaking changes on Major releases.

## Pre-requisite to adopt the dependency

### Peer dependencies

The package depends on the following peer dependencies

```
"react": ">=16.12.0 <18",
"react-dom": ">=16.12.0 <18"
```

### Browser support

<browserSupportTable>

| Browser | Versions                 |
| ------- | ------------------------ |
| and_chr | 104                      |
| chrome  | 105,104,103,102          |
| edge    | 105,104                  |
| firefox | 104,103,102,101          |
| ios_saf | 15.6,15.5,15.4           |
| safari  | 15.6,15.5,15.4,15.2-15.3 |

</browserSupportTable>

Secondly, the module needs `MediaDevices.getUserMedia()` to work. When this isn't supported by the browser, the error `UNSUPPORTED_BROWSER` will be sent.

_Note: Non-Safari browsers on iOS are not supported because of an iOS limitation._

_Note: Edge is only supported on desktop versions._

Finally, some devices might experience poor performance when attempting to detect a face. This is because the underlying library TensorFlow.js can still be too demanding for older less performant devices.

_Note: `iPhone 7` and older will take a longer time to load the face detector model than more recent devices, and in most cases, will fall back from auto to manual capture mode. If this behaviour is not desired, as an integrator you could disable the manual capture mode altogether, implementing manualCaptureFallback = false. Note, this could increase the load time for old and low-quality devices._

## React face capture module

### Install dependency

```
npm i @getyoti/react-face-capture -S
```

### Import js and css

```
import FaceCapture from "@getyoti/react-face-capture"
import "@getyoti/react-face-capture/index.css"
```

### Copy assets

**Assets** are not included in the javascript bundle. To have the components to work correctly, you will need to copy library assets from `@getyoti/react-face-capture/assets` folder into your assets folder.

For instance, in webpack you can use the plugin `copy-webpack-plugin` in the following way:

```js
new CopyPlugin([
  {
    from: path.resolve(__dirname, './node_modules/@getyoti/react-face-capture/assets'),
    to: path.resolve(__dirname, './assets')
  }
]),
```

### Props

| Property name            | Type                                           | Default                | Mand | Description                                                                                                                                                                                                                                                                             |
| ------------------------ | ---------------------------------------------- | ---------------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| captureMethod            | String `manual/auto`                           | `auto`                 | -    | Capture method to take the photo: by clicking a button or auto-capture.                                                                                                                                                                                                                 |
| manualCaptureFallback    | Boolean                                        | `true`                 | -    | In `auto` capture method, allow the use of `manual` capture mode as fallback. This would be triggered only when low performance conditions are detected, usually on very old devices. NOTE: If this option is turned off, some users might not be able to successfully submit an image. |
| countdownMode            | String `only_desktop/only_mobile/never/always` | `never`                | -    | Indicates when the countdown will be used. Note: It's only used if captureMethod is set to `manual`.                                                                                                                                                                                    |
| secure                   | Boolean                                        | false                  | -    | If `true`, the face capture module will use the [secure mode](#secure-mode)                                                                                                                                                                                                             |
| onSuccess                | Function({ img, secure })                      | -                      | Y    | Callback called once the result (capture) is complete. The field `secure` is only returned in secure mode (See [secure mode section](#secure-mode))                                                                                                                                     |
| onError                  | Function                                       | -                      | -    | Callback called when there is an error. See Appendix for the list of error codes we currently support.                                                                                                                                                                                  |
| onReadyForCapture        | Function                                       | -                      | -    | Callback called when the face capture module is ready to take images (Video feed and face scan are ready).                                                                                                                                                                              |
| showOverlay              | Boolean                                        | `true`                 | -    | Optional use of the face overlay.                                                                                                                                                                                                                                                       |
| resolutionType           | String `hd/full_hd`                            | `hd`                   | -    | Image resolution constraints passed to `getUserMedia`.                                                                                                                                                                                                                                  |
| format                   | String                                         | `jpeg`                 | -    | Image format type.                                                                                                                                                                                                                                                                      |
| CustomManualButton       | Function                                       | simple button          | -    | Custom UI of the manual capture button. It uses `onClick` and `disabled` as props.                                                                                                                                                                                                      |
| CustomConsentButton      | Function                                       | simple button          | -    | Custom UI of the consent button. It uses `onClick` and `disabled` as props.                                                                                                                                                                                                             |
| imageType                | String `original/cropped`                      | `original`             | -    | imageType select if the image will be the original or it will be cropped in order to improve the timing response when processing the image in the API call.                                                                                                                             |
| qualityType              | String `high/medium/low`                       | `high`                 | -    | Sets the image quality of jpeg format images only. High (1) - Medium (0.96) - Low (0.90).                                                                                                                                                                                               |
| language                 | Language code (\*)                             | `en`                   | -    | The language code to set the language of the feedback messages.                                                                                                                                                                                                                         |
| a11yLiveRegionMode       | String `assertive/polite`                      | `polite`               | -    | Determines the [politeness setting of the live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#live_regions) used to read out prompts for screen reader users                                                                                 |
| isConsentRequired        | Boolean                                        | `false`                | -    | Makes sure that the user gives consent to the tool to analyse their face. If it is `true`, a button will appear on the bottom section of the module, asking the user for their consent, and not analysing the user face until the consent is given. After this, the button disappears.  |
| faceCaptureAssetsRootUrl | string                                         | `assets/face-capture/` | -    | Root url where the face detection assets are located. See [copy assets](#copy-assets) section for assets configuration.                                                                                                                                                                 |

**(\*)**
Current languages supported:

- `en`: English
- `bg-BG`: Bulgarian
- `ar`: Arabic
- `cs`: Czech
- `da`: Danish
- `de`: German
- `el`: Greek
- `es`: Spanish (Spain)
- `es-419`: Spanish (Latin America)
- `et`: Estonian
- `fa-IR` : Persian
- `fi`: Finnish
- `fr`: French
- `he`: Hebrew
- `hi`: Hindi
- `hy`: Armenian
- `id`: Bahasa
- `it`: Italian
- `ja`: Japanese
- `ko`: Korean
- `lt`: Lithuanian
- `lv`: Latvian
- `ms`: Malay
- `nb`: Norwegian
- `nl`: Dutch
- `pl`: Polish
- `pt`: Portuguese `[deprecated]`
- `pt-BR`: Portuguese (Brazil)
- `pt-PT`: Portuguese (Portugal)
- `ro`: Romanian
- `ru`: Russian
- `sv`: Swedish
- `th`: Thai
- `tr`: Turkish
- `uk`: Ukranian
- `ur`: Urdu
- `vi`: Vietnamese

#### Language fallback

Mechanism used for the prop `language` to avoid issues when the value passed is wrong. Example: first try exact match (es-es or es-ES, ignore case):

- If no match, try the mainstream (es), by removing the region part (-es).
- If no mainstream, try any other available es-[region] sibling (example: es-419).
- If no regional sibling, use the default language: en.

#### Supported error codes

| Error code                  | Description                                                                                                                                                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NO_CAMERA`                 | No camera detected on the user’s device                                                                                                                                                                                     |
| `GENERIC_CAMERA_ERROR`      | Other camera error. The reasons can be [various](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia), and inconsistent across browsers. The complete error is logged in the user’s browser console. |
| `UNSUPPORTED_BROWSER`       | The user’s browser is not supported, because the API needed for camera interaction is missing. `Note: Older Non-Safari browsers on iOS also fall into this category.`                                                       |
| `NO_CAMERA_PERMISSION`      | The user rejected the camera permission                                                                                                                                                                                     |
| `OVERCONSTRAINED`           | The camera constraints are not compatible with any camera device. `Note: One recovery option is to lower the widthMinConstraint value.`                                                                                     |
| `FACE_DETECTION_INIT_ERROR` | The face detection has failed to initialise. This usually means that the required model assets are missing from the host application.                                                                                       |
| `INTERNAL_ERROR`            | Internal error. This can be due to a programming error, or the user using an old unsupported browser.                                                                                                                       |
| `CAPTURE_LOAD_ERROR`        | The secure module could not be loaded. This usually means your token is not updated, or there is an error on the module provider.                                                                                           |
| `VIDEO_STREAM_INTERRUPTED`  | The camera stream has stopped unexpectedly.                                                                                                                                                                                 |
| `SECURE_SESSION_EXPIRED`    | The secure session has expired (the token expire field is older than the current time).                                                                                                                                     |

The error codes can be imported as follow:

```js
import { ERROR_CODE } from '@getyoti/react-face-capture';
```

#### Secure mode

The Secure mode allows [Yoti back-end
service](https://developers.yoti.com/age-estimation/integration-guide)
to verify that the image captured on client-side browser with the FCM hasn't been
modified in any form. Note, the secure mode of Yoti FCM makes a request to Yoti
back-end to download the encrypted capture package that takes the
photo and create the secure result request. The secure result information will
be returned in `onSuccess` callback:

```json
{
  "img": "<base64_img>",
  "secure": {
    "version": "<fcm_version>",
    "token": "<session_token>",
    "signature": "<result_signature>",
    "verification": "<verification_data>"
  }
}
```

`<fcm_version>` is the current version of FCM (embedded in the
module) and `<session_token>` is the session token generated from the request.

##### Possible issues

The secure mode requests Yoti back-end in order to download the encrypted module
on demand so the front-end must be able to handle that requests. Keep in mind if
your front-end uses any mechanism to prevent data injection attacks or
cross-site scripting like SCP you will need to allow the FCM requests.

##### Virtual cameras

The secure mode detects modifications on the camera stream source and fraudulent camera hardware. In these scenarios, it will return an `UNTRUSTED_SECURE_SESSION` error code when calling the Yoti BE service.

### Example

```js
import FaceCapture from '@getyoti/react-face-capture';
import '@getyoti/react-face-capture/index.css';

export function App() {
  const onSuccess = ({ img }) => console.log('Length = ', img.length);
  const onError = (error) => console.log('Error =', error);

  return <FaceCapture onSuccess={onSuccess} onError={onError} />;
}
```

## Face capture module vanilla

If you do not have a react tech stack, you can use the face capture vanilla version.
When you install the library on your machine, It's located inside the folder `vanilla`.

Add the package in your codebase and serve the static assets:

### 1. serve package static assets

```bash

/@getyoti/react-face-capture/vanilla/assets/face-capture/
/@getyoti/react-face-capture/vanilla/index.css
/@getyoti/react-face-capture/vanilla/index.js
```

### 2. Add Face capture script and style

Inside the page you want to have face capture, add Face capture scripts and style like in the example below.
`faceCaptureAssetsRootUrl` is property you can use to instruct the library where neural net files are served otherwise we look the files relative to the page location `assets/face-capture/`.

### 3. Render face capture

Our scripts will give you access to `Yoti.FaceCaptureModule.render` you can pass 2 parameters, first parameters are the props and are the same used in react integration and second parameter you need a html DOM reference so we know where we can render the UI.

In order to unmount the component, it is highly recommended to call the `Yoti.FaceCaptureModule.unmount` function instead of destroying the HTML element, as this could lead to some issues or misbehavior.

**index.html**

```html
<link href="/@getyoti/react-face-capture/vanilla/index.css" />
<script src="/@getyoti/react-face-capture/vanilla/index.js" />
<script>
  const props = {
    faceCaptureAssetsRootUrl: '/@getyoti/react-face-capture/vanilla/assets/';
  };

  const fcm = Yoti.FaceCaptureModule.render(props, document.getElementById('face-capture-module-root'));

  function reload() {
        fcm.reload()
  }

  function unmount() {
        fcm.unmount()
  }
</script>

<div id="face-capture-module-root"></div>
```

## Debugging Yoti Face Capture Module

Yoti Face capture module is protected with code obfuscation techniques for security reasons.

This protection is present in both secure and non-secure mode, and it makes it mostly impossible to debug the module by using development tools on any browser, as the application will crash or keep looping right after the tool menu is opened.
