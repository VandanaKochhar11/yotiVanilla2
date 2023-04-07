declare module '@getyoti/react-face-capture' {
  import * as React from 'react';

  /**
   * Error codes used by the Face Capture.
   */
  export enum ERROR_CODE {
    NO_CAMERA_PERMISSION = 'NO_CAMERA_PERMISSION',
    NO_CAMERA = 'NO_CAMERA',
    UNSUPPORTED_BROWSER = 'UNSUPPORTED_BROWSER',
    OVERCONSTRAINED = 'OVERCONSTRAINED',
    GENERIC_CAMERA_ERROR = 'GENERIC_CAMERA_ERROR',
    FACE_DETECTION_INIT_ERROR = 'FACE_DETECTION_INIT_ERROR',
    CAPTURE_LOAD_ERROR = 'CAPTURE_LOAD_ERROR',
    INTERNAL_ERROR = 'INTERNAL_ERROR',
    VIDEO_STREAM_INTERRUPTED = 'VIDEO_STREAM_INTERRUPTED',
    SECURE_SESSION_EXPIRED = 'SECURE_SESSION_EXPIRED',
  }

  /**
   *  Capture modes supported by the Face Capture.
   */
  export enum CAPTURE_METHOD {
    MANUAL = 'manual',
    AUTO = 'auto',
  }

  /**
   *  Image formats supported by the Face Capture.
   */
  export enum FORMAT_TYPE {
    PNG = 'png',
    JPEG = 'jpeg',
  }

  /**
   *  Image types supported by the Face Capture.
   */
  export enum IMAGE_TYPE {
    ORIGINAL = 'original',
    CROPPED = 'cropped',
  }

  /**
   *  Quality types supported by the Face Capture for the JPEG encoding.
   */
  export enum QUALITY_TYPE {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low',
  }

  /**
   *  Scenarios in which the countdown will be used.
   */
  export enum COUNTDOWN_MODES {
    ALWAYS = 'always',
    ONLY_MOBILE = 'only_mobile',
    ONLY_DESKTOP = 'only_desktop',
    NEVER = 'never',
  }

  /**
   *  Politeness setting of the live region supported by the Face Capture.
   */
  export enum A11Y_LIVE_REGION_MODE {
    ASSERTIVE = 'assertive',
    POLITE = 'polite',
  }

  /**
   *  Image resolutions supported by the Face Capture.
   */
  export enum RESOLUTION_TYPE {
    HD = 'hd',
    FULL_HD = 'full_hd',
  }

  /**
   *  Languages supported by the Face Capture.
   */
  export enum LANGUAGE_CODE {
    AR = 'ar',
    BG_BG = 'bg-BG',
    CS = 'cs',
    DA = 'da',
    DE = 'de',
    EL = 'el',
    EN = 'en',
    ES = 'es',
    ES_419 = 'es-419',
    ET = 'et',
    FA_IR = 'fa-IR',
    FI = 'fi',
    FR = 'fr',
    HE = 'he',
    HI = 'hi',
    HY = 'hy',
    ID = 'id',
    IT = 'it',
    JA = 'ja',
    KO = 'ko',
    LT = 'lt',
    LV = 'lv',
    MS = 'ms',
    NB = 'nb',
    NL = 'nl',
    PL = 'pl',
    /**
     * @deprecated Use {@link LANGUAGE_CODE.PT_BR} or {@link LANGUAGE_CODE.PT_PT} instead.
     */
    PT = 'pt',
    PT_BR = 'pt-BR',
    PT_PT = 'pt-PT',
    RO = 'ro',
    RU = 'ru',
    SV = 'sv',
    TH = 'th',
    TR = 'tr',
    UK = 'uk',
    UR = 'ur',
    VI = 'vi',
  }

  /**
   *  Secure information the Face Capture will provide as result when it takes a picture (onSuccess callback). Only when the secure prop is set to true.
   */
  export interface Secure {
    version: string;
    token: string;
    signature: string;
    verification: string;
  }

  /**
   *  Result entity the FCM will return on the onSuccess callback.
   */
  export interface FCMResult {
    img: string;
    secure?: Secure;
  }

  /**
   * Face Capture properties.
   */
  export interface FaceCaptureProps {
    /** Root url where assets for the face detection are located. */
    faceCaptureAssetsRootUrl?: string;
    /** Capture method to take the photo: by clicking a button or auto-capture. (default:auto) */
    captureMethod?: CAPTURE_METHOD;
    /** If true, the face capture module will use the secure mode. (default:false) */
    secure?: boolean;
    /** Callback called once the result (capture) is complete. */
    onSuccess: (e: FCMResult) => void;
    /** Callback called when there is an error. */
    onError?: (e: ERROR_CODE) => void;
    /** Callback called when the face capture module is ready to take images. */
    onReadyForCapture?: () => void;
    /** Optional use of the face overlay (default: true) */
    showOverlay?: boolean;
    /** Image resolution constraints passed to getUserMedia. (default:HD) */
    resolutionType?: RESOLUTION_TYPE;
    /** Image format type. (default:jpeg) */
    format?: FORMAT_TYPE;
    /** Custom UI of the manual capture button. It uses onClick and disabled as props */
    CustomManualButton?: (props: any) => JSX.Element;
    /** Custom UI of the consent button. It uses onClick and disabled as props */
    CustomConsentButton?: (props: any) => JSX.Element;
    /** Indicates when the countdown will be used. Note: It's only used if captureMethod is set to manual. (default:never) */
    countdownMode?: COUNTDOWN_MODES;
    /** imageType select if the image will be the original or it will be cropped in order to improve the timing 
    response when processing the image in the API call. (default:original) */
    imageType?: IMAGE_TYPE;
    /** Sets the image quality of jpeg format images only. High (1) - Medium (0.96) - Low (0.90). (default:high) */
    qualityType?: QUALITY_TYPE;
    /** The language code to set the language of the feedback messages. (default:en) */
    language?: LANGUAGE_CODE;
    /** Determines the politeness setting of the live region used to read out prompts for screen reader users. (default:polite) */
    a11yLiveRegionMode?: A11Y_LIVE_REGION_MODE;
    /** isConsentRequired Adds a step to click a button to ensure the user gives consent to the tool to start the face capture process. (default:false) */
    isConsentRequired?: boolean;
    /** Indicates if the face capture will use the manual capture method because of slow performance. (default:true) */
    manualCaptureFallback?: boolean;
  }

  /**
   *  Module to capture a face and return the output image.
   */
  const FaceCapture: React.FC<FaceCaptureProps>;

  export default FaceCapture;
}
