import {
  Article,
  ArticleContent,
  ArticleImage,
  ArticleParagraph,
  ArticleTitle,
} from "@/components/ui/article";
import React from "react";

export default function page() {
  return (
    <Article>
      <ArticleTitle>
        Why the Chrome Extension Can't Be Installed Right Now
      </ArticleTitle>
      <ArticleImage
        src="/images/importer-image.png"
        width={1000}
        height={1000}
        alt="Image of importer in action"
      />
      <ArticleContent>
        <ArticleParagraph>
          We’re excited to share our Chrome extension with you, but
          unfortunately, it isn’t available for installation at the moment{" "}
          <b>(As of 12/8/2024)</b>. The extension is currently undergoing the
          approval process for the Chrome Web Store, which ensures it meets all
          of Google’s security and quality standards.
        </ArticleParagraph>
        <ArticleParagraph>
          If you’re interested in testing out the extension before its official
          release, we’d love your feedback! Please don’t hesitate to contact us
          at <code>sanchezraphael0@gmail.com</code>, and we’ll provide
          instructions on how to access and try it out.
        </ArticleParagraph>
        <ArticleParagraph>
          Thank you for your patience and understanding. We’re working hard to
          get the extension approved and available for everyone as soon as
          possible!
        </ArticleParagraph>
      </ArticleContent>
    </Article>
  );
}
