import { forwardRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useSelector } from "react-redux";

export const CfCaptcha = forwardRef(({ setCfToken, style }, ref) => {
  const { lang } = useSelector((state) => state.translation);
  const { captcha } = useSelector((state) => state.config);

  const visible = false;

  const siteKey = captcha?.token;

  const onError = (e) => {
    // eslint-disable-next-line no-console
    console.log(e);
  };

  return (
    <>
      {captcha?.isEnabled && siteKey && (
        <Turnstile
          ref={ref}
          style={{ alignSelf: "center", ...style }}
          onSuccess={setCfToken}
          onExpire={() => ref?.current?.reset()}
          onError={onError}
          siteKey={siteKey}
          scriptOptions={{
            appendTo: "body"
          }}
          options={{
            theme: "dark",
            size: visible ? "normal" : "invisible",
            language: lang
          }}
        />
      )}
    </>
  );
});
