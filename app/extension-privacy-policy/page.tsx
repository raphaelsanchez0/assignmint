import { Card, CardTitle } from "@/components/ui/card";
import React from "react";

export default function Policy() {
  const sectionHeaderStyle = "text-lg font-semibold";
  return (
    <Card className="lg:my-8 lg:w-3/5">
      <CardTitle>Assignmint Chrome Extension Privacy Policy</CardTitle>
      <br />
      <p>
        The Assignmint Chrome Extension is committed to protecting your privacy.
        This policy outlines how the extension handles your data and ensures
        your information is kept secure.
      </p>
      <br />

      <h2 className={sectionHeaderStyle}>Information Collection and Use</h2>
      <p>
        The Assignmint Chrome Extension does not collect, store, or transmit any
        personal or sensitive information. All actions performed using the
        extension, including entering your school's Canvas URL and importing
        assignments, occur locally within your browser and are not shared with
        any external servers.
      </p>
      <br />

      <h2 className={sectionHeaderStyle}>Permissions</h2>
      <p>The extension requires certain permissions to function properly:</p>
      <ul>
        <li>
          <strong>Storage:</strong> Stores the Canvas URL entered by the user
          locally to enable the "Go to Assignments" button.
        </li>
        <li>
          <strong>Tabs:</strong> Opens a new tab to Assignmint.com for users to
          select assignments to import.
        </li>
        <li>
          <strong>ActiveTab:</strong> Checks if the active tab is a Canvas
          assignments page to display the "Import Assignments" button.
        </li>
        <li>
          <strong>Scripting:</strong> Injects a content script into Canvas pages
          to retrieve assignment data.
        </li>
        <li>
          <strong>Host Permissions:</strong> Accesses{" "}
          <code>https://*.instructure.com/*</code> to retrieve assignments from
          the user's school's Canvas system.
        </li>
      </ul>
      <p>
        These permissions are solely used to provide the extension's
        functionality and are not used to collect or store personal data.
      </p>
      <br />

      <h2 className={sectionHeaderStyle}>Cookies and Log Data</h2>
      <p>
        The extension does not use cookies or generate log data. All operations
        are executed locally on your device without transmitting data
        externally.
      </p>
      <br />

      <h2 className={sectionHeaderStyle}>Security</h2>
      <p>
        Since no user data is collected or stored by the extension, there is no
        risk of data breaches or unauthorized access to your personal
        information. The extension is designed to operate locally and securely
        within your browser environment.
      </p>
      <br />

      <h2 className={sectionHeaderStyle}>Changes to This Privacy Policy</h2>
      <p>
        This Privacy Policy may be updated periodically. Any changes will be
        reflected on this page. Users are encouraged to review the policy
        occasionally to stay informed about how the extension protects their
        privacy.
      </p>
      <br />

      <h2 className={sectionHeaderStyle}>Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please
        contact us at sanchezraphael0@gmail.com.
      </p>
    </Card>
  );
}
