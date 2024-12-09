import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import React from "react";

const Article = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-white text-slate-950 dark:bg-zinc-900 dark:text-slate-50 w-3/4 p-4 md:p-8",
      className,
    )}
    {...props}
  />
));
Article.displayName = "Article";

const ArticleTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "text-4xl font-semibold leading-none tracking-tight text-left",
      className,
    )}
    {...props}
  />
));
ArticleTitle.displayName = "ArticleTitle";

const ArticleImage = React.forwardRef<
  HTMLDivElement,
  ImageProps & { className?: string }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full rounded-2xl overflow-hidden shadow-lg flex items-center justify-center py-6",
      className,
    )}
  >
    <Image {...props} className="rounded-xl" />
  </div>
));
ArticleImage.displayName = "ArticleImage";

const ArticleContent = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("dark:text-slate-50 text-slate-950 ", className)}
    {...props}
  />
));
ArticleTitle.displayName = "ArticleContent";

const ArticleParagraph = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("dark:text-slate-50 text-slate-950 text-lg pb-4", className)}
    {...props}
  />
));
ArticleParagraph.displayName = "ArticleParagraph";

export {
  Article,
  ArticleTitle,
  ArticleImage,
  ArticleContent,
  ArticleParagraph,
};
