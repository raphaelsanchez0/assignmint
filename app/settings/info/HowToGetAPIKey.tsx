import React from "react";

export default function HowToGetAPIKey() {
  return (
    <div>
      <ol className="list-decimal list-inside flex flex-col gap-2">
        <li>
          Be Logged into <b>Canvas</b>
        </li>
        <li>
          Go to <b>Account</b>
        </li>
        <li>
          Go to <b>Settings</b>
        </li>
        <li>
          Scroll down to the <b>Approved Integrations</b>
        </li>
        <li>
          <b>+ New Access Token</b>
        </li>
        <li>
          <b>Token Name:</b> <i>Give it any name</i>
        </li>
        <li>
          <b>Expires:</b>{" "}
          <i>
            As long as you want us to have access to it; Leave blank for
            indefinitely
          </i>
        </li>
        <li>
          Copy and paste the token into the <b>Canvas API Key</b> field
        </li>
      </ol>
    </div>
  );
}
