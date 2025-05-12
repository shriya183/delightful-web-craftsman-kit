
import React from "react";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="none" fill="none" />
      <path
        d="M19.76 10.77h-7.76v3.38h4.44c-.42 2.28-2.33 3.38-4.44 3.38-2.68 0-4.95-2.05-4.95-5.05 0-2.73 2.27-5.05 4.95-5.05 1.22 0 2.33.44 3.18 1.16l2.38-2.38c-1.42-1.33-3.31-2.16-5.56-2.16-4.56 0-8.38 3.77-8.38 8.42s3.82 8.42 8.38 8.42c4.13 0 7.99-2.92 7.99-8.08 0-.62-.08-1.29-.23-2.04z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
};

export default GoogleIcon;
