import {
  Article,
  ArticleContent,
  ArticleImage,
  ArticleParagraph,
  ArticleTitle,
} from "@/components/ui/article";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <Article>
      <ArticleTitle>How to Install the Canvas Assignment Importer</ArticleTitle>
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
          release, we’d love your feedback! If you want to test it out before it
          officially is released on the chrome extension store, you can install
          it manually for testing purposes on the{" "}
          <Link
            href={
              "https://github.com/raphaelsanchez0/assignmint-chrome-extension"
            }
          >
            <span className="underline">Github Repo</span>.
          </Link>
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
